import { JobsOptions } from "bullmq";
import myQueue from "../../infra/queue/queues/my-queue";
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
    await myQueue.add(
      'collectChannelPerformanceMetric',
      {
        channelUrl: channel.internal_link,
        channelTheme: channel.theme
      },
      {
        ...defaultConfig,
        ...customJobConfig,
        jobId: `collect-metrics-${channel.internal_link}`
      }
    )
  })
  
  console.log(`Collect metrics from ${channelsList?.length} channels with these custom config: ${JSON.stringify(customJobConfig)}.`)
}
