import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const swaggerConfig = {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Autódromo Performance Dashboard API',
      description: 'Performance monitoring dashboard for the Autodromo websites.',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: true,
  },
  uiHooks: {
  },
  staticCSP: true,
  exposeRoute: true,
  transform: jsonSchemaTransform,
}
  