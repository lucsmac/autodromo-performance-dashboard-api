import 'dotenv/config';

import './data-collect/queues/my-queue';
import './data-collect/workers/my-worker';
import './data-collect/app';

console.log('Aplicação iniciada com BullMQ e Redis');