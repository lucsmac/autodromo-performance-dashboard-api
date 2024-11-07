import { JobsOptions } from "bullmq";
import myQueue from "./queues/my-queue";

const defaultConfig: JobsOptions = {
  removeOnComplete: {
    age: 3600,
    count: 1000,
  },
  removeOnFail: {
    age: 24 * 3600
  }
}

async function addJobs() {
  await myQueue.add('getPerformance', { channelUrl: 'https://testes.autodromo.app/turbo-dealer', channelTheme: 'showroom' }, defaultConfig )
}

addJobs().then(() => {
  console.log('Jobs added to queue')
})
