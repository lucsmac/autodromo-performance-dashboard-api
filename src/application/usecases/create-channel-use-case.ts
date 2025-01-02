import { ChannelsRepository } from "../../data/repositories/channels-repository";

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
    await this.channelsRepository.create({
      domain,
      internal_link,
      name,
      theme,
      is_reference
    })
  }
}
