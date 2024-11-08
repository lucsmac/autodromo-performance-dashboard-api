import 'dotenv/config';

import './infra/queue/queues/my-queue';
import './infra/queue/workers/my-worker';
import './usecases/collect-channels-performance-metrics/index';

import './infra/db/connection';
import './data/models';

console.log('Application is running at port 3333! 🚀');