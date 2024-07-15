import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
// import app from '../src/frameworks/webserver/server'

let mongo: MongoMemoryServer

// initilize mongodb in-memory database before all test
beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()
  await mongoose.connect(mongoUri)
})

// clear all data from in-memory db before all test
beforeAll(async () => {
  await mongoose.connection.db.dropDatabase()
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongo.stop()
})
