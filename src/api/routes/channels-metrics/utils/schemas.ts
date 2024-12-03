import { z } from "zod";

const metricEnum = ["score", "responseTime", "fcp", "si", "lcp", "tbt", "cls"] as const;
export type MetricsOptions = (typeof metricEnum)[number];
const MetricEnum = z.enum(metricEnum);

export const querySchema = z.object({
  metric: MetricEnum.optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const requestParamsSchema = z.object({
  channel_id: z.string(),
})
