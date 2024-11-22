import { JobsOptions } from "bullmq";
import myQueue from "../../infra/queue/queues/my-queue";
import { Channel } from "../../data/types/channel";
import { ChannelRepository } from "../../data/repositories/channel-repository";

const defaultConfig: JobsOptions = {
  removeOnComplete: {
    age: 3600,
    count: 1000,
  },
  removeOnFail: {
    age: 24 * 3600
  }
}

export async function addCollectChannelsPerformanceMetricsJobsToQueue() {
  const channelRepository = new ChannelRepository()
  const channelsList: Channel[] = await channelRepository.listAll() as Channel[]

  if (channelsList?.length === 0) {
    console.log('We have no channels to see metrics.')
    return
  }

  channelsList.splice(0, 2).forEach(async (channel: Channel) => {
    await myQueue.add(
      'collectChannelPerformanceMetric',
      {
        channelUrl: channel.internal_link,
        channelTheme: channel.theme
      },
      defaultConfig
    )
  })
  
  console.log(`Collect metrics from ${channelsList?.length} channels.`)
}
