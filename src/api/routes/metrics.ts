import { FastifyInstance } from "fastify"

export async function metricsRoutes(server: FastifyInstance) {
  server.get(
    '/',
    async () => {
      return { thisIs: 'metrics' }
    },
  )
}