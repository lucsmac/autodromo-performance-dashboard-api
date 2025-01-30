import {
  Metrics as MetricsModel,
  IChannel,
  IMetrics,
  IMetricsUnchecked
} from "@/models/entities";
import { dataSource } from "@/infra/db/data-source";
import { MetricsRepository } from "../metrics-repository";

const metricsRepository = dataSource.getRepository<MetricsModel>(MetricsModel);

export class TypeormMetricsRepository implements MetricsRepository {
  async create(params: IMetricsUnchecked): Promise<void> {
    const metricsData = metricsRepository.create(params)
    await metricsRepository.save(metricsData)
  }

  async listByChannel(channel: IChannel): Promise<IMetrics[]> {
    const channelMetrics = await metricsRepository.find({
      where: {
        channel
      }
    })

    return channelMetrics
  }

  async query(query: string, parameters: unknown[]): Promise<unknown> {
    const result = await metricsRepository.query(query, parameters)

    return result
  }
}
