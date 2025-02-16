'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import express from 'express';
import request from 'supertest';
import readAppsRoutes from '../../routes/readApps.js';
import Applications from '../../models/applications.js';

const app = express();
app.use(express.json());
app.use('/read-apps', readAppsRoutes);

describe('GET /read-apps', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return all applications if no email is provided', async () => {
    const mockApps = [
      { personalDetails: { name: 'John Doe', age: 30, email: 'john@example.com' } },
      { personalDetails: { name: 'Jane Doe', age: 25, email: 'jane@example.com' } }
    ];

    sinon.stub(Applications, 'find').returns(mockApps);

    const res = await request(app).get('/read-apps');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(mockApps);
  });

  it('should return applications filtered by email', async () => {
    const mockApps = [
      { personalDetails: { name: 'John Doe', age: 30, email: 'john@example.com' } }
    ];

    sinon.stub(Applications, 'find').returns(mockApps);

    const res = await request(app)
      .get('/read-apps')
      .send({ email: 'john@example.com' });

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(mockApps);
  });

  it('should return a message if no applications are found', async () => {
    sinon.stub(Applications, 'find').returns([]);

    const res = await request(app).get('/read-apps');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ message: "No Applications" });
  });

  it('should return an error if there is a problem retrieving applications', async () => {
    sinon.stub(Applications, 'find').throws(new Error('Database error'));

    const res = await request(app).get('/read-apps');

    expect(res.status).to.equal(500);
    expect(res.body).to.have.property('message', 'Error:');
  });
}); 