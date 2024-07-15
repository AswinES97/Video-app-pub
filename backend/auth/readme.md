# Welcome to the Authentication Service
This service deals with user creation, sign-in, and token creation. It follows SOLID principles and incorporates functional programming concepts.

# Getting Started
To run this service independently, follow these steps:

# 1. Generate and Add Key-Pair
Create a key-pair as mentioned in the main README file.
Copy the key-pair to a keys folder in this directory.
Refer to config/config.ts for configuration details.

# 2. Create a .env File
Create a .env file in the root directory with the following variables:

  PORT=
  NODE_ENV=
  MONGO_URL=
  NODE_MAILER_PASS=
  JWT_SECRET=
  MAIL_URL='http://localhost:4200/email-verification'
  KAFKA_BROKER=

# 3. Start the Service
Once you have the keys folder and .env file set up, you can start the service using your preferred method (npm run dev).

# Dependencies
Ensure you have the following dependencies installed and configured:

Kafka Broker: Required for message brokering.

# Contributing
We welcome contributions! Please read our Contributing Guidelines for more details.

# License
This project is licensed under the MIT License - see the LICENSE file for details.
