import Fastify from 'fastify'
import { channelsRoutes } from './routes/channels'
import { metricsRoutes } from './routes/metrics'

const server = Fastify({
  logger: true
})

// Declare a route
server.register(channelsRoutes, {
  prefix: 'channels',
})
server.register(metricsRoutes, {
  prefix: 'channels',
})

// Run the server!
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