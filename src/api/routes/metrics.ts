import { FastifyInstance } from "fastify"
import { getChannelMetrics } from "./channels-metrics/channel-metrics";
import { getChannelsAverageMetrics } from "./channel-average-metrics/channel-average-metrics";

export async function metricsRoutes(server: FastifyInstance) {
  server.get(
    '/:channel_id/metrics',
    getChannelMetrics
  )

  server.get(
    '/metrics/average/:period',
    getChannelsAverageMetrics
  )
}
