import { FastifyInstance } from "fastify"
import { listChannels } from "./list"
import { showOneChannel } from "./show-one"
import { createChannel } from "./create"

export async function channelsRoutes(server: FastifyInstance) {
  server.get('/', listChannels)
  server.post('/', createChannel)
  server.get('/theme/:theme', showOneChannel)
}
