import express from 'express'
import server from '../..'
import router from './routes'
import { serverConfig } from './express-config'
import { mongoConnect } from '../database/mongodb/connection'

import { errorHandlingMiddleware } from '@ticket-common/common'
import configKeys from '../../config/config'

import 'express-async-errors'
import { kafkaConsumerController } from '../../adapters/controllers/kafkaController'
import { KafkaConsumerInterface } from '../../adapters/Interfaces/queue/kafkaConsumer'
import { KafkaMongDbInterface } from '../../adapters/Interfaces/repositories/kafkaDbInterface'
import { keys } from '../queue/kafka/topics'

const PORT = configKeys.PORT

// for passing as argument
const app = express()

// configuring express app
serverConfig(app, express)

router(app, express)

app.use(errorHandlingMiddleware)

const startServer = async (): Promise<void> => {
  await mongoConnect()

  server.listen(PORT, () => {
    // Only if environment is development
    if (configKeys.NODE_ENV === 'development') {
      console.log(`profile listening on port ${PORT}`)
    }
  })

  await kafkaConsumerController({
    kafaCalls: new KafkaConsumerInterface(),
    kakfaMongDbCalls: new KafkaMongDbInterface(),
    consumerKeys: keys
  })
}

void startServer()

export default app
