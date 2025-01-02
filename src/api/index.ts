import Fastify from 'fastify'
import { appRoutes } from './http/routes'
import { env } from '../config/env';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { setupSwagger } from './docs/setup-swagger';

const server = Fastify({
  logger: true
}).withTypeProvider<ZodTypeProvider>()

server.register(setupSwagger)
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