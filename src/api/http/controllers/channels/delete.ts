import { FastifyReply, FastifyRequest } from "fastify";
import { TypeormChannelsRepository } from "../../../../data/repositories/typeorm/typeorm-channels-repository";
import { deleteChannelRequestParamsSchema } from "./utils/delete-route-schemas";
import { DeleteChannelUseCase } from "../../../../application/usecases/delete-channel-use-case";

export async function deleteChannel(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { channel_id } = deleteChannelRequestParamsSchema.parse(request.params);
    
    const channelsRepository = new TypeormChannelsRepository()
    const deleteChannelUseCase = new DeleteChannelUseCase(channelsRepository)

    await deleteChannelUseCase.execute(channel_id)

    return reply.code(204).send()
  } catch(error) {
    console.log(error)

    return reply.code(500).send({ error: 'Internal Server Error.' })
  }
}
