import { Worker } from 'bullmq'
import { RedisOptions } from 'ioredis'
import { getChannelMetrics } from '../../../usecases/collect-channels-performance-metrics/jobs/get-channel-metrics'

const redisOptions: RedisOptions = {
  host: 'redis',
  port: 6379
}

const worker = new Worker(
  'myQueue',
  getChannelMetrics,
  {
    connection: redisOptions,
    limiter: {
      max: 30,
      duration: 60 * 1000, // 60 segundos
    }
  }
)

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} falhou com o erro: `, err)
})

worker.on('error', err => {
  console.error(err);
});

export default worker
