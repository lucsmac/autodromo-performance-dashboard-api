import { FastifyInstance } from "fastify"
import { listChannels } from "./list"
import { listChannelsByTheme } from "./list-by-theme"
import { createChannel } from "./create"
import { deleteChannel } from "./delete"

export async function channelsRoutes(server: FastifyInstance) {
  server.get('/', listChannels)
  server.post('/', createChannel)
  server.delete('/:channel_id', deleteChannel)
  server.get('/theme/:theme', listChannelsByTheme)
}
