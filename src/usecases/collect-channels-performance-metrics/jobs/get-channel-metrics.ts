import { setUpQuery } from "../../../utils/set-up-query"
import { PerformanceResult } from "../../../data/types/lighthouse-api-response"
import { Job } from "bullmq"
import { Metrics } from "../../../data/types/metrics";
import { MetricsRepository } from "../../../data/repositories/metrics-repository";
import { adaptLighthouseResultsToMetrics } from "../adapters/lighthouse-adapter";

export const getChannelMetrics = async (job: Job) => {
  const { channelUrl, channelTheme } = job.data;
  
  const url = setUpQuery(channelUrl)
  fetch(url)
    .then(response => response.json() as Promise<PerformanceResult>)
    .then((json: PerformanceResult) => {
      if (!json?.lighthouseResult) {
        const logMessage = `ERROR - RESULT IS UNAVAILABLE - CHANNEL: ${channelUrl} - THEME: ${channelTheme} - RESPONSE: ${JSON.stringify(json)}`
        console.log(logMessage)
        
        return null
      }

      const metrics = adaptLighthouseResultsToMetrics(json.lighthouseResult)

      const data: Metrics = {
        channel_url: channelUrl,
        channel_theme: channelTheme,
        time: new Date(),
        ...metrics,
      }

      const metricsRepository = new MetricsRepository()
      metricsRepository.create(data)
    })
}
