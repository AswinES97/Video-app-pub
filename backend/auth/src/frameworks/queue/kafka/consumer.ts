import { Kafka, type Consumer } from 'kafkajs'
import { KafkaClient } from './kafka'
import { type KafkaMongDbInterface } from '../../../adapters/Interfaces/repositories/kafkaDbInterface'
import { type kafkaKeys } from './topics'
import { type kafakEntitiesType } from '../../../entities/user'
import { KafkaAdmin } from './kafkaAdmin'

export class ConsumerFactory {
  private readonly kafkaConfig: KafkaClient
  private readonly consumer: Consumer
  private readonly kafkaAdmin: KafkaAdmin
  private readonly kafka: Kafka

  constructor() {
    this.kafkaConfig = new KafkaClient()
    this.kafka = this.kafkaConfig.getClient()
    this.kafkaAdmin = new KafkaAdmin(this.kafka)
    this.consumer = this.consumerInit()
  }

  async connect(): Promise<void> {
    await this.kafkaAdmin.connect()
    await this.consumer.connect()
  }

  async consume(
    kafkaMongoDbCalls: KafkaMongDbInterface,
    kafkaKeys: kafkaKeys,
    kafakEntities: kafakEntitiesType
  ): Promise<void> {
    await this.consumer.subscribe({
      topics: ['Profile'],
      fromBeginning: false
    })

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log({
          key: message.key?.toString(),
          value: message.value?.toString(),
          headers: message.headers
        })
      }
    })
  }

  private consumerInit(): Consumer {
    return this.kafka.consumer({ groupId: 'auth-consumer' })
  }

  async disconnect(): Promise<void> {
    await this.consumer.disconnect()
  }
}
