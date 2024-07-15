import fs from 'fs'
import path from 'path'
import 'dotenv/config'

// Helper function to handle nullish/empty values
const getEnvVar = (
  envVar: string | undefined,
  fallbackPath: string
): string => {
  return envVar ?? fallbackPath
}

// Define paths
const privateKeyPath = getEnvVar(
  process.env.JWT_PRIVATE_KEY,
  path.join(__dirname, '../keys/ticketing.pem')
)
const publicKeyPath = getEnvVar(
  process.env.JWT_PUBLIC_KEY,
  path.join(__dirname, '../keys/ticketing_pub.pem')
)

const configKeys = {
  PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as string,
  MONGO_URL: process.env.MONGO_URL as string,
  NODE_MAILER_PASS: process.env.NODE_MAILER_PASS as string,
  MAIL_URL: process.env.MAIL_URL as string,
  KAFKA_BROKER: process.env.KAFKA_BROKER as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_PRIVATE_KEY: fs.readFileSync(path.resolve(privateKeyPath), 'utf8'),
  JWT_PUBLIC_KEY: fs.readFileSync(path.resolve(publicKeyPath), 'utf8')
}

export default configKeys
