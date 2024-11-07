import { Worker } from 'bullmq'
import { RedisOptions } from 'ioredis'
import { getChannelMetrics } from '../jobs/get-channel-metrics'

const redisOptions: RedisOptions = {
  host: 'localhost',
  port: 6379
}

const worker = new Worker(
  'myQueue',
  getChannelMetrics,
  { connection: redisOptions }
)

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} falhou com o erro: `, err)
})

worker.on('error', err => {
  console.error(err);
});

export default worker
