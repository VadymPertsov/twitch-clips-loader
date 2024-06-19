'use client'

import { Category, Clip, Timestamps } from '@/types'
import { useCallback, useMemo, useState } from 'react'
import {
  getClipsByChannel,
  getClipsByGame,
  getMoreClipsByChannel,
  getMoreClipsByGame,
} from '../api'
import { filterUniqueListById } from '@/utils/helpers-functions'
import { useMutation, useQuery } from 'react-query'

export const useClips = (category: Category, id: string) => {
  const [filter, setFilter] = useState<Timestamps>('All')
  const [clipsData, setClipsData] = useState<Clip[]>([])
  const [cursor, setCursor] = useState<string>('')

  const { isLoading } = useQuery(
    ['clips', category, id],
    () => (category === 'game' ? getClipsByGame(id) : getClipsByChannel(id)),
    {
      onSuccess: res => {
        setClipsData(res.data)
        setCursor(res.pagination.cursor)
      },
    }
  )

  const { mutate: fetchMoreClips, isLoading: isFetching } = useMutation(
    () =>
      category === 'game'
        ? getMoreClipsByGame(id, filter, cursor)
        : getMoreClipsByChannel(id, filter, cursor),
    {
      onSuccess: res => {
        setClipsData(prev => [...prev, ...res.data])
        setCursor(res.pagination.cursor)
      },
    }
  )

  const { mutate: fetchClipsWithFilter, isLoading: isLoadingFilter } =
    useMutation(
      (newFilter: Timestamps) => {
        setFilter(newFilter)
        return category === 'game'
          ? getClipsByGame(id, newFilter)
          : getClipsByChannel(id, newFilter)
      },
      {
        onSuccess: res => {
          setClipsData(res.data)
          setCursor(res.pagination.cursor)
        },
      }
    )

  const filteredClipsData = useMemo(
    () => filterUniqueListById(clipsData),
    [clipsData]
  )

  const handleLoadMore = useCallback(async () => {
    try {
      await fetchMoreClips()
    } catch (error) {
      console.error('Error in handleLoadMore:', error)
    }
  }, [fetchMoreClips])

  const handleFilter = useCallback(
    async (newFilter: Timestamps) => {
      try {
        await fetchClipsWithFilter(newFilter)
      } catch (error) {
        console.error('Error in handleFilter:', error)
      }
    },
    [fetchClipsWithFilter]
  )

  const isOwnLoading = isLoading || isLoadingFilter

  return {
    filteredClipsData,
    isOwnLoading,
    isFetching,
    handleLoadMore,
    handleFilter,
    filter,
  }
}
