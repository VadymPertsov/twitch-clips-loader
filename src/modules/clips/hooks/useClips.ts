'use client'

import { Category, Clip, Timestamps } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import {
  getClipsByChannel,
  getClipsByGame,
  getMoreClipsByChannel,
  getMoreClipsByGame,
} from '../api'

export const useClips = (category: Category, id: string) => {
  const [filter, setFilter] = useState<Timestamps>('All')

  const [clipsData, setClipsData] = useState<Clip[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isFetching, setFetching] = useState<boolean>(false)
  const [cursor, setCursor] = useState<string>('')

  useEffect(() => {
    setLoading(true)
    const fetchClips = async () => {
      try {
        const clips =
          category === 'game'
            ? await getClipsByGame(id)
            : await getClipsByChannel(id)
        if (clips) {
          setClipsData(clips.data)
          setCursor(clips.pagination.cursor)
        }
      } catch (error) {
        console.error('Error fetching clips:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchClips()
  }, [])

  const handleLoadMore = useCallback(async () => {
    setFetching(true)
    try {
      const clips =
        category === 'game'
          ? await getMoreClipsByGame(id, filter, cursor)
          : await getMoreClipsByChannel(id, filter, cursor)

      if (clips) {
        setClipsData(prev => [...prev, ...clips.data])
        setCursor(clips.pagination.cursor)
      }
    } catch (error) {
      console.error('Error fetching clips:', error)
    } finally {
      setFetching(false)
    }
  }, [category, id, filter, cursor])

  const filterClipsData = useCallback(
    async (newFilter: Timestamps) => {
      setLoading(true)
      try {
        const clips =
          category === 'game'
            ? await getClipsByGame(id, newFilter)
            : await getClipsByChannel(id, newFilter)

        if (clips) {
          setClipsData(clips.data)
          setCursor(clips.pagination.cursor)
        }
        setFilter(newFilter)
      } catch (error) {
        console.error('Error fetching clips:', error)
      } finally {
        setLoading(false)
      }
    },
    [category, id]
  )

  return {
    clipsData,
    isLoading,
    isFetching,
    handleLoadMore,
    filterClipsData,
    filter,
  }
}
