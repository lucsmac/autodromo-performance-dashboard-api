import { FastifyInstance } from 'fastify'
import { listChannels } from './list'
import { listChannelsByTheme } from './list-by-theme'
import { createChannel } from './create'
import { deleteChannel } from './delete'
import { editChannel } from './edit'

export async function channelsRoutes(server: FastifyInstance) {
  server.get('/', listChannels)
  server.post('/', createChannel)
  server.delete('/:channel_id', deleteChannel)
  server.patch('/:channel_id', editChannel)
  server.get('/theme/:theme', listChannelsByTheme)
}
