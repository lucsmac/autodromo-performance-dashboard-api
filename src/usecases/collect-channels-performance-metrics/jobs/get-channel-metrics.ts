import { setUpQuery } from "../../../utils/set-up-query"
import { PerformanceResult } from "../../../data/types/lighthouse-api-response"
import { Job } from "bullmq"
import { Metrics } from "../../../data/types/metrics";

export const getChannelMetrics = async (job: Job) => {
  const { channelUrl, channelTheme } = job.data;
  
  const url = setUpQuery(channelUrl)
  fetch(url)
    .then(response => response.json() as Promise<PerformanceResult>)
    .then((json: PerformanceResult) => {
      if (!json?.lighthouseResult) {
        console.log(`ERROR - RESULT IS UNAVAILABLE - RESPONSE: ${JSON.stringify(json)}`)
        return null
      }
      
      const performanceScore = json.lighthouseResult.categories.performance.score
      const resultAudits = json.lighthouseResult.audits
      const responseTime = resultAudits['server-response-time'].numericValue;
      const fcp = resultAudits['first-contentful-paint'].numericValue
      const si = resultAudits['speed-index'].numericValue;
      const lcp = resultAudits['largest-contentful-paint'].numericValue;
      const tbt = resultAudits['total-blocking-time'].numericValue;
      const cls = resultAudits['cumulative-layout-shift'].numericValue;

      const metrics = {
        score: performanceScore * 100,
        responseTime: responseTime,
        fcp,
        si,
        lcp,
        tbt,
        cls
      }

      const data: Metrics = {
        channel_url: channelUrl,
        channel_theme: channelTheme,
        time: new Date(),
        ...metrics,
      }

      console.log('data: ', data)
    })
}
