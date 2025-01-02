import 'dotenv/config';
import 'reflect-metadata';

import { connection } from './infra/db/connection';

import './infra/queue/queues/main-queue';
import './infra/queue/queues/clients-queue';
import './infra/queue/workers/default-workers';
import './services/collect-channels-performance-metrics/index';

import './api'
import { SetCollectClientsChannelMetricsJobsUseCase } from './application/usecases/set-collect-clients-channel-metrics-jobs-use-case';
import { SetCollectReferencesChannelMetricsJobsUseCase } from './application/usecases/set-collect-references-channel-metrics-jobs-use-case';
import { TypeormChannelsRepository } from './data/repositories/typeorm/typeorm-channels-repository';

const channelsRepository = new TypeormChannelsRepository()

const setCollectClientsChannelMetricsJobsUseCase = new SetCollectClientsChannelMetricsJobsUseCase(channelsRepository)
const setCollectReferencesChannelMetricsJobsUseCase = new SetCollectReferencesChannelMetricsJobsUseCase(channelsRepository)

connection()
  .then(() => {
    setCollectClientsChannelMetricsJobsUseCase.execute();
    setCollectReferencesChannelMetricsJobsUseCase.execute();
    console.log('Metrics are being collected correctly')
  })