import { FastifyReply, FastifyRequest } from "fastify";
import { TypeormChannelsRepository } from "../../../../data/repositories/typeorm/typeorm-channels-repository";
import { CreateChannelUseCase } from "../../../../application/usecases/create-channel-use-case";
import { createChannelBodySchema } from "./utils/create-route-schemas";

export async function createChannel(request: FastifyRequest, reply: FastifyReply) {
  try {
    const {
      domain,
      internal_link,
      is_reference,
      name,
      theme
    } = createChannelBodySchema.parse(request.body)

    const channelsRepository = new TypeormChannelsRepository()
    const createChannelUseCase = new CreateChannelUseCase(channelsRepository)
    
    await createChannelUseCase.execute({ domain, internal_link, is_reference, name, theme})
  } catch(error) {
    console.error(error);
    
    return reply.code(500).send({ error: 'Internal Server Error.'})
  }
}
