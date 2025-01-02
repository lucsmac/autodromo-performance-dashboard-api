import Fastify from 'fastify'
import { appRoutes } from './http/routes'

const server = Fastify({
  logger: true
})

server.register(appRoutes);

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