import 'dotenv/config';
import 'reflect-metadata';

import { connection } from './infra/db/connection';

import './infra/queue/queues/my-queue';
import './infra/queue/workers/my-worker';
import './usecases/collect-channels-performance-metrics/index';

import { addCollectChannelsPerformanceMetricsJobsToQueue } from './usecases/collect-channels-performance-metrics/index';

connection()
  .then(() => {
    console.log('Application is running at port 3333! 🚀');
    addCollectChannelsPerformanceMetricsJobsToQueue();
  })
  