import Axios from '@/app/api/instance'
import { Clip } from '@/types'

interface ClipResponse {
  data: Clip[]
}

export const getClipByUrl = async (clipId: string): Promise<ClipResponse> => {
  const response = await Axios.get<ClipResponse>(`/clips?id=${clipId}`)
  return response.data
}
