import { IChannel } from "@/models/entities/channel.interface"

export async function getThemesData(): Promise<IChannel[]> {
  const themesResponse = await fetch('https://lucsmac.github.io/autodromo-domains/full_data.json')
  const themesList: string = await themesResponse.json() as string
  
  return JSON.parse(themesList)
}