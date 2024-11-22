import { dataSource } from "../../infra/db/data-source";
import { Metrics as MetricsModel } from "../entities/Metrics";
import { Metrics } from "../models";

const metricsRepository = dataSource.getRepository(MetricsModel);

export class MetricsRepository {
  create(params: Metrics) {
    metricsRepository.create(params)
  }
}
