import {
  SetCollectReferencesChannelMetricsJobsUseCase,
  SetCollectClientsChannelMetricsJobsUseCase
} from "../usecases";
import { ChannelsRepository } from "@/data/repositories";
import { IChannel } from "@/models/entities";

export class AddJobOnCreateChannel {
  constructor (private channelsRepository: ChannelsRepository) {}
  
  async execute(channel: IChannel) {
    let setJobsUseCase;

    if (channel.is_reference) {
      setJobsUseCase = new SetCollectReferencesChannelMetricsJobsUseCase(this.channelsRepository)
    } else {
      setJobsUseCase = new SetCollectClientsChannelMetricsJobsUseCase(this.channelsRepository)
    }
     
    setJobsUseCase.execute([channel])
  }
}
