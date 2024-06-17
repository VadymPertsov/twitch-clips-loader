'use client'

import SearchIcon from '@/components/ui/SearchIcon'
import SearchItem from './SearchItem'
import LoadMoreBtn from '@/components/shared/LoadMoreBtn'
import Loading from '@/app/loading'
import Layout from '@/components/shared/Layout/Layout'
import { useSearch } from '../hooks/useSearch'

// TODO: research how to make two fetch(Promise.all) req live_only channels and not live_only then connect to eachother
// TODO: research tanstack query
const SearchInput = () => {
  const {
    filteredChannelsData: channelsData,
    dropdownRef,
    handleFocus,
    handleInputChange,
    handleLoadMore,
    inputRef,
    isFetching,
    isFocused,
    isLoading,
    searchTerm,
  } = useSearch()

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
