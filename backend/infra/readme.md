# Welcome to the Backend Configuration Directory
This folder contains all the necessary configuration YAML files for the Kubernetes cluster. Below, you'll find important information on how the configurations are tracked, applied, and some additional setup instructions.

<br>

## 1. File Tracking with Skaffold
The Skaffold configuration file is set to track the following directories for changes, ensuring that your development environment stays up to date:

<br>

./infra/k8s-dev/**
<br>
./infra/k8s/config/**
<br>
./infra/k8s/**
<br>
./infra/db/**
<br>

<br>

## 2. Building and Running with Docker
We use Docker to build and run our containers. For detailed instructions on applying the configuration files, please refer to the start.sh script.

<br>

## 3. MongoDB Configuration
The MongoDB instance may be hosted locally or shifted to Atlas, depending on the deployment setup. Please adjust your configuration accordingly.

<br>

## 4. Kubernetes Dashboard
To run the Kubernetes dashboard:
Uncomment the service account in the configuration files.(/k8s-dev/dashboard/)
Follow the main backend README file for further instructions.

<br>

## 5. Accessing the Application
To access the application from the domain, map 'ticketing.localdev.me' to localhost in your /etc/hosts file.

```bash
127.0.0.1 ticketing.localdev.me
```
