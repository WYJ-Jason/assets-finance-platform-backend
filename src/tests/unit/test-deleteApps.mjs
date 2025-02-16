'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import express from 'express';
import request from 'supertest';
import deleteAppsRoutes from '../../routes/deleteApps.js';
import Application from '../../models/applications.js';

const app = express();
app.use(express.json());
app.use('/delete-apps', deleteAppsRoutes);

describe('DELETE /delete-apps', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should delete an application and return a success message', async () => {
    const mockId = 'mocked_id';
    const mockApp = {
      _id: mockId,
      personalDetails: { name: 'John Doe', age: 30, email: 'john@example.com' },
      income: [],
      expenses: [],
      assets: [],
      liabilities: []
    };

    sinon.stub(Application, 'findByIdAndDelete').returns(mockApp);

    const res = await request(app)
      .delete('/delete-apps')
      .send({ id: mockId });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Application deleted successfully');
  });

  it('should return 404 if the application is not found', async () => {
    const mockId = 'mocked_id';

    sinon.stub(Application, 'findByIdAndDelete').returns(null);

    const res = await request(app)
      .delete('/delete-apps')
      .send({ id: mockId });

    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('message', 'Application not found');
  });

  it('should return 400 if id is missing', async () => {
    const res = await request(app)
      .delete('/delete-apps')
      .send({}); // Missing id

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'ID is required');
  });

  it('should return 500 if there is an error during the deletion', async () => {
    const mockId = 'mocked_id';

    sinon.stub(Application, 'findByIdAndDelete').throws(new Error('Database error'));

    const res = await request(app)
      .delete('/delete-apps')
      .send({ id: mockId });

    expect(res.status).to.equal(500);
    expect(res.body).to.have.property('message').that.includes('Internal server error');
  });
});
