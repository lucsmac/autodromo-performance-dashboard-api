import 'dotenv/config';
import { DataSource } from 'typeorm';
import { env } from '../../config/env';

const rootFolder = env.NODE_ENV === 'development' ? 'src' : 'dist'

export const dataSource = new DataSource({
  type: 'postgres',
  host: env.TIMESCALEDB_HOST,
  port: 5432,
  username: env.TIMESCALEDB_USER,
  password: env.TIMESCALEDB_PASSWORD,
  database: env.TIMESCALEDB_DB,
  synchronize: false,
  logging: true,
  entities: [
    `${rootFolder}/domain/entities/*.{js,ts}`
  ],
  migrations: [
    `${rootFolder}/infra/db/migration/*.{js,ts}`
  ]
});
