import 'dotenv/config';
import 'reflect-metadata';

import { connection } from './infra/db/connection';

import './infra/queue/queues/my-queue';
import './infra/queue/workers/my-worker';
import './usecases/collect-channels-performance-metrics/index';

import { setCollectChannelMetricsJobs } from './usecases/collect-channels-performance-metrics/index';
  
import './api'

connection()
  .then(() => {
    setCollectChannelMetricsJobs();
    console.log('Metrics are being collected correctly')
  })