import { ChannelsRepository } from "../../data/repositories/channels-repository";

export class DeleteChannelUseCase {
  constructor(private channelsRepository: ChannelsRepository) {}
  
  async execute(channelId: string) {
    await this.channelsRepository.delete(channelId)
  }
}