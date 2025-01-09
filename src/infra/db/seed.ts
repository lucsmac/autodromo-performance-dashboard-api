import "reflect-metadata"
import { getThemesData } from '../../utils/get-themes-data'
import { connection } from './connection'
import { IChannel } from "../../models/entities/channel.interface"
import { TypeormChannelsRepository } from "../../data/repositories/typeorm/typeorm-channels-repository"

export async function seedDb() {
  try {
    const channelsSeedData: IChannel[] = await getThemesData()
    const channelRepository = new TypeormChannelsRepository();

    channelsSeedData.forEach((channelData: IChannel) => {
      channelRepository.create(channelData)
    })

    console.log(`Database was seeded with ${channelsSeedData.length} channels`)
  } catch(error) {
    console.error(`Error when seed database * Error message: ${error}`)
  }
}

connection()
  .then(() => {
    seedDb()
  })
