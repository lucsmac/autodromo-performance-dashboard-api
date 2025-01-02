import { FastifyInstance } from "fastify"
import { listAverageChannelsMetricsByTheme } from "./list-by-theme"
import { listAverageChannelsMetrics } from "./list"

export async function metricsRoutes(server: FastifyInstance) {
  server.get('/metrics/average/:period', listAverageChannelsMetricsByTheme)
  server.get('/:theme/metrics/average/:period', listAverageChannelsMetrics)
}
