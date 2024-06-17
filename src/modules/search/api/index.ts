import Axios from '@/app/api/instance'
import { Channel, GameCategory, Pagination } from '@/types'

export interface ChannelsResponse extends Pagination {
  data: Channel[]
}

export interface GamesCategoriesResponse extends Pagination {
  data: GameCategory[]
}

export const getChannels = async (
  channel: string
): Promise<ChannelsResponse> => {
  const response = await Axios.get<ChannelsResponse>(
    `/search/channels?query=${channel}`
  )
  return response.data
}

export const getMoreChannels = async (
  channel: string,
  cursor: string
): Promise<ChannelsResponse> => {
  const response = await Axios.get<ChannelsResponse>(
    `/search/channels?query=${channel}&after=${cursor}`
  )
  return response.data
}

export const getCategories = async (
  game: string
): Promise<GamesCategoriesResponse> => {
  const response = await Axios.get<GamesCategoriesResponse>(
    `/search/categories?query=${game}`
  )
  return response.data
}

export const getMoreCategories = async (
  game: string,
  cursor: string
): Promise<GamesCategoriesResponse> => {
  const response = await Axios.get<GamesCategoriesResponse>(
    `/search/categories?query=${game}&after=${cursor}`
  )
  return response.data
}
