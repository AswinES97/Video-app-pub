import { kafkaUseCase } from '../../application/user-cases/user'
import { type kafkaParams } from '../../types/types'

export const kafkaConsumerController = async (
  params: kafkaParams
): Promise<void> => {
  await params.kafaCalls.connect()
  await kafkaUseCase(params)
}
