import { Metrics, PerformanceMetricsResponse } from '../../../../data/types/metrics'
import { MetricsOptions } from './schemas'

export const filterByMetric = (metric: MetricsOptions, channelMetrics: Metrics[] | PerformanceMetricsResponse[]): PerformanceMetricsResponse[] => {
  const filteredMetricsData = channelMetrics.map(metricData => {
    return {
      time: metricData.time,
      [metric]: metricData[metric]
    }
  })

  return filteredMetricsData
};
