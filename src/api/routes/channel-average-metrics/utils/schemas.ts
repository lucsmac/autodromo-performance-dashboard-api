import { z } from "zod";

export const requestParamsSchema = z.object({
  period: z.enum(["daily", "hourly", "weekly"]),
})