import { useDebounce } from '@/hooks/useDebounce'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getChannels, getMoreChannels } from '../api'
import { Channel } from '@/types'
import { filterUniqueListById } from '@/utils/helpers-functions'

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [channelsData, setChannelsData] = useState<Channel[]>([])

  const [isLoading, setLoading] = useState<boolean>(true)
  const [isFetching, setFetching] = useState<boolean>(false)
  const [cursor, setCursor] = useState<string>('')

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const fetchChannels = useCallback(async () => {
    setLoading(true)
    if (debouncedSearchTerm) {
      try {
        const channels = await getChannels(debouncedSearchTerm)
        if (channels) {
          setChannelsData(channels.data)
          setCursor(channels.pagination.cursor)
        }
      } catch (error) {
        console.error('Error fetching channels:', error)
      } finally {
        setLoading(false)
      }
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    fetchChannels()
  }, [fetchChannels])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        dropdownRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [inputRef, dropdownRef])

  const filteredChannelsData = useMemo(
    () => filterUniqueListById(channelsData),
    [channelsData]
  )

  const handleLoadMore = useCallback(async () => {
    setFetching(true)
    try {
      const channels = await getMoreChannels(debouncedSearchTerm, cursor)
      if (channels) {
        setChannelsData(prev => [...prev, ...channels.data])
        setCursor(channels.pagination.cursor)
      }
    } catch (error) {
      console.error('Error fetching channels:', error)
    } finally {
      setFetching(false)
    }
  }, [debouncedSearchTerm, cursor])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    },
    []
  )

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  return {
    filteredChannelsData,
    inputRef,
    dropdownRef,
    searchTerm,
    handleInputChange,
    handleFocus,
    handleLoadMore,
    isFocused,
    isLoading,
    isFetching,
  }
}
