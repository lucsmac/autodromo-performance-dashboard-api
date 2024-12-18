import { JobsOptions } from "bullmq";
import { Channel } from "../../data/types/channel";
import { ChannelRepository } from "../../data/repositories/channel-repository";
import { addCollectChannelsPerformanceMetricsJobsToQueue } from "./collect-channels-metrics";
import { chunkArray } from "../../utils/chunk-array";
import { clientsQueue } from "../../infra/queue/queues/clients-queue";

const referenceChannelsConfig: JobsOptions = {
  repeat: {
    pattern: '*/30 * * * *',
    utc: true
  }
}

export async function setCollectChannelMetricsJobs() {
  const channelRepository = new ChannelRepository()
  const referencesChannelsList: Channel[] = await channelRepository.listAllReferences() as Channel[]
  const clientsChannelsList: Channel[] = await channelRepository.listAllClients() as Channel[]

  addCollectChannelsPerformanceMetricsJobsToQueue(referencesChannelsList, referenceChannelsConfig)

  const chunkedChannelsArray = chunkArray(clientsChannelsList, 150)

  chunkedChannelsArray.forEach((channelsChunk, index) => {
    const customConfig: JobsOptions = {
      repeat: {
        pattern: `${index * 5} */3 * * *`,
        utc: true
      }
    }
    
    addCollectChannelsPerformanceMetricsJobsToQueue(channelsChunk, customConfig, { queue: clientsQueue })
  })
}
