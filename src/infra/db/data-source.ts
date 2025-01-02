import 'dotenv/config';
import { DataSource } from 'typeorm';
import { env } from '../../config/env';

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
    'src/domain/entities/*.{js,ts}'
  ],
  migrations: [
    'src/infra/db/migration/*.{js,ts}'
  ]
});
