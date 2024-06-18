import Axios from '@/app/api/instance'
import { Clip } from '@/types'
import { buildClipsByIdsPath } from '@/utils/helpers-functions'

interface ClipByIdResponce {
  data: Clip[]
}

export const getClipsByIds = async (
  clipIds: string[]
): Promise<ClipByIdResponce | null> => {
  if (!clipIds.length) return null

  const queryString = buildClipsByIdsPath(clipIds)
  const response = await Axios.get<ClipByIdResponce>(`/clips?${queryString}`)
  return response.data
}
