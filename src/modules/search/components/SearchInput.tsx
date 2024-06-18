'use client'

import SearchIcon from '@/components/ui/SearchIcon'
import SearchItem from './SearchItem'
import LoadMoreBtn from '@/components/shared/LoadMoreBtn'
import Loading from '@/app/loading'
import Layout from '@/components/shared/Layout/Layout'
import { useSearch } from '../hooks/useSearch'
import { Category } from '@/types'
import { HeadingProps } from '@/components/shared/Heading'

// TODO: research tanstack query
interface SearchInputProps extends HeadingProps {
  category: Category
  placeholder?: string
}

const SearchInput = (props: SearchInputProps) => {
  const { category, placeholder = 'Search...', ...rest } = props

  const {
    filteredData,
    dropdownRef,
    handleFocus,
    handleInputChange,
    handleLoadMore,
    inputRef,
    isFetching,
    isFocused,
    isLoading,
    searchTerm,
  } = useSearch(category)

  return (
    <Layout className="relative" {...rest}>
      <div className="relative mx-auto max-w-[600px]">
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
          placeholder={placeholder}
          required
        />
      </div>
      {isFocused && searchTerm && (
        <div
          id="dropdown"
          ref={dropdownRef}
          className="absolute left-[50%] top-full z-10 max-h-[300px] w-full max-w-[600px] -translate-x-1/2 divide-y divide-gray-100 overflow-auto border border-violet-800 bg-white shadow"
        >
          {isLoading ? (
            <Loading isFullscreen={false} />
          ) : filteredData?.length ? (
            <ul>
              {filteredData?.map(item => (
                <SearchItem key={item.id} item={item} />
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
