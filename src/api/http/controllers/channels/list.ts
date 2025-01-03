import { FastifyReply } from "fastify";
import { TypeormChannelsRepository } from "../../../../data/repositories/typeorm/typeorm-channels-repository";
import { IChannel } from "../../../../domain/entities/channel.interface";

export async function listChannels(_: unknown, reply: FastifyReply) {
  try {
    const channelsRepository = new TypeormChannelsRepository()
    const channelsList: IChannel[] = await channelsRepository.listAll() as IChannel[]
    
    return reply.code(200).send({ channels_count: channelsList.length, channels: channelsList })
  } catch(error) {
    console.error(error);
    
    return reply.code(500).send({ error: 'Internal Server Error.' })
  }
}
