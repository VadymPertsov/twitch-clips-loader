import Axios from '@/app/api/instance'
import { Channel, Pagination } from '@/types'

export interface ChannelsResponse extends Pagination {
  data: Channel[]
}

export const getChannels = async (
  channelId: string
): Promise<ChannelsResponse> => {
  const response = await Axios.get<ChannelsResponse>(
    `/search/channels?query=${channelId}`
  )
  return response.data
}

export const getMoreChannels = async (
  channelId: string,
  cursor: string
): Promise<ChannelsResponse> => {
  const response = await Axios.get<ChannelsResponse>(
    `/search/channels?query=${channelId}&after=${cursor}`
  )
  return response.data
}
