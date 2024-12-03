import { endOfDay, parseISO } from "date-fns";
import { MetricsRepository } from "../../../../data/repositories/metrics-repository";

type GetMetricsAverageParams = {
  period: 'hourly' | 'daily' | 'weekly'
  startDate?: string
  endDate?: string
}

export const getMetricsByPeriod = async ({ period, startDate = '2000-01-01', endDate }: GetMetricsAverageParams) => {
  const dateTrunc = {
    hourly: 'hour',
    daily: 'day',
    weekly: 'week',
  }[period];

  if (!dateTrunc) {
    return null
  }

  const parsedStartDate = parseISO(startDate)
  const parsedEndDate = endDate ? endOfDay(parseISO(endDate)) : new Date()
  
  const metricsRepository = new MetricsRepository()

  const results = await metricsRepository.query(
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
    WHERE time BETWEEN $2 AND $3
    GROUP BY
      DATE_TRUNC($1, time)
    ORDER BY
      period_start;
    `,
    [dateTrunc, parsedStartDate, parsedEndDate]
  );

  return results;
}
