import Fastify from 'fastify'
import { appRoutes } from './http/routes'
import { env } from '../config/env';

const server = Fastify({
  logger: true
})

server.register(appRoutes);

try {
  const startServer = async () => {
    await server.listen({ port: env.API_PORT, host: '0.0.0.0' })
  }

  startServer()
  console.log('Application is running at port 3000! 🚀');
} catch (err) {
  server.log.error(err)
  process.exit(1)
}