import { IChannel } from "./channel.interface";

export interface IMetrics {
  id?: string;
  time: Date;
  score: number;
  responseTime: number;
  fcp: number;
  si: number;
  lcp: number;
  tbt: number;
  cls: number;
  channel: IChannel;
}

export interface IMetricsUnchecked {
  id?: string;
  time: Date;
  score: number;
  responseTime: number;
  fcp: number;
  si: number;
  lcp: number;
  tbt: number;
  cls: number;
  channel_id: string;
}
