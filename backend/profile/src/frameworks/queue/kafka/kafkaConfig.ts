import { Kafka } from 'kafkajs'
import configKeys from '../../../config/config'

export class KafkaClient {
  getClient(): Kafka {
    const kafka = new Kafka({
      clientId: 'profile',
      brokers: [`${configKeys.KAFKA_BROKER}`]
    })
    return kafka
  }
}
