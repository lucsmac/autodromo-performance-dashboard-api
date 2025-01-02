import { endOfDay, parseISO } from "date-fns";
import { MetricsRepository } from "../../data/repositories/metrics-repository";
import { PerformanceAverageMetricsResponse } from "../../domain/types/metrics";
import { MetricsOptions } from "../../api/http/controllers/channel-metrics/utils/metrics-schemas";
import { filterByAverageMetric } from "../../utils/filter-by-average-metrics";

type GetMetricsAverageParams = {
  period: 'hourly' | 'daily' | 'weekly'
  startDate?: string
  endDate?: string
  theme?: string
}

interface GetChannelsAverageMetricsUseCaseRequest {
  metric?: MetricsOptions
  filterPeriodOptions: GetMetricsAverageParams
}

export class GetChannelsAverageMetricsUseCase {
  constructor (private metricsRepository: MetricsRepository) {}
  
  async execute({ metric, filterPeriodOptions }: GetChannelsAverageMetricsUseCaseRequest) {
    const metricsAverage = await this._getMetricsByPeriod(filterPeriodOptions)
  
    const allMetricsResponseData = metricsAverage as PerformanceAverageMetricsResponse[]
    
    if (!metric) return allMetricsResponseData
      
    const filteredMetricsData = filterByAverageMetric(metric, allMetricsResponseData)

    return filteredMetricsData
  }

  async _getMetricsByPeriod({ period, startDate = '2000-01-01', endDate, theme }: GetMetricsAverageParams) {
    if (!period) {
      return null
    }

    const dateTrunc = {
      hourly: 'hour',
      daily: 'day',
      weekly: 'week',
    }[period];
  
    const parsedStartDate = parseISO(startDate)
    const parsedEndDate = endDate ? endOfDay(parseISO(endDate)) : new Date()
    
    const queryParams = [dateTrunc, parsedStartDate, parsedEndDate]
    if (theme) queryParams.push(theme)
  
    const results = await this.metricsRepository.query(
      `
      SELECT
        DATE_TRUNC($1, time) AS period_start,
        AVG(score) AS avg_score,
        AVG("responseTime") AS avg_response_time,
        AVG(fcp) AS avg_fcp,
        AVG(si) AS avg_si,
        AVG(lcp) AS avg_lcp,
        AVG(tbt) AS avg_tbt,
        AVG(cls) AS avg_cls
      FROM metrics
      ${theme ? 'INNER JOIN channel c ON metrics.channel_id = c.id' : ''}
      WHERE time BETWEEN $2 AND $3 ${theme ? 'AND c.theme = $4' : ''}
      GROUP BY
        DATE_TRUNC($1, time)
      ORDER BY
        period_start;
      `,
      queryParams
    );
  
    return results;
  }
}