import { FastifyInstance } from "fastify"
import { listChannels } from "./list"
import { showOneChannel } from "./show-one"

export async function channelsRoutes(server: FastifyInstance) {
  server.get('/', listChannels)
  server.get('/theme/:theme', showOneChannel)
}
