import { filterByDate } from "../../utils/filter-by-date";
import { filterByMetric } from "../../utils/filter-by-metric";
import { ChannelsRepository } from "../../data/repositories/channels-repository";
import { MetricsRepository } from "../../data/repositories/metrics-repository";
import { PerformanceMetricsResponse } from "../../domain/types/metrics";
import { ResourceNotFound } from "../../domain/errors/resource-not-found";
import { MetricsOptions } from "../../api/http/controllers/channel-metrics/utils/metrics-schemas";

interface ChannelMetricsFilterOptions {
  metric?: MetricsOptions
  startDate?: string
  endDate?: string
}

interface GetChannelMetricsUseCaseRequest {
  channel_id: string
  filterOptions: ChannelMetricsFilterOptions
}

interface GetChannelMetricsUseCaseResponse {
  channel_url: string
  theme: string
  metrics: unknown
}

export class GetChannelMetricsUseCase {
  constructor (
    private channelsRepository: ChannelsRepository,
    private metricsRepository: MetricsRepository
  ) {}
  
  async execute({ channel_id, filterOptions }: GetChannelMetricsUseCaseRequest): Promise<GetChannelMetricsUseCaseResponse> {
    const channel = await this.channelsRepository.findById(channel_id)

    if (!channel) {
      throw new ResourceNotFound()
    }

    const channelMetrics = await this.metricsRepository.listByChannel(channel)

    const { metric, startDate, endDate } = filterOptions;

    let channelMetricsData: PerformanceMetricsResponse[] = channelMetrics;

    if (startDate || endDate) {
      channelMetricsData = filterByDate({ startDate, endDate }, channelMetricsData)
    }

    if (metric) {
      channelMetricsData = filterByMetric(metric, channelMetricsData)
    }

    return {
      channel_url: channel.internal_link,
      theme: channel.theme,
      metrics: channelMetricsData
    }
  }
}
