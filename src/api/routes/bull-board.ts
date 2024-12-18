import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { FastifyAdapter } from "@bull-board/fastify";
import { mainQueue } from "../../infra/queue/queues/main-queue";
import { clientsQueue } from "../../infra/queue/queues/clients-queue";

const serverAdapter = new FastifyAdapter();

createBullBoard({
  queues: [mainQueue, clientsQueue].map((q) => new BullMQAdapter(q)),
  serverAdapter,
});

serverAdapter.setBasePath('/bull-board')

export const createBoard = () => serverAdapter.registerPlugin()
