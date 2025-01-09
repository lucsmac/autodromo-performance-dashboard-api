import { IChannel } from "../../models/entities/channel.interface";

export interface ChannelsRepository {
  create(params: IChannel): Promise<void>
  delete(channelId: string): Promise<void>
  listAll(): Promise<IChannel[]>
  listAllReferences(): Promise<IChannel[]>
  listAllClients(): Promise<IChannel[]>
  listByTheme(theme: string): Promise<IChannel[]>
  findById(id: string): Promise<IChannel | null>
  findByLink(id: string): Promise<IChannel | null>
  update(channelId: string, data: Partial<IChannel>): Promise<void>
}
