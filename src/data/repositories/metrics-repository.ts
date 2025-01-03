import { IChannel } from "../../domain/entities/channel.interface";
import { IMetrics, IMetricsUnchecked } from "../../domain/entities/metrics.interface";

export interface MetricsRepository {
  create(params: IMetricsUnchecked): Promise<void>
  listByChannel(channel: IChannel): Promise<IMetrics[]>
  query(query: string, parameters: unknown[]): Promise<unknown>
}
