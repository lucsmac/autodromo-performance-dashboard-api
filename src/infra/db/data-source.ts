import 'dotenv/config';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.TIMESCALEDB_HOST,
  port: 5432,
  username: process.env.TIMESCALEDB_USER,
  password: process.env.TIMESCALEDB_PASSWORD,
  database: process.env.TIMESCALEDB_DB,
  synchronize: false,
  logging: true,
  entities: [
    'src/data/entities/*.{js,ts}'
  ],
  migrations: [
    'src/data/migration/*.{js,ts}'
  ]
});
