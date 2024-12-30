import { JobsOptions } from "bullmq";
import { Channel } from "../../data/types/channel";
import { ChannelRepository } from "../../data/repositories/channel-repository";
import { addCollectChannelsPerformanceMetricsJobsToQueue } from "../services/add-collect-channels-performance-metrics-jobs-to-queue";
import { chunkArray } from "../../utils/chunk-array";
import { clientsQueue } from "../../infra/queue/queues/clients-queue";

export async function setCollectChannelMetricsJobs() {
  const channelRepository = new ChannelRepository()
  const clientsChannelsList: Channel[] = await channelRepository.listAllClients() as Channel[]

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
