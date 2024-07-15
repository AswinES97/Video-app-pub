import { type kafakEntitiesType } from '../../../entities/user'
import { ConsumerFactory } from '../../../frameworks/queue/kafka/consumer'
import { type consumerKeys } from '../../../frameworks/queue/kafka/topics'
import { type IKafkaConsumer } from '../../../types/types'
import { type KafkaMongDbInterface } from '../repositories/kafkaDbInterface'

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
    consumerKeys: consumerKeys,
    kafakEntities: kafakEntitiesType
  ): Promise<void> {
    await this.kafkaConsumer.consume(
      kafkaMongoDbCalls,
      consumerKeys,
      kafakEntities
    )
  }

  async consumerDisconnect (): Promise<void> {
    await this.kafkaConsumer.disconnect()
  }
}
