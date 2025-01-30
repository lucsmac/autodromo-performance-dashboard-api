import "reflect-metadata"
import { connection } from './connection'
import { IChannel } from "@/models/entities"
import { getThemesData } from '@/utils/get-themes-data'
import { TypeormChannelsRepository } from "@/data/repositories/typeorm"

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
