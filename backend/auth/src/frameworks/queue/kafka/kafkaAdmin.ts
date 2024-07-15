import { type Kafka } from 'kafkajs'
import { keys } from './topics'

export class KafkaAdmin {
  private readonly kafkaAdmin

  constructor(kafkaClient: Kafka) {
    this.kafkaAdmin = kafkaClient.admin()
  }

  async connect(): Promise<void> {
    const topics = await this.kafkaAdmin.listTopics()
    console.log(topics)
    if (topics.includes(keys.emailVerified)) {
      console.log(`Topic ${keys.emailVerified} already exost.`)
    } else {
      await this.kafkaAdmin.connect()
      await this.setTopic()
      console.log(`Topic ${keys.emailVerified} created.`)
    }
  }

  async setTopic(): Promise<void> {
    await this.kafkaAdmin.createTopics({
      topics: [
        {
          topic: keys.emailVerified
        }
      ]
    })
    // await this.kafkaAdmin.fetchTopicMetadata({ topics: [keys.emailVerified] })
    await this.disconnect()
  }

  async disconnect(): Promise<void> {
    await this.kafkaAdmin.disconnect()
  }
}
