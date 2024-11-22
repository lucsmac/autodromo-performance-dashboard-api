import { dataSource } from "../../infra/db/data-source";
import { Metrics as MetricsModel } from "../entities/Metrics";
import { Metrics } from "../types/metrics";

const metricsRepository = dataSource.getRepository(MetricsModel);

export class MetricsRepository {
  async create(params: Metrics) {
    const metricsData = metricsRepository.create(params)
    await metricsRepository.save(metricsData)
  }
}
