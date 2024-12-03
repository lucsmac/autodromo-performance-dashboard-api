import { FastifyReply, FastifyRequest } from "fastify"
import { ZodError } from "zod";
import { getMetricsByPeriod } from "./utils/get-metrics-average";
import { themeRequestParamsSchema } from "./utils/schemas";
import { querySchema } from "../channels-metrics/utils/schemas";
import { filterByAverageMetric } from "./utils/filter-by-average-metric";

export const getThemeAverageMetrics = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { metric, startDate, endDate } = querySchema.parse(request.query);
    const { period, theme } = themeRequestParamsSchema.parse(request.params);
    
    const metricsAverage = await getMetricsByPeriod({ period, startDate, endDate, theme })

    let metricsResponseData = metricsAverage
    
    if (metric) {
      metricsResponseData = filterByAverageMetric(metric, metricsResponseData)
    }

    return reply.code(200).send({
      metrics: metricsResponseData
    })
  } catch(error) {
    console.error(error)

    if (error instanceof ZodError) {
      return reply.code(500).send({ error: 'Internal Server Error', message: error.message })
    }

    return reply.code(500).send({ error: 'Internal Server Error' })
  }
}
