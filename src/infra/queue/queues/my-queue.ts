import { Queue } from 'bullmq'
import { RedisOptions } from 'ioredis'

const redisOptions: RedisOptions = {
  host: 'redis',
  port: 6379,
}

const myQueue = new Queue('myQueue', { connection: redisOptions })

export default myQueue
