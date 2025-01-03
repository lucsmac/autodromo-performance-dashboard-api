import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().default(3000),
  GOOGLE_API_KEY: z.string(),
  TIMESCALEDB_HOST: z.string().default('localhost'),
  TIMESCALEDB_PORT: z.coerce.number().default(5432),
  TIMESCALEDB_USER: z.string().default('postgres'),
  TIMESCALEDB_PASSWORD: z.string().default('postgres'),
  TIMESCALEDB_DB: z.string().default('metrics_db'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
