import { FastifyReply, FastifyRequest } from "fastify";
import { querySchema, requestParamsSchema } from "./utils/schemas";
import { ChannelRepository } from "../../../data/repositories/channels-repository";
import { MetricsRepository } from "../../../data/repositories/metrics-repository";
import { PerformanceMetricsResponse } from "../../../domain/types/metrics";
import { filterByDate } from "./utils/filter-by-date";
import { filterByMetric } from "./utils/filter-by-metric";
import { ZodError } from "zod";

export const getChannelMetrics = async (request: FastifyRequest, reply: FastifyReply) => {
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
    console.error(error)

    if (error instanceof ZodError) {
      return reply.code(500).send({ error: 'Internal Server Error', message: error.message })
    }

    return reply.code(500).send({ error: 'Internal Server Error' })
  }
}
