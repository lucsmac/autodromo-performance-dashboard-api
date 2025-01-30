import { IChannel, IMetrics, IMetricsUnchecked } from "@/models/entities";

export interface MetricsRepository {
  create(params: IMetricsUnchecked): Promise<void>
  listByChannel(channel: IChannel): Promise<IMetrics[]>
  query(query: string, parameters: unknown[]): Promise<unknown>
}
