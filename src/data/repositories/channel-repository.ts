import { dataSource } from "../../infra/db/data-source";
import { Channel as ChannelModel } from "../entities/Channel";
import { Channel } from "../types/channel";

const channelRepository = dataSource.getRepository(ChannelModel);

export class ChannelRepository {
  async create(params: Channel) {
    const channelData = channelRepository.create(params)
    await channelRepository.save(channelData)
  }

  async listAll() {
    return await channelRepository.find()
  }
}
