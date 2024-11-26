import { FastifyInstance } from "fastify"

export async function channelsRoutes(server: FastifyInstance) {
  server.get(
    '/',
    async () => {
      return { thisIs: 'channels' }
    },
  )
}