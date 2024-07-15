import mongoose from 'mongoose'
import configKeys from '../../../config/config'

import { DbConnectionError } from '@ticket-common/common'

export const mongoConnect = async (): Promise<void> => {
  try {
    const MONGO_URL = configKeys.MONGO_URL

    await mongoose.connect(MONGO_URL)
    console.log('mongodb Connected')
  } catch (error) {
    throw new DbConnectionError()
  }
}
