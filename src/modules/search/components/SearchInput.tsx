'use client'

import SearchIcon from '@/components/ui/SearchIcon'
import { useDebounce } from '@/hooks/useDebounce'
import { useCallback, useEffect, useRef, useState } from 'react'
import SearchItem from './SearchItem'
import LoadMoreBtn from '@/components/shared/LoadMoreBtn'
import Loading from '@/app/loading'
import Layout from '@/components/shared/Layout/Layout'
import { getChannels, getMoreChannels } from '../api'
import { Channel } from '@/types'

// TODO: research how to make two fetch(Promise.all) req live_only channels and not live_only then connect to eachother
// TODO: research tanstack query
const SearchInput = () => {
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

  return (
    <Layout
      className="relative"
      title="You can search the clips by channel!"
      coloredText="Right Here"
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <SearchIcon />
        </div>
        {/* TODO: make a Input compoennt */}
        <input
          ref={inputRef}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          type="text"
          id="default-search"
          className="block w-full border border-violet-800 p-4 ps-10"
          placeholder="Search twitch channels..."
          required
        />
      </div>
      {isFocused && searchTerm && (
        <div
          id="dropdown"
          ref={dropdownRef}
          className="absolute left-0 top-full z-10 max-h-[300px] w-full divide-y divide-gray-100 overflow-auto border border-violet-800 bg-white shadow"
        >
          {isLoading ? (
            <Loading isFullscreen={false} />
          ) : channelsData?.length ? (
            <ul>
              {channelsData?.map(channel => (
                <SearchItem key={channel.id} channel={channel} />
              ))}
              <LoadMoreBtn isLoading={isFetching} onClick={handleLoadMore} />
            </ul>
          ) : (
            <p className="p-5 text-center">Has no "{searchTerm}" channel :(</p>
          )}
        </div>
      )}
    </Layout>
  )
}

export default SearchInput
