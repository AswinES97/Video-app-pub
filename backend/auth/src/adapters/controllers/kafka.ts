import { kafkaUseCase } from '../../user-cases/auth/user.signup'
import { type kafkaParams } from '../../types/types'

export const kafkaConsumerController = async (
  params: kafkaParams
): Promise<void> => {
  await params.kafaCalls.connect()
  await kafkaUseCase(params)
}
