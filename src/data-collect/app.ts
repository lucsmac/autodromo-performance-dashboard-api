import { JobsOptions } from "bullmq";
import myQueue from "./queues/my-queue";

const defaultConfig: JobsOptions = {
  delay: 2000,
  removeOnComplete: {
    age: 3600,
    count: 1000,
  },
  removeOnFail: {
    age: 24 * 3600
  }
}

async function addJobs() {
  // await myQueue.add('job1', { message: 'Este é o primeiro job!' }, {
  //   ...defaultConfig,
  //   repeat: {
  //     every: 5 * 1000, 
  //     limit: 5
  //   }
  // })
  // await myQueue.add('job2', { message: 'Este é o segundo job!' }, { ...defaultConfig, delay: 4000 })
  
  // const name = 'jobName';
  // const jobs = await myQueue.addBulk([
  //   { name, data: { paint: 'car' } },
  //   { name, data: { paint: 'house' } },
  //   { name, data: { paint: 'boat' } },
  // ]);

  await myQueue.add('getPerformance', { message: 'Este é o segundo job!' }, defaultConfig )
}

addJobs().then(() => {
  console.log('Jobs adicionados à fila')
})
