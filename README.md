# Assets Finance Platform Backend Documentation

## Overview

This document provides an overview of the CI/CD pipeline and backend architecture for the assets-finance-platform-backend project. It outlines the steps involved in the continuous integration and deployment process, as well as details about the backend services and their interactions.

## CI/CD Pipeline

The CI/CD pipeline automates the process of building, testing, and deploying the application. It ensures that code changes are integrated and deployed efficiently and reliably. The pipeline is defined in the `.github/workflows/deploy.yaml` file.



1. **AWS SAM**:
   - AWS SAM is a framework that simplifies the process of building and deploying serverless applications on AWS. It allows you to define your application's infrastructure as code using a `template.yaml` file.
   - The SAM CLI provides commands to build the application, package it, and deploy it to AWS. It also handles the creation of necessary AWS resources, such as Lambda functions and API Gateway endpoints.

2. **GitHub Actions**:
   - GitHub Actions is used to create workflows that automate the CI/CD process. The workflow is defined in the `.github/workflows/deploy.yaml` file.
   - The workflow is triggered on specific events, such as a push to the main branch. It includes steps for checking out the code, setting up the environment, installing dependencies, running tests, and deploying the application using AWS SAM.

3. **Deployment Process**:
   - When code is pushed to the repository, GitHub Actions initiates the workflow.
   - The workflow checks out the code and sets up the Node.js environment.
   - It installs the necessary dependencies defined in the `package.json` file.
   - Automated tests are executed to ensure that the application functions as expected.
   - If all tests pass, the SAM CLI is used to build the application and deploy it to AWS. The deployment process includes packaging the application and creating or updating the CloudFormation stack defined in the `template.yaml` file.

## Backend Architecture

The backend of the assets-finance-platform is built using AWS Lambda functions, which are defined in the `template.yaml` file. The architecture follows a serverless model, allowing for scalable and cost-effective deployment.

### Key Components

- **AWS Lambda**: Serverless compute service that runs the application code in response to events.
- **API Gateway**: Manages API requests and routes them to the appropriate Lambda functions.
- **MongoDB**: A NoSQL database used for storing application data, with connections managed in `src/db/mongoConnection.js`.

### Directory Structure

The backend code is organized as follows:

```
src/
├── app.js                
├── db/
│   └── mongoConnection.js 
├── models/              
│   └── applications.js   
└── routes/              
    ├── createApps.js
    ├── readApps.js
    ├── updateApps.js
    └── deleteApps.js
```
### API Endpoints

The application exposes several API endpoints for managing applications. Each endpoint corresponds to a specific function in the `src/routes` directory.

- **Create Application**: `POST /create-apps`
- **Read Applications**: `GET /read-apps`
- **Update Application**: `PUT /update-apps`
- **Delete Application**: `DELETE /delete-apps`

