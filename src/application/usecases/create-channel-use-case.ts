import { ChannelsRepository } from "../../data/repositories/channels-repository";
import { ChannelAlreadyExists } from "../../models/errors/channel-already-exists";

interface CreateChannelUseCaseRequest {
  name: string;
  domain: string;
  internal_link: string;
  theme: string;
  is_reference?: boolean;
}

export class CreateChannelUseCase {
  constructor(private channelsRepository: ChannelsRepository) {}
  
  async execute({ domain, internal_link, name, theme, is_reference }: CreateChannelUseCaseRequest) {
    const channelAlreadyExists = await this.channelsRepository.findByLink(internal_link)

    if (channelAlreadyExists) {
      throw new ChannelAlreadyExists()
    }
    
    await this.channelsRepository.create({
      domain,
      internal_link,
      name,
      theme,
      is_reference
    })
  }
}
