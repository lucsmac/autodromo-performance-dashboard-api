import { Metrics, PerformanceMetricsResponse } from '../domain/types/metrics'
import { MetricsOptions } from '../api/http/controllers/channel-metrics/utils/list-route-schemas'

export const filterByMetric = (metric: MetricsOptions, channelMetrics: Metrics[] | PerformanceMetricsResponse[]): PerformanceMetricsResponse[] => {
  const filteredMetricsData = channelMetrics.map(metricData => {
    return {
      time: metricData.time,
      [metric]: metricData[metric]
    }
  })

  return filteredMetricsData
};
