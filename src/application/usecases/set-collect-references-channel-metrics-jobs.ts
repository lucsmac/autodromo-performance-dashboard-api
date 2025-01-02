import { JobsOptions } from "bullmq";
import { AddCollectChannelsPerformanceMetricsJobsToQueue } from "../services/add-collect-channels-performance-metrics-jobs-to-queue";
import { IChannel } from "../../domain/entities/channel.interface";
import { TypeormChannelsRepository } from "../../data/repositories/typeorm/typeorm-channels-repository";

const referenceChannelsConfig: JobsOptions = {
  repeat: {
    pattern: '*/30 * * * *',
    utc: true
  }
}

export async function setCollectChannelMetricsJobs() {
  const channelRepository = new TypeormChannelsRepository()
  const referencesChannelsList: IChannel[] = await channelRepository.listAllReferences() as IChannel[]

  const addCollectChannelsPerformanceMetricsJobsToQueue =
    new AddCollectChannelsPerformanceMetricsJobsToQueue()
  addCollectChannelsPerformanceMetricsJobsToQueue
    .execute(referencesChannelsList, referenceChannelsConfig)
}
