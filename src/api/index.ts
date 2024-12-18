import Fastify from 'fastify'
import { channelRoutes } from './routes/channel'
import { channelsRoutes } from './routes/channels'
import { metricsRoutes } from './routes/metrics'
import { createBoard } from './routes/bull-board'

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