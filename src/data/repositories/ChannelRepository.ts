import { dataSource } from "../../infra/db/data-source";
import { Channel as ChannelModel } from "../entities/Channel";
import { Channel } from "../models";

const channelRepository = dataSource.getRepository(ChannelModel);

export class ChannelRepository {
  async create(params: Channel) {
    const channel = channelRepository.create(params)
    await channelRepository.save(channel)
  }

  async listAll() {
    return await channelRepository.find()
  }
}
