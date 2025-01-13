import { JobsOptions } from "bullmq";
import { AddChannelsPerformanceMetricsJobs } from "../services/add-channels-performance-metrics-jobs";
import { chunkArray } from "../../utils/chunk-array";
import { clientsQueue } from "../../infra/queue/queues/clients-queue";
import { IChannel } from "../../models/entities/channel.interface";
import { ChannelsRepository } from "../../data/repositories/channels-repository";

export class SetCollectClientsChannelMetricsJobsUseCase {
  constructor (private channelsRepository: ChannelsRepository) {}
  
  async execute() {
    const clientsChannelsList: IChannel[] = await this.channelsRepository.listAllClients() as IChannel[]
    
    if (!clientsChannelsList || clientsChannelsList.length === 0) {
      console.log('No clients channels available to collect metrics.')
      
      return
    }
  
    const chunkedChannelsArray = chunkArray(clientsChannelsList, 150)
  
    chunkedChannelsArray.forEach((channelsChunk, index) => {
      const customConfig: JobsOptions = {
        repeat: {
          pattern: `${index * 5} */3 * * *`,
          utc: true
        }
      }
      
      const addChannelsPerformanceMetricsJobs =
        new AddChannelsPerformanceMetricsJobs()

      addChannelsPerformanceMetricsJobs
        .execute(channelsChunk, customConfig, { queue: clientsQueue })
    })
  }
}
