import { Channel } from "../data/types/channel"

export const getThemesData = async (): Promise<Channel[]> => {
  const themesResponse = await fetch('https://lucsmac.github.io/autodromo-domains/full_data.json')
  const themesList: string = await themesResponse.json() as string
  
  return JSON.parse(themesList)
}