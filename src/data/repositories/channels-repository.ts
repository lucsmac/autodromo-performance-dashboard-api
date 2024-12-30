import { IChannel } from "../../domain/entities/channel.interface";

export interface ChannelsRepository {
  create(params: IChannel): Promise<void>
  listAll(): Promise<IChannel[]>
  listAllReferences(): Promise<IChannel[]>
  listAllClients(): Promise<IChannel[]>
  listByTheme(theme: string): Promise<IChannel[]>
  findById(id: string): Promise<IChannel | null>
}
