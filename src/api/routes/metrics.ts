import { FastifyInstance } from "fastify"
import { getChannelMetrics } from "./channels-metrics/channel-metrics";
import { getChannelsAverageMetrics } from "./channel-average-metrics/channel-average-metrics";
import { getThemeAverageMetrics } from "./channel-average-metrics/theme-average-metrics";

export async function metricsRoutes(server: FastifyInstance) {
  server.get(
    '/:channel_id/metrics',
    getChannelMetrics
  )

  server.get(
    '/metrics/average/:period',
    getChannelsAverageMetrics
  )

  server.get(
    '/:theme/metrics/average/:period',
    getThemeAverageMetrics
  )
}
