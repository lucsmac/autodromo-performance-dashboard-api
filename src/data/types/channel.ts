import { Metrics } from "./metrics"

export type Channel = {
  id: number,
  name: string,
  domain: string,
  internal_link: string,
  theme: string,
  is_reference?: boolean,
  metrics?: Metrics[]
}
