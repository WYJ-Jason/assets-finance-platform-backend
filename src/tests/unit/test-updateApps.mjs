'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import express from 'express';
import request from 'supertest';
import updateAppsRoutes from '../../routes/updateApps.js';
import Application from '../../models/applications.js';

const app = express();
app.use(express.json());
app.use('/update-apps', updateAppsRoutes);

describe('PUT /update-apps', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should update an application and return the updated data', async () => {
    const updateData = { personalDetails: { name: 'John Doe Updated' } };
    const mockId = 'mocked_id';
    const mockApp = {
      _id: mockId,
      personalDetails: { name: 'John Doe', age: 30, email: 'john@example.com' },
      income: [],
      expenses: [],
      assets: [],
      liabilities: []
    };

    sinon.stub(Application, 'findByIdAndUpdate').returns(mockApp);

    const res = await request(app)
      .put('/update-apps')
      .send({ id: mockId, updateData });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Application updated successfully');
    expect(res.body.data).to.deep.equal(mockApp);
  });

  it('should return 404 if the application is not found', async () => {
    const updateData = { personalDetails: { name: 'John Doe Updated' } };
    const mockId = 'mocked_id';

    sinon.stub(Application, 'findByIdAndUpdate').returns(null);

    const res = await request(app)
      .put('/update-apps')
      .send({ id: mockId, updateData });

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('message', 'Application not found');
  });

  it('should return 400 if id or updateData is missing', async () => {
    const res = await request(app)
      .put('/update-apps')
      .send({ id: 'mocked_id' }); // Missing updateData

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'ID and update data are required');
  });

  it('should return 500 if there is an error during the update', async () => {
    const updateData = { personalDetails: { name: 'John Doe Updated' } };
    const mockId = 'mocked_id';

    sinon.stub(Application, 'findByIdAndUpdate').throws(new Error('Database error'));

    const res = await request(app)
      .put('/update-apps')
      .send({ id: mockId, updateData });

    expect(res.status).to.equal(500);
    expect(res.body).to.have.property('message').that.includes('Internal server error');
  });
});
