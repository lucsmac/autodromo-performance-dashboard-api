import { JobsOptions, Queue } from "bullmq";
import { mainQueue } from "../../infra/queue/queues/main-queue";
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

interface Config {
  queue?: Queue
}

export async function addCollectChannelsPerformanceMetricsJobsToQueue(channelsList: Channel[], customJobConfig: JobsOptions = {}, config: Config = {}) {
  if (channelsList?.length === 0) {
    console.log('We have no channels to see metrics.')
    return
  }

  const queue = config.queue || mainQueue
  
  channelsList.forEach(async (channel: Channel) => {
    await queue.add(
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
