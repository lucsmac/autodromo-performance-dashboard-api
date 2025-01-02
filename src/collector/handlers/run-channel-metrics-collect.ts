import { Job } from "bullmq"
import { CreateCollectMetricsJob } from "../services/create-collect-metrics-job";
import { TypeormMetricsRepository } from "../../data/repositories/typeorm/typeorm-metrics-repository";

export const runChannelMetricsCollect = async (job: Job) => {
  const { channelUrl, channelId } = job.data;

  try {
    const metricsRepository = new TypeormMetricsRepository()
    const createCollectMetricsJob = new CreateCollectMetricsJob(metricsRepository)
    
    await createCollectMetricsJob.execute(channelUrl, channelId)
  } catch(error) {
    console.error(`Error fetching or processing metrics for channel: ${channelUrl}`, error);
  }
}
