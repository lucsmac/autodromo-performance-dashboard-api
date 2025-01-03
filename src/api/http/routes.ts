import { FastifyInstance } from "fastify"
import { createBoard } from "./controllers/bull-board/ui";
import { channelRoutes } from "./controllers/channel-metrics/routes";
import { channelsRoutes } from "./controllers/channels/routes";
import { metricsRoutes } from "./controllers/metrics/routes";

export async function appRoutes(server: FastifyInstance) {
  server.register(createBoard(), {
    prefix: 'bull-board',
    basePath: '/bull-board'
  });
  
  server.register(channelRoutes, {
    prefix: 'channel',
  })
  server.register(channelsRoutes, {
    prefix: 'channels',
  })
  server.register(metricsRoutes, {
    prefix: 'channels',
  })
}