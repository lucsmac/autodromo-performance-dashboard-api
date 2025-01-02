import { FastifyReply, FastifyRequest } from "fastify";
import { TypeormMetricsRepository } from "../../../../data/repositories/typeorm/typeorm-metrics-repository";
import { querySchema, requestParamsSchema } from "./utils/list-route-schemas";
import { GetChannelsAverageMetricsUseCase } from "../../../../application/usecases/get-channels-average-metrics-use-case";

export async function listAverageChannelsMetrics(request: FastifyRequest, reply: FastifyReply) {
  try {
      const { metric, startDate, endDate } = querySchema.parse(request.query);
      const { period } = requestParamsSchema.parse(request.params);
      
      const metricsRepository = new TypeormMetricsRepository()
      const getChannelMetricsAverageUseCase = new GetChannelsAverageMetricsUseCase(metricsRepository)
  
      const metricsAverageData = await getChannelMetricsAverageUseCase.execute({
        metric,
        filterPeriodOptions: {
          period,
          endDate,
          startDate
        }
      })
      
      return reply.code(200).send({
        metrics: metricsAverageData
      })
  } catch (error) {
    console.error(error);
  }
}