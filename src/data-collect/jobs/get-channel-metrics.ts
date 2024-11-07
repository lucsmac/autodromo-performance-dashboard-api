import { setUpQuery } from "../utils/set-up-query"
import { PerformanceResult } from "../types/lighthouse-api-response"

export const getChannelMetrics = async () => {
  const url = setUpQuery('https://developers.google.com')
  fetch(url)
    .then(response => response.json() as Promise<PerformanceResult>)
    .then((json: PerformanceResult) => {
      const responseTime = json.lighthouseResult.audits['server-response-time'];
      const performanceScore = json.lighthouseResult.categories.performance.score

      const metrics = {
        score: performanceScore * 100,
        responseTime: responseTime.numericValue,
      }

      console.log('metrics: ', metrics)
    })
}
