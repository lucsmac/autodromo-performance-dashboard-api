import { IsNull } from "typeorm";
import { Channel as ChannelModel } from "../../../models/entities/channel";
import { dataSource } from "../../../infra/db/data-source";
import { IChannel } from "../../../models/entities/channel.interface";
import { ChannelsRepository } from "../channels-repository";

const channelRepository = dataSource.getRepository<ChannelModel>(ChannelModel);

export class TypeormChannelsRepository implements ChannelsRepository {
  async create(params: IChannel): Promise<void> {
    const channelData = channelRepository.create(params)
    await channelRepository.save(channelData)
  }

  async update(channel_id: string, data: Partial<IChannel>) {
    await channelRepository.update(channel_id, data)
  }

  async delete(channelId: string): Promise<void> {
    await channelRepository.delete(channelId)
  }

  async listAll(): Promise<IChannel[]> {
    return await channelRepository.find()
  }

  async listAllReferences(): Promise<IChannel[]> {
    const allReferences = await channelRepository.find({
      where: {
        is_reference: true,
      }
    })

    return allReferences
  }

  async listAllClients(): Promise<IChannel[]> {
    const allClients = await channelRepository.find({
      where: {
        is_reference: IsNull(),
      }
    })

    return allClients
  }

  async listByTheme(theme: string): Promise<IChannel[]> {
    const channelsByTheme = await channelRepository.find({
      where: {
        theme: theme,
      }
    })

    return channelsByTheme
  }
  
  async findByLink(link: string): Promise<IChannel | null> {
    const channel = await channelRepository.findOne({
      where: {
        internal_link: link
      }
    })

    return channel
  }

  async findById(id: string): Promise<IChannel | null> {
    const channel = await channelRepository.findOne({
      where: {
        id
      }
    })

    return channel
  }
}
