import { MetricsOptions } from '@/api/http/controllers/channel-metrics/utils/metrics-schemas';
import { Metrics, PerformanceMetricsResponse } from '@/models/types/metrics'

export const filterByMetric = (metric: MetricsOptions, channelMetrics: Metrics[] | PerformanceMetricsResponse[]): PerformanceMetricsResponse[] => {
  const filteredMetricsData = channelMetrics.map(metricData => {
    return {
      time: metricData.time,
      [metric]: metricData[metric]
    }
  })

  return filteredMetricsData
};
