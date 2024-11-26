import { setUpQuery } from "../../../utils/set-up-query"
import { PerformanceResult } from "../../../data/types/lighthouse-api-response"
import { Job } from "bullmq"
import { Metrics } from "../../../data/types/metrics";
import { MetricsRepository } from "../../../data/repositories/metrics-repository";
import { adaptLighthouseResultsToMetrics } from "../adapters/lighthouse-adapter";

export const getChannelMetrics = async (job: Job) => {
  const { channelUrl, channelTheme } = job.data;

  try {
    const url = setUpQuery(channelUrl)
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }
    
    const responseData = await response.json() as PerformanceResult

    if (!responseData?.lighthouseResult) {
      const logMessage = `ERROR - RESULT IS UNAVAILABLE - CHANNEL: ${channelUrl} - THEME: ${channelTheme} - RESPONSE: ${JSON.stringify(responseData)}`
      console.log(logMessage)
      
      return null
    }

    const metrics = adaptLighthouseResultsToMetrics(responseData.lighthouseResult)

      const data: Metrics = {
        channel_url: channelUrl,
        channel_theme: channelTheme,
        time: new Date(),
        ...metrics,
      }

      const metricsRepository = new MetricsRepository()
      metricsRepository.create(data)
  } catch(error) {
    console.error(`Error fetching or processing metrics for channel: ${channelUrl}, theme: ${channelTheme}`, error);
  }
}
