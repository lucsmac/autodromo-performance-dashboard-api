import { IChannel } from "@/models/entities";

export interface ChannelsRepository {
  create(params: IChannel): Promise<IChannel>
  delete(channelId: string): Promise<void>
  listAll(): Promise<IChannel[]>
  listAllReferences(): Promise<IChannel[]>
  listAllClients(): Promise<IChannel[]>
  listByTheme(theme: string): Promise<IChannel[]>
  findById(id: string): Promise<IChannel | null>
  findByLink(id: string): Promise<IChannel | null>
  update(channelId: string, data: Partial<IChannel>): Promise<void>
}
