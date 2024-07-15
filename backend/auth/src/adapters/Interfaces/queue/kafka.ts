import { type kafakEntitiesType } from '../../../entities/user'
import { ConsumerFactory } from '../../../frameworks/queue/kafka/consumer'
import ProducerFactory from '../../../frameworks/queue/kafka/producer'
import { type kafkaKeys, keys } from '../../../frameworks/queue/kafka/topics'

import { type IUserAttr, type IKafkaProducer, type IKafkaConsumer } from '../../../types/types'
import { type KafkaMongDbInterface } from '../repositories/kafkaDbInterface'

export class KafkaInterface implements IKafkaProducer {
  private readonly kafkaProducer: ProducerFactory
  private readonly producerTopics: kafkaKeys

  constructor () {
    this.kafkaProducer = new ProducerFactory()
    this.producerTopics = keys
  }

  async produce (userdata: IUserAttr | string, key: string): Promise<void> {
    await this.kafkaProducer.send(userdata, key)
  }

  getKeys (): kafkaKeys {
    return this.producerTopics
  }
}

export class KafkaConsumerInterface implements IKafkaConsumer {
  private readonly kafkaConsumer: ConsumerFactory

  constructor () {
    this.kafkaConsumer = new ConsumerFactory()
  }

  async connect (): Promise<void> {
    await this.kafkaConsumer.connect()
  }

  async consume (
    kafkaMongoDbCalls: KafkaMongDbInterface,
    kafkaKeys: kafkaKeys,
    kafakEntities: kafakEntitiesType
  ): Promise<void> {
    await this.kafkaConsumer.consume(
      kafkaMongoDbCalls,
      kafkaKeys,
      kafakEntities
    )
  }

  async consumerDisconnect (): Promise<void> {
    await this.kafkaConsumer.disconnect()
  }
}
