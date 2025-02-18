'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import express from 'express';
import request from 'supertest';
import createAppsRoutes from '../../routes/createApps.js';
import Applications from '../../models/applications.js';

const app = express();
app.use(express.json());
app.use('/create-apps', createAppsRoutes);

describe('POST /create-apps', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should create a new application and return it', async () => {
    const newApp = {
      personalDetails: { name: 'John Doe', age: 30, email: 'john@example.com' },
      income: [{ source: 'Job', amount: 5000, date: new Date().toISOString() }],
      expenses: [{ description: 'Rent', amount: 1500, date: new Date().toISOString() }],
      assets: [{ description: 'Car', value: 20000 }],
      liabilities: [{ description: 'Loan', amount: 5000 }],
    };

    // 模拟数据库返回的数据（带有 _id）
    const savedApp = {
      ...newApp,
      _id: 'mocked_id',
      personalDetails: { ...newApp.personalDetails, _id: '67b160a2824fdc473535a47b' },
      income: [{ ...newApp.income[0], _id: '67b160a2824fdc473535a47c' }],
      expenses: [{ ...newApp.expenses[0], _id: '67b160a2824fdc473535a47d' }],
      assets: [{ ...newApp.assets[0], _id: '67b160a2824fdc473535a47e' }],
      liabilities: [{ ...newApp.liabilities[0], _id: '67b160a2824fdc473535a47f' }],
    };

    sinon.stub(Applications.prototype, 'save').resolves(savedApp);

    const res = await request(app).post('/create-apps').send(newApp);

    expect(res.status).to.equal(201);

    // 递归去除 `_id` 字段的函数
    const removeIds = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(removeIds);
      } else if (typeof obj === 'object' && obj !== null) {
        const { _id, ...rest } = obj; // 移除 _id
        return Object.keys(rest).reduce((acc, key) => {
          acc[key] = removeIds(rest[key]);
          return acc;
        }, {});
      }
      return obj;
    };

    // 去除返回结果中的 `_id` 字段
    const cleanedResponse = removeIds(res.body);

    // 统一日期格式（转换为 ISO 字符串进行比较）
    cleanedResponse.income.forEach((item) => (item.date = new Date(item.date).toISOString()));
    cleanedResponse.expenses.forEach((item) => (item.date = new Date(item.date).toISOString()));

    expect(cleanedResponse).to.deep.equal(newApp);
  });

  it('should return an error if there is a problem saving the application', async () => {
    const newApp = {
      personalDetails: { name: 'John Doe', age: 30, email: 'john@example.com' },
    };

    sinon.stub(Applications.prototype, 'save').rejects(new Error('Database error'));

    const res = await request(app).post('/create-apps').send(newApp);

    expect(res.status).to.equal(500);
    expect(res.body).to.have.property('message').that.includes('Error');
  });
});
