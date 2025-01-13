import { IChannel } from "../../models/entities/channel.interface";
import { SetCollectReferencesChannelMetricsJobsUseCase } from "../usecases/set-collect-references-channel-metrics-jobs-use-case";
import { SetCollectClientsChannelMetricsJobsUseCase } from "../usecases/set-collect-clients-channel-metrics-jobs-use-case";
import { ChannelsRepository } from "../../data/repositories/channels-repository";

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
