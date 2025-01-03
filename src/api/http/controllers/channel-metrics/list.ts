import { FastifyReply, FastifyRequest } from "fastify";
import { querySchema, requestParamsSchema } from "./utils/list-route-schemas";
import { TypeormChannelsRepository } from "../../../../data/repositories/typeorm/typeorm-channels-repository";
import { TypeormMetricsRepository } from "../../../../data/repositories/typeorm/typeorm-metrics-repository";
import { GetChannelMetricsUseCase } from "../../../../application/usecases/get-channel-metrics-use-case";
import { ResourceNotFound } from "../../../../domain/errors/resource-not-found";

export async function listChannelMetrics(request: FastifyRequest, reply: FastifyReply) {
  try {
      const { channel_id } = requestParamsSchema.parse(request.params);
  
      const channelsRepository = new TypeormChannelsRepository()
      const metricsRepository = new TypeormMetricsRepository()

      const getChannelMetricsUseCase = new GetChannelMetricsUseCase(channelsRepository, metricsRepository)
      const { metric, startDate, endDate } = querySchema.parse(request.query); 

      const channelMetrics = await getChannelMetricsUseCase.execute(
        {
          channel_id,
          filterOptions: {
            endDate,
            startDate,
            metric
          }
        }
      )
  
      return reply.code(200).send(channelMetrics)
    } catch(error) {
      console.error(error)

      if (error instanceof ResourceNotFound) {
        return reply.code(404).send({ error: 'Channel not found.'})
      }
  
      return reply.code(500).send({ error: 'Internal Server Error' })
    }
}