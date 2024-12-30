import { Job } from "bullmq"
import { createCollectMetricsJob } from "../services/create-collect-metrics-job";

export const runChannelMetricsCollect = async (job: Job) => {
  const { channelUrl, channelId } = job.data;

  try {
    await createCollectMetricsJob(channelUrl, channelId)
  } catch(error) {
    console.error(`Error fetching or processing metrics for channel: ${channelUrl}`, error);
  }
}
