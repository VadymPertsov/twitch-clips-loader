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
import { useMutation, useQuery } from 'react-query'

interface ApiResponse {
  data: Array<Channel | GameCategory>
  pagination: {
    cursor: string
  }
}

export const useSearch = (category: Category) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [data, setData] = useState<(Channel | GameCategory)[]>([])
  const [cursor, setCursor] = useState<string>('')

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { isLoading } = useQuery<ApiResponse | null>(
    ['search', category, debouncedSearchTerm],
    async () => {
      if (debouncedSearchTerm) {
        return category === 'game'
          ? getCategories(debouncedSearchTerm)
          : getChannels(debouncedSearchTerm)
      }
      return null
    },
    {
      enabled: !!debouncedSearchTerm,
      onSuccess: res => {
        if (res) {
          setData(res.data)
          setCursor(res.pagination.cursor)
        }
      },
    }
  )

  const { mutate: fetchMoreChannels, isLoading: isFetching } =
    useMutation<ApiResponse>(
      () =>
        category === 'game'
          ? getMoreCategories(debouncedSearchTerm, cursor)
          : getMoreChannels(debouncedSearchTerm, cursor),
      {
        onSuccess: res => {
          setData(prev => [...prev, ...res.data])
          setCursor(res.pagination.cursor)
        },
      }
    )

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
    try {
      await fetchMoreChannels()
    } catch (error) {
      console.error('Error in fetchMoreChannels:', error)
    }
  }, [fetchMoreChannels])

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
