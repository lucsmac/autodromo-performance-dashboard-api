import { JobsOptions } from "bullmq";
import { Channel } from "../../data/types/channel";
import { ChannelRepository } from "../../data/repositories/channel-repository";
import { addCollectChannelsPerformanceMetricsJobsToQueue } from "./collect-channels-metrics";

const referenceChannelsConfig: JobsOptions = {
  repeat: {
    pattern: '*/30 12-21 * * *',
    utc: true
  }
}

const allChannelsConfig: JobsOptions = {
  repeat: {
    pattern: '0 */3 * *',
    utc: true
  }
}

export async function setCollectChannelMetricsJobs() {
  const channelRepository = new ChannelRepository()
  const referencesChannelsList: Channel[] = await channelRepository.listAllReferences() as Channel[]
  const channelsList: Channel[] = await channelRepository.listAll() as Channel[]
  
  addCollectChannelsPerformanceMetricsJobsToQueue(referencesChannelsList, referenceChannelsConfig)
  addCollectChannelsPerformanceMetricsJobsToQueue(channelsList, allChannelsConfig)
}
