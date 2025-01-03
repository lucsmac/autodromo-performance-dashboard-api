import { FastifyInstance } from "fastify"
import { listChannelMetrics } from "./list"
import { listAverageChannelMetrics } from "./list-average"

export async function channelRoutes(server: FastifyInstance) {
  server.get('/:channel_id/metrics', listChannelMetrics)
  server.get('/:channel_id/metrics/average/:period', listAverageChannelMetrics)
}
