import { JobsOptions } from "bullmq";
import defaultQueue from "../../infra/queue/queues/default-queue";
import { Channel } from "../../data/types/channel";

const defaultConfig: JobsOptions = {
  removeOnComplete: {
    age: 3600,
    count: 1000,
  },
  removeOnFail: {
    age: 24 * 3600
  }
}

export async function addCollectChannelsPerformanceMetricsJobsToQueue(channelsList: Channel[], customJobConfig: JobsOptions = {}) {
  if (channelsList?.length === 0) {
    console.log('We have no channels to see metrics.')
    return
  }

  channelsList.forEach(async (channel: Channel) => {
    await defaultQueue.add(
      'collectChannelPerformanceMetric',
      {
        channelUrl: channel.internal_link,
        channelId: channel.id
      },
      {
        ...defaultConfig,
        ...customJobConfig,
        jobId: `collect-metrics-${channel.id}`
      }
    )
  })
  
  console.log(`Collect metrics from ${channelsList?.length} channels with these custom config: ${JSON.stringify(customJobConfig)}.`)
}
