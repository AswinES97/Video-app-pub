import { type IUserAttr } from '../../../types/types'

import { Partitioners, type Kafka, type Producer } from 'kafkajs'
import { KafkaClient } from './kafka'

export default class ProducerFactory {
  private readonly producer: Producer
  private readonly kafkaConfig: KafkaClient

  constructor () {
    this.kafkaConfig = new KafkaClient()
    this.producer = this.createProducer(this.kafkaConfig.getClient())
  }

  public async start (): Promise<void> {
    try {
      await this.producer.connect()
    } catch (error) {
      console.log('Error connecting the producer: ', error)
    }
  }

  public async shutdown (): Promise<void> {
    await this.producer.disconnect()
  }

  public async send (data: IUserAttr | string, key: string): Promise<void> {
    await this.start()

    await this.producer.send({
      topic: 'Auth-Service',
      messages: [{
        key,
        value: JSON.stringify(data)
      }]
    })

    await this.shutdown()
  }

  private createProducer (kafka: Kafka): Producer {
    return kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner
    })
  }
}
