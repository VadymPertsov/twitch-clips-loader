import Axios from '@/app/api/instance'
import { Clip } from '@/types'
import { buildClipsByIdsPath } from '@/utils/helpers-functions'

interface ClipResponse {
  data: Clip[]
}

interface ClipByIdResponce {
  data: Clip[]
}

export const getClipByUrl = async (clipId: string): Promise<ClipResponse> => {
  const response = await Axios.get<ClipResponse>(`/clips?id=${clipId}`)
  return response.data
}

export const getClipsByIds = async (
  clipIds: string[]
): Promise<ClipByIdResponce | null> => {
  if (!clipIds.length) return null

  const queryString = buildClipsByIdsPath(clipIds)
  const response = await Axios.get<ClipByIdResponce>(`/clips?${queryString}`)
  return response.data
}
