import { FastifyInstance } from "fastify"
import { getChannelsAverageMetrics } from "./channel-average-metrics/channels-average-metrics";
import { getThemeAverageMetrics } from "./channel-average-metrics/theme-average-metrics";

export async function metricsRoutes(server: FastifyInstance) {
  server.get(
    '/metrics/average/:period',
    getChannelsAverageMetrics
  )

  server.get(
    '/:theme/metrics/average/:period',
    getThemeAverageMetrics
  )
}
