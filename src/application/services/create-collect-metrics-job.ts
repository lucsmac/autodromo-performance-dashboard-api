import { IMetricsUnchecked } from "../../data/entities/metrics.interface";
import { MetricsRepository } from "../../data/repositories/metrics-repository";
import { PerformanceResult } from "../../data/types/lighthouse-api-response";
import { adaptLighthouseResultsToMetrics } from "../../utils/lighthouse-adapter";
import { setUpQuery } from "../../utils/set-up-query";

export async function createCollectMetricsJob(channelUrl: string, channelId: string) {
  const url = setUpQuery(channelUrl)
  const response = await fetch(url)

  if (!response.ok) {
    const responseData = await response.json()
    throw new Error(`Network response was not ok, status: ${response.status} - Data: ${responseData}`);
  }
  
  const responseData = await response.json() as PerformanceResult

  if (!responseData?.lighthouseResult) {
    const logMessage = `ERROR - RESULT IS UNAVAILABLE - CHANNEL: ${channelUrl} - RESPONSE: ${JSON.stringify(responseData)}`
    console.log(logMessage)
    
    return null
  }

  const metrics = adaptLighthouseResultsToMetrics(responseData.lighthouseResult)

  const data: IMetricsUnchecked = {
    channel_id: channelId,
    time: new Date(),
    ...metrics,
  }

  const metricsRepository = new MetricsRepository()
  metricsRepository.create(data)
}
