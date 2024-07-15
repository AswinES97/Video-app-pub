import { createClient } from 'redis'

export const connectRedis = (): any => {
  // two clients are local and the deployment in k8s.
  const client = createClient({
    url: 'redis://redis-service:6379'
    // url: 'redis://localhost:6379'
  })
  client.connect().catch((err) => {
    console.log('Redis connection error: ', err)
  })
  return client
}
