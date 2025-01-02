import { endOfDay, parseISO } from "date-fns";
import { MetricsRepository } from "../../data/repositories/metrics-repository";
import { MetricsOptions } from "../../api/http/controllers/channel-metrics/utils/list-route-schemas";
import { filterByAverageMetric } from "../../api/routes/channel-average-metrics/utils/filter-by-average-metric";
import { PerformanceAverageMetricsResponse } from "../../domain/types/metrics";

type GetMetricsAverageParams = {
  period: 'hourly' | 'daily' | 'weekly'
  startDate?: string
  endDate?: string
  theme?: string
  channel_id?: string
}

interface GetChannelAverageMetricsUseCaseRequest {
  metric?: MetricsOptions
  filterPeriodOptions: GetMetricsAverageParams
}

export class GetChannelAverageMetricsUseCase {
  constructor (private metricsRepository: MetricsRepository) {}
  
  async execute({ metric, filterPeriodOptions }: GetChannelAverageMetricsUseCaseRequest) {
    const metricsAverage = await this._getMetricsByPeriod(filterPeriodOptions)
  
    const allMetricsResponseData = metricsAverage as PerformanceAverageMetricsResponse[]
    
    if (!metric) return allMetricsResponseData
      
    const filteredMetricsData = filterByAverageMetric(metric, allMetricsResponseData)

    return filteredMetricsData
  }

  async _getMetricsByPeriod({ period, startDate = '2000-01-01', endDate, theme, channel_id }: GetMetricsAverageParams) {
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
    if (channel_id) queryParams.push(channel_id)
  
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
      ${channel_id ? 'INNER JOIN channel c ON metrics.channel_id = c.id' : ''}
      WHERE time BETWEEN $2 AND $3 ${theme ? 'AND c.theme = $4' : ''} ${channel_id ? 'AND c.id = $4' : ''}
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
