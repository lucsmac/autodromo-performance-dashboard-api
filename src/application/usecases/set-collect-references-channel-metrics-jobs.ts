import { JobsOptions } from "bullmq";
import { Channel } from "../../data/types/channel";
import { ChannelRepository } from "../../data/repositories/channel-repository";
import { addCollectChannelsPerformanceMetricsJobsToQueue } from "../services/add-collect-channels-performance-metrics-jobs-to-queue";

const referenceChannelsConfig: JobsOptions = {
  repeat: {
    pattern: '*/30 * * * *',
    utc: true
  }
}

export async function setCollectChannelMetricsJobs() {
  const channelRepository = new ChannelRepository()
  const referencesChannelsList: Channel[] = await channelRepository.listAllReferences() as Channel[]

  addCollectChannelsPerformanceMetricsJobsToQueue(referencesChannelsList, referenceChannelsConfig)
}
