import { useDebounce } from '@/hooks/useDebounce'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  getCategories,
  getChannels,
  getMoreCategories,
  getMoreChannels,
} from '../api'
import { Category, Channel, GameCategory } from '@/types'
import { filterUniqueListById } from '@/utils/helpers-functions'

export const useSearch = (category: Category) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [data, setData] = useState<(Channel | GameCategory)[]>([])

  const [isLoading, setLoading] = useState<boolean>(true)
  const [isFetching, setFetching] = useState<boolean>(false)
  const [cursor, setCursor] = useState<string>('')

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    if (debouncedSearchTerm) {
      try {
        const data =
          category === 'channel'
            ? await getChannels(debouncedSearchTerm)
            : await getCategories(debouncedSearchTerm)
        if (data) {
          setData(data.data)
          setCursor(data.pagination.cursor)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    fetchData()
  }, [fetchData])

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

  const filteredData = useMemo(() => filterUniqueListById(data), [data])
  // TODO: if cursor check
  const handleLoadMore = useCallback(async () => {
    setFetching(true)
    try {
      const data =
        category === 'channel'
          ? await getMoreChannels(debouncedSearchTerm, cursor)
          : await getMoreCategories(debouncedSearchTerm, cursor)
      if (data) {
        setData(prev => [...prev, ...data.data])
        setCursor(data.pagination.cursor)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
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
    filteredData,
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
