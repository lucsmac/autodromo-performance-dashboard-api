import { Channel, ChannelModel } from '../../data/models'
import './connection'

const getThemesData = async (): Promise<Channel[]> => {
  const themesResponse = await fetch('https://lucsmac.github.io/autodromo-domains/full_data.json')
  const themesList: string = await themesResponse.json() as string
  
  return JSON.parse(themesList) as Channel[]
}

export async function seedDb() {
  const seedData: Channel[] = await getThemesData()

  try {
    await ChannelModel.deleteMany({});
    await ChannelModel.insertMany(seedData);

    console.log(`Database was seeded with ${seedData.length} channels`)
  } catch(error) {
    console.error(`Error when seed database * Error message: ${error}`)
  }
}

seedDb()
