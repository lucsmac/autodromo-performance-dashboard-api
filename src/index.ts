import 'dotenv/config';
import 'reflect-metadata';

import { connection } from './infra/db/connection';

import './infra/queue/queues/main-queue';
import './infra/queue/queues/clients-queue';
import './infra/queue/workers/default-workers';
import './services/collect-channels-performance-metrics/index';

import { setCollectChannelMetricsJobs } from './services/collect-channels-performance-metrics/index';
  
import './api'

connection()
  .then(() => {
    setCollectChannelMetricsJobs();
    console.log('Metrics are being collected correctly')
  })