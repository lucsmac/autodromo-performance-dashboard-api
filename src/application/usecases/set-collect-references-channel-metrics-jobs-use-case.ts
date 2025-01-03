import { JobsOptions } from "bullmq";
import { AddCollectChannelsPerformanceMetricsJobsToQueue } from "../services/add-collect-channels-performance-metrics-jobs-to-queue";
import { IChannel } from "../../domain/entities/channel.interface";
import { ChannelsRepository } from "../../data/repositories/channels-repository";

const referenceChannelsConfig: JobsOptions = {
  repeat: {
    pattern: '*/30 * * * *',
    utc: true
  }
}

export class SetCollectReferencesChannelMetricsJobsUseCase {
  constructor (private channelsRepository: ChannelsRepository) {}
  
  async execute() {
    const referencesChannelsList: IChannel[] = await this.channelsRepository.listAllReferences() as IChannel[]

    if (!referencesChannelsList || referencesChannelsList.length === 0) {
      console.log('No reference channels available to collect metrics.')
      
      return
    }
    
    const addCollectChannelsPerformanceMetricsJobsToQueue =
      new AddCollectChannelsPerformanceMetricsJobsToQueue()
    addCollectChannelsPerformanceMetricsJobsToQueue
      .execute(referencesChannelsList, referenceChannelsConfig)
  }
}
