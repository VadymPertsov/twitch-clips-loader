import Axios from '@/app/api/instance'
import { Clip, Pagination, Timestamps } from '@/types'
import { getTimestamp } from '@/utils/helpers-functions'

interface ClipsResponse extends Pagination {
  data: Clip[]
}

export const getClipsByGame = async (
  gameId: string,
  timestamps: Timestamps = 'All'
): Promise<ClipsResponse> => {
  let url = `/clips?game_id=${gameId}`

  if (timestamps && timestamps !== 'All') {
    url += `&${getTimestamp(timestamps)}`
  }

  const response = await Axios.get<ClipsResponse>(url)
  return response.data
}

export const getMoreClipsByGame = async (
  gameId: string,
  timestamps: Timestamps = 'All',
  cursor: string
): Promise<ClipsResponse> => {
  let url = `/clips?game_id=${gameId}&after=${cursor}`

  if (timestamps && timestamps !== 'All') {
    url += `&${getTimestamp(timestamps)}`
  }

  const response = await Axios.get<ClipsResponse>(url)
  return response.data
}

export const getClipsByChannel = async (
  gameId: string,
  timestamps: Timestamps = 'All'
): Promise<ClipsResponse> => {
  let url = `/clips?broadcaster_id=${gameId}`

  if (timestamps && timestamps !== 'All') {
    url += `&${getTimestamp(timestamps)}`
  }

  const response = await Axios.get<ClipsResponse>(url)
  return response.data
}

export const getMoreClipsByChannel = async (
  gameId: string,
  timestamps: Timestamps = 'All',
  cursor: string
): Promise<ClipsResponse> => {
  let url = `/clips?broadcaster_id=${gameId}&after=${cursor}`

  if (timestamps && timestamps !== 'All') {
    url += `&${getTimestamp(timestamps)}`
  }

  const response = await Axios.get<ClipsResponse>(url)
  return response.data
}
