import { Queue } from 'bullmq'
import { RedisOptions } from 'ioredis'

const redisOptions: RedisOptions = {
  host: 'redis',
  port: 6379,
}

const defaultQueue = new Queue('defaultQueue', { connection: redisOptions })

export default defaultQueue
