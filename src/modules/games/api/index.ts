import Axios from '@/app/api/instance'
import { Game, Pagination } from '@/types'

interface GamesResponse extends Pagination {
  data: Game[]
}

export const getGames = async (): Promise<GamesResponse> => {
  const response = await Axios.get<GamesResponse>('/games/top')
  return response.data
}

export const getMoreGames = async (cursor: string): Promise<GamesResponse> => {
  const response = await Axios.get<GamesResponse>(`/games/top?after=${cursor}`)
  return response.data
}
