import dotenv from 'dotenv'
dotenv.config()

const configKeys = {
  PORT: process.env.PORT ?? 3000,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  MONGO_URL: process.env.MONGO_URL ?? 'mongodb://localhost:27017/auth',
  BASE_URL: process.env.BASE_URL as string,
  KAFKA_BROKER: process.env.KAFKA_BROKER as string
}

export default configKeys
