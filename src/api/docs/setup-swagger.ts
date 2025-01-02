import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

export function setupSwagger(server: FastifyInstance) {
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);
  
  server.register(fastifySwagger)
  server.register(fastifySwaggerUi, {
    routePrefix: '/docs'
  })
}
