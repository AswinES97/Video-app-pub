import http from 'node:http'
import 'express-async-errors'
import 'dotenv/config'
import app from './app'
import { configKeys } from './config/configKeys'

const server = http.createServer(app)
const PORT = configKeys.PORT

const startServer = (): void => {
  server.listen(PORT, () => {
    console.log(server.address())
  })
}

// To avoid running server on tests.
if (process.env.NODE_ENV !== 'test') {
  startServer()
}
