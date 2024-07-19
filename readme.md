# Video Upload, Transcode, and Live Stream Application
  Welcome to the repository for our video upload, transcode, and live stream  application. This project is currently under development, and I am excited to share my progress with you. Below, you will find all the necessary details about the project, its structure, technologies used, and how to get started.

#### Table of Contents
  1. [Overview](#overview)
  2. [Technologies Used](#technologies-used)
  3. [Project Structure](#project-structure)
  4. [Getting Started](#getting-started)
  5. [Starting the Cluster](#starting-the-cluster)
  <br>

### Overview
  This application allows users to upload videos, which are then transcoded and made available for live streaming. The backend is built with Node.js and Express, while the frontend is developed using Angular. We use a combination of MongoDB and PostgreSQL for data storage, and Kafka for messaging between microservices.
  <br>

### Technologies Used
  - Frontend: Angular 16, NGRX <br>
  - Backend: Node.js 18.17, Express <br>
  - Databases: MongoDB with mongoose, PostgreSQL with Sequelize ORM <br>
  - Messaging: Kafka <br>
  - Testing: Jest <br>
  - Containerization: Docker <br>
  - Orchestration: Kubernetes <br>
  - Authentication: JWT HSA/RSA <br>
  - Email: Node-Mailer <br>
  - File Storage: AWS S3 <br>
  - Error Handling: Custom NPM package <br>

### Project Structure
  <br>

  ```bash
  root
  │── backend
  │   ├── apigateway
  │   ├── auth
  │   ├── infra
  │   ├── isolated-uploader
  │   ├── profile
  │   ├── video
  │   ├── ...
  │── frontend
  │   ├── src
  │   │   ├── app
  │   │   ├── assets
  │   │   ├── environments
  │   │   └── ...
  │   ├── angular.json
  │   ├── package.json
  │   └── ...
  └── ...
  ```

  <br>

### Getting Started
  - Prerequisites <br>
    - Node.js 18.17 <br>
    - Docker <br>
    - Kubernetes <br>
    - MongoDB <br>
    - PostgreSQL <br>
    - AWS S3 CLI/aws-sdk <br>

  - Clone the repository:
    ```bash
    git clone https://github.com/AswinES97/Video-app-pub.git
    ```
    <br>

  -  Install dependencies: <br>
    1. In backend, npm install on all services if you want to run individual services. <br>
    2. create .env for all services as mentioned in the respective readme file. <br>
    3. In frontend, 'npm install'. <br>
    <br>

### Starting the Cluster
  1. In backend, if you have a k8s cluster/minikube follow the readme on the backend to start.
  2. In frontend, ng serve
  <br>

## We welcome contributions from the community. Please follow these steps to  contribute:

  - Fork the repository
  - Create a new branch (git checkout -b feature-branch)
  - Commit your changes (git commit -am 'Add new feature')
  - Push to the branch (git push origin feature-branch)
  - Create a new Pull Request
