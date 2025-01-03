import Fastify from 'fastify';
import { appRoutes } from './http/routes';
import { env } from '../config/env';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';

const server = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifySwagger);
server.register(fastifySwaggerUi, { routePrefix: '/docs' });
server.register(appRoutes);

server.listen({ port: env.API_PORT, host: '0.0.0.0' })
  .then(() => {
    console.log(`Application is running at port ${env.API_PORT}! 🚀`);
  })
  .catch((err) => {
    server.log.error(err);
    process.exit(1);
  });
