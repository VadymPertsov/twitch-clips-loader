'use client'

import { filterUniqueListById } from '@/utils/helpers-functions'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getGames, getMoreGames } from '../api'
import { Game } from '@/types'

export const useGames = () => {
  const [gamesData, setGamesData] = useState<Game[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isFetching, setFetching] = useState<boolean>(false)
  const [cursor, setCursor] = useState<string>('')

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true)
      try {
        const games = await getGames()
        if (games) {
          setGamesData(games.data)
          setCursor(games.pagination.cursor)
        }
      } catch (error) {
        console.error('Error fetching games:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGames()
  }, [])

  const filteredGamesData = useMemo(
    () => filterUniqueListById(gamesData),
    [gamesData]
  )

  const handleLoadMore = useCallback(async () => {
    setFetching(true)
    try {
      const games = await getMoreGames(cursor)
      if (games) {
        setGamesData(prev => [...prev, ...games.data])
        setCursor(games.pagination.cursor)
      }
    } catch (error) {
      console.error('Error fetching games:', error)
    } finally {
      setFetching(false)
    }
  }, [cursor])

  return {
    isLoading,
    filteredGamesData,
    isFetching,
    handleLoadMore,
  }
}
