'use client'

import { filterUniqueListById } from '@/utils/helpers-functions'
import { useCallback, useMemo, useState } from 'react'
import { getGames, getMoreGames } from '../api'
import { Game } from '@/types'
import { useMutation, useQuery } from 'react-query'

export const useGames = () => {
  const [gamesData, setGamesData] = useState<Game[]>([])
  const [cursor, setCursor] = useState<string>('')

  const { isLoading } = useQuery('games', getGames, {
    onSuccess: res => {
      setGamesData(res.data)
      setCursor(res.pagination.cursor)
    },
  })

  const { mutate: fetchMoreGames, isLoading: isFetching } = useMutation(
    () => getMoreGames(cursor),
    {
      onSuccess: res => {
        setGamesData(prev => [...prev, ...res.data])
        setCursor(res.pagination.cursor)
      },
    }
  )

  const filteredGamesData = useMemo(
    () => filterUniqueListById(gamesData),
    [gamesData]
  )

  const handleLoadMore = useCallback(async () => {
    try {
      await fetchMoreGames()
    } catch (error) {
      console.error('Error in handleLoadMore:', error)
    }
  }, [fetchMoreGames])

  return {
    isLoading,
    filteredGamesData,
    isFetching,
    handleLoadMore,
  }
}
