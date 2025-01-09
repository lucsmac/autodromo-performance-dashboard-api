import { MetricsOptions } from "../api/http/controllers/channel-metrics/utils/metrics-schemas";
import { PerformanceAverageMetricsResponse, PerformanceMetricsResponse } from "../models/types/metrics";

export const filterByAverageMetric = (metric: MetricsOptions, channelMetrics: PerformanceAverageMetricsResponse[]): PerformanceMetricsResponse[] => {
  const filteredMetricsData = channelMetrics.map(metricData => {
    return {
      time: metricData.period_start,
      [metric]: metricData[`avg_${metric === 'responseTime' ? 'response_time' : metric}`]
    }
  })

  return filteredMetricsData
};
