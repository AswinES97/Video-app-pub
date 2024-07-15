import http from 'http'

import app from './frameworks/webserver/server'

// create server with http
const server = http.createServer(app)

export default server
