import Fastify from 'fastify';
import { appRoutes } from './http/routes';
import { env } from '@/config/env';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider
} from 'fastify-type-provider-zod';

const server = Fastify({
  logger: true,
  ajv: {
    customOptions: {
      removeAdditional: 'all',
      coerceTypes: true,
      useDefaults: true
    }
  }
}).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Performance Dashboard API',
      description: 'API for collecting and analyzing performance metrics',
      version: '1.0.0',
      contact: {
        name: 'Autoforce',
        email: 'desenvolvimento@autoforce.com.br'
      }
    },
    servers: [
      {
        url: `http://localhost:${env.API_PORT}`,
        description: 'Local development server'
      },
      {
        url: 'https://api-staging.autoforce.com.br',
        description: 'Staging environment (work in progress)'
      },
      {
        url: 'https://api.autoforce.com.br',
        description: 'Production environment (work in progress)'
      }
    ],
  },
  transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  }
});

server.register(appRoutes);

server.listen({ port: env.API_PORT, host: '0.0.0.0' })
  .then(() => {
    console.log(`Application is running at port ${env.API_PORT}! 🚀`);
  })
  .catch((err) => {
    server.log.error(err);
    process.exit(1);
  });
