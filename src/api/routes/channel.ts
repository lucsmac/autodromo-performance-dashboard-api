import { FastifyInstance } from "fastify"
import { getChannelMetrics } from "./channels-metrics/channel-metrics"
import { getChannelAverageMetrics } from "./channel-average-metrics/channel-average-metrics"

export async function channelRoutes(server: FastifyInstance) {
  server.get(
    '/:channel_id/metrics',
    getChannelMetrics
  )

  server.get(
    '/:channel_id/metrics/average/:period',
    getChannelAverageMetrics
  )
}
