export const configKeys = {
  PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as string,
  AWS_BUCKET: process.env.AWS_BUCKET as string,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID as string,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
  AWS_REGION: process.env.AWS_REGION as string,
  JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY as string,
};
