import { dataSource } from "../../infra/db/data-source";
import { Channel } from "../entities/channel";
import { Metrics as MetricsModel } from "../entities/metrics";
import { Metrics } from "../types/metrics";

const metricsRepository = dataSource.getRepository(MetricsModel);

export class MetricsRepository {
  async create(params: Metrics) {
    const metricsData = metricsRepository.create(params)
    await metricsRepository.save(metricsData)
  }

  async listByChannel(channel: Channel) {
    const channelMetrics = await metricsRepository.find({
      where: {
        channel
      }
    })

    return channelMetrics
  }

  async query(query: string, parameters: unknown[]) {
    const result = await metricsRepository.query(query, parameters)

    return result
  }
}
