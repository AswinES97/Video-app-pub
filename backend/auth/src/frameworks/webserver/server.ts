import express from 'express'
import server from '../..'
import router from './routes'
import configKeys from '../../config/config'
import { errorHandlingMiddleware } from '@ticket-common/common'
import { mongoConnect } from '../database/mongodb/connection'
import { serverConfig } from './express-config'
import { KafkaConsumerInterface } from '../../adapters/Interfaces/queue/kafka'
import { KafkaMongDbInterface } from '../../adapters/Interfaces/repositories/kafkaDbInterface'
import { keys } from '../queue/kafka/topics'
import { kafkaConsumerController } from '../../adapters/controllers/kafka'

const PORT = configKeys.PORT
const app = express()

// configuring express app
serverConfig(app, express)
router(app, express)

app.use(errorHandlingMiddleware)

const startServer = async (): Promise<void> => {
  await mongoConnect()

  if (configKeys.NODE_ENV !== 'test') {
    await kafkaConsumerController({
      kafaCalls: new KafkaConsumerInterface(),
      kakfaMongDbCalls: new KafkaMongDbInterface(),
      consumerKeys: keys
    })
  }

  server.listen(PORT, () => {
    // Only if environment is development
    if (configKeys.NODE_ENV === 'development') {
      console.log(`auth listening on port ${PORT}`)
    }
  })
}

if (configKeys.NODE_ENV !== 'test') {
  void startServer()
}

export default app
