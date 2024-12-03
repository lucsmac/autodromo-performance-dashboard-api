import { FastifyInstance } from "fastify"
import { ChannelRepository } from "../../data/repositories/channel-repository"
import { Channel } from "../../data/types/channel"
import { z } from "zod"

export async function channelsRoutes(server: FastifyInstance) {
  server.get(
    '/',
    async (request, reply) => {
      try {
        const channelRepository = new ChannelRepository()
        const channelsList: Channel[] = await channelRepository.listAll() as Channel[]
        
        return reply.code(200).send({ channels_count: channelsList.length, channels: channelsList })
      } catch(error) {
        server.log.error(error);
        
        return reply.code(500).send({ error: 'Internal Server Error.' })
      }
    },
  )

  server.get(
    '/theme/:theme',
    async (request, reply) => {
      try {
        const getRequestParamSchema = z.object({
          theme: z.string(),
        })

        const { theme } = getRequestParamSchema.parse(request.params);
        
        const channelRepository = new ChannelRepository()
        const channelByTheme = await channelRepository.listByTheme(theme)

        return reply.code(200).send({ channels_count: channelByTheme.length, channels: channelByTheme })
      } catch(error) {
        server.log.error(error)

        return reply.code(500).send({ error: 'Internal Server Error' })
      }
    }
  )
}
