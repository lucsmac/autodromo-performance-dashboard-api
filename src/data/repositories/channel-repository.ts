import { Not } from "typeorm";
import { dataSource } from "../../infra/db/data-source";
import { Channel as ChannelModel } from "../entities/Channel";
import { Channel } from "../types/channel";

const channelRepository = dataSource.getRepository(ChannelModel);

export class ChannelRepository {
  async create(params: Channel): Promise<void> {
    const channelData = channelRepository.create(params)
    await channelRepository.save(channelData)
  }

  async listAll(): Promise<ChannelModel[]> {
    return await channelRepository.find()
  }

  async listAllReferences(): Promise<ChannelModel[]> {
    const allReferences = await channelRepository.find({
      where: {
        is_reference: true,
      }
    })

    return allReferences
  }

  async listAllClients(): Promise<ChannelModel[]> {
    const allReferences = await channelRepository.find({
      where: {
        is_reference: Not(true),
      }
    })

    return allReferences
  }
}
