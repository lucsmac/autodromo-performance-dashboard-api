import 'dotenv/config';
import 'reflect-metadata';

import { connection } from './infra/db/connection';

import './infra/queue/queues/main-queue';
import './infra/queue/queues/clients-queue';
import './infra/queue/workers/default-workers';
import './services/collect-channels-performance-metrics/index';

import './api'
import { SetCollectClientsChannelMetricsJobs } from './application/usecases/set-collect-clients-channel-metrics-jobs';
import { SetCollectReferencesChannelMetricsJobs } from './application/usecases/set-collect-references-channel-metrics-jobs';
import { TypeormChannelsRepository } from './data/repositories/typeorm/typeorm-channels-repository';

const channelsRepository = new TypeormChannelsRepository()

const setCollectClientsChannelMetricsJobs = new SetCollectClientsChannelMetricsJobs(channelsRepository)
const setCollectReferencesChannelMetricsJobs = new SetCollectReferencesChannelMetricsJobs(channelsRepository)

connection()
  .then(() => {
    setCollectClientsChannelMetricsJobs.execute();
    setCollectReferencesChannelMetricsJobs.execute();
    console.log('Metrics are being collected correctly')
  })