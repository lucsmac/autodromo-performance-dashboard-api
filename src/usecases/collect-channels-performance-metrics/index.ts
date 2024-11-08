import { JobsOptions } from "bullmq";
import myQueue from "../../infra/queue/queues/my-queue";
import { Channel, ChannelModel } from "../../data/models";

const defaultConfig: JobsOptions = {
  removeOnComplete: {
    age: 3600,
    count: 1000,
  },
  removeOnFail: {
    age: 24 * 3600
  }
}

const getChannelsList = async () => {
  const channels = await ChannelModel.find({ theme: 'showroom_performance' });
  return channels;
}

async function addJobs() {
  const channelsList = await getChannelsList();
  
  if (channelsList?.length === 0) return

  channelsList.forEach(async (channel: Channel) => {
    await myQueue.add(
      'collectChannelPerformanceMetric',
      {
        channelUrl: channel.internal_link,
        channelTheme: channel.theme
      },
      defaultConfig
    )
  })

  return channelsList?.length
}

addJobs().then((channelsCount) => {
  console.log(`Collect metrics from ${channelsCount} channels.`)
})
