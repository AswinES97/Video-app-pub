import fs from 'fs'
import path from 'path'

// Helper function to handle nullish/empty values
const getEnvVar = (envVar: string | undefined, fallbackPath: string): string => {
  return envVar ?? fallbackPath
}

// Define paths
const publicKeyPath = getEnvVar(process.env.JWT_PUBLIC_KEY, path.join(__dirname, '../keys/ticketing_pub.pem'))

export const configKeys = {
  PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_PUBLIC_KEY: fs.readFileSync(publicKeyPath, 'utf8'),
  AUTH_SRV: process.env.AUTH_SRV as string,
  PROFILE_SRV: process.env.PROFILE_SRV as string,
  VIDEO_SRV: process.env.VIDEO_SRV as string
}
