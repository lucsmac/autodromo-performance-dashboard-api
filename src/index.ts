import 'dotenv/config';
import 'reflect-metadata';

import { connection } from './infra/db/connection';

import './infra/queue/queues/main-queue';
import './infra/queue/queues/clients-queue';
import './infra/queue/workers/default-workers';

import './api'
import { setCollectMetricsJobs } from './collector/handlers/set-collect-metrics-jobs';

connection()
  .then(() => {
    setCollectMetricsJobs()
    console.log('Metrics are being collected correctly')
  })