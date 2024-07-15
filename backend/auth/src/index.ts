import http from 'http'

import app from './frameworks/webserver/server'

const server = http.createServer(app)

export default server
