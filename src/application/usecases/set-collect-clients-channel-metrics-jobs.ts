import { JobsOptions } from "bullmq";
import { addCollectChannelsPerformanceMetricsJobsToQueue } from "../services/add-collect-channels-performance-metrics-jobs-to-queue";
import { chunkArray } from "../../utils/chunk-array";
import { clientsQueue } from "../../infra/queue/queues/clients-queue";
import { IChannel } from "../../domain/entities/channel.interface";
import { TypeormChannelsRepository } from "../../data/repositories/typeorm/typeorm-channels-repository";

export async function setCollectChannelMetricsJobs() {
  const channelRepository = new TypeormChannelsRepository()
  const clientsChannelsList: IChannel[] = await channelRepository.listAllClients() as IChannel[]

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
