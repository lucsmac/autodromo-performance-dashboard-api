import { PerformanceAverageMetricsResponse, PerformanceMetricsResponse } from '../../../../domain/types/metrics'
import { MetricsOptions } from '../../channels-metrics/utils/schemas';

export const filterByAverageMetric = (metric: MetricsOptions, channelMetrics: PerformanceAverageMetricsResponse[]): PerformanceMetricsResponse[] => {
  const filteredMetricsData = channelMetrics.map(metricData => {
    return {
      time: metricData.period_start,
      [metric]: metricData[`avg_${metric === 'responseTime' ? 'response_time' : metric}`]
    }
  })

  return filteredMetricsData
};
