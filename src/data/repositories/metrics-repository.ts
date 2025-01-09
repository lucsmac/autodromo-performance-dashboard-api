import { IChannel } from "../../models/entities/channel.interface";
import { IMetrics, IMetricsUnchecked } from "../../models/entities/metrics.interface";

export interface MetricsRepository {
  create(params: IMetricsUnchecked): Promise<void>
  listByChannel(channel: IChannel): Promise<IMetrics[]>
  query(query: string, parameters: unknown[]): Promise<unknown>
}
