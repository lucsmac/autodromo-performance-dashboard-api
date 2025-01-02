import Fastify from 'fastify'

import { createBoard } from './http/controllers/bull-board/ui'
import { channelRoutes } from './http/controllers/channel-metrics/routes'
import { channelsRoutes } from './http/controllers/channels/routes'
import { metricsRoutes } from './routes/metrics'

const server = Fastify({
  logger: true
})

server.register(createBoard(), {
  prefix: 'bull-board',
  basePath: '/bull-board'
});

server.register(channelRoutes, {
  prefix: 'channel',
})
server.register(channelsRoutes, {
  prefix: 'channels',
})
server.register(metricsRoutes, {
  prefix: 'channels',
})

try {
  const startServer = async () => {
    await server.listen({ port: 3000, host: '0.0.0.0' })
  }

  startServer()
  console.log('Application is running at port 3000! 🚀');
} catch (err) {
  server.log.error(err)
  process.exit(1)
}