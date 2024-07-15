# Welcome to the Main Entry Service

This service is the main entry point for the application and forwards requests to the respective services. Follow the instructions below to get started.

## Getting Started

To run the application, you need to perform a few setup steps.

### Step 1: Copy the Public Key

Copy the `public_key` mentioned in the main README file to a `keys` folder in this directory. This is necessary for authentication and encryption. You can check the `config/configkeys.ts` file for more details.

### Step 2: Create a .env File

If you want to run the individual service without using Skaffold, you need to create a `.env` file with the following values:

```env
PORT=
NODE_ENV=
AUTH_SRV=
PROFILE_SRV=
VIDEO_SRV=
JWT_SECRET=
