import "reflect-metadata"
import { Channel } from '../../data/types/channel'
import { getThemesData } from '../../utils/get-themes-data'
import { ChannelRepository } from "../../data/repositories/ChannelRepository"
import { connection } from './connection'

export async function seedDb() {
  try {
    const channelsSeedData: Channel[] = await getThemesData()
    const channelRepository = new ChannelRepository();

    channelsSeedData.forEach((channelData: Channel) => {
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
