import { FastifyInstance } from "fastify"
import { ZodError } from "zod"
import { MetricsRepository } from "../../data/repositories/metrics-repository";
import { ChannelRepository } from "../../data/repositories/channel-repository";
import { querySchema, requestParamsSchema } from "./channels/utils/schemas";
import { filterByMetric } from "./channels/utils/filter-by-metric";
import { PerformanceMetricsResponse } from "../../data/types/metrics";
import { filterByDate } from "./channels/utils/filter-by-date";

export async function metricsRoutes(server: FastifyInstance) {
  server.get(
    '/:channel_id/metrics',
    async (request, reply) => {
      try {
        const { channel_id } = requestParamsSchema.parse(request.params);

        const channelsRepository = new ChannelRepository()
        const channel = await channelsRepository.findById(channel_id)

        if (!channel) {
          return reply.code(404).send({ error: 'Channel not found.'})
        }

        const metricsRepository = new MetricsRepository()
        const channelMetrics = await metricsRepository.listByChannel(channel)

        const { metric, startDate, endDate } = querySchema.parse(request.query);

        let channelsMetricsResponseData: PerformanceMetricsResponse[] = channelMetrics;

        if (startDate || endDate) {
          channelsMetricsResponseData = filterByDate({ startDate, endDate }, channelsMetricsResponseData)
        }

        if (metric) {
          channelsMetricsResponseData = filterByMetric(metric, channelsMetricsResponseData)
        }

        return reply.code(200).send({
          channel_url: channel.internal_link,
          theme: channel.theme,
          metrics: channelsMetricsResponseData
        })
      } catch(error) {
        server.log.error(error)

        if (error instanceof ZodError) {
          return reply.code(500).send({ error: 'Internal Server Error', message: error.message })
        }

        return reply.code(500).send({ error: 'Internal Server Error' })
      }
    },
  )
}
