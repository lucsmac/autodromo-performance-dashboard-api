export interface Metrics extends ChannelIdentifier, PerformanceMetrics {
  time: Date
}

type ChannelIdentifier = {
  channel_url: string,
  channel_theme: string
}

type PerformanceMetrics = {
  score: number,
  responseTime: number,
  fcp: number,
  si: number,
  lcp: number,
  tbt: number,
  cls: number
}
