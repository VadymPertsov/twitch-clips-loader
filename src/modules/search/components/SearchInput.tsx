'use client'

import SearchIcon from '@/components/ui/SearchIcon'
import SearchItem from './SearchItem'
import LoadMoreBtn from '@/components/shared/LoadMoreBtn'
import Layout from '@/components/shared/Layout/Layout'
import { useSearch } from '../hooks/useSearch'
import { Category } from '@/types'
import { HeadingProps } from '@/components/shared/Heading'
import Loader from '@/components/shared/Loader'
import Input from '@/components/shared/Input'

interface SearchInputProps extends HeadingProps {
  category: Category
  placeholder?: string
}

const SearchInput = (props: SearchInputProps) => {
  const { category, placeholder = 'Search...', ...rest } = props

  const {
    filteredData: searchData,
    dropdownRef,
    handleFocus,
    handleInputChange,
    handleLoadMore,
    inputRef,
    isFetching,
    isFocused,
    isLoading,
    searchTerm,
    cursor: hasMoreItems,
  } = useSearch(category)

  return (
    <Layout className="relative" {...rest}>
      <div className="relative mx-auto max-w-[600px]">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <SearchIcon />
        </div>
        <Input
          ref={inputRef}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          type="text"
          className="ps-10"
          id="default-search"
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
            <Loader className="p-5" />
          ) : (
            <>
              <ul>
                {searchData.map(item => (
                  <SearchItem key={item.id} item={item} />
                ))}
              </ul>
              {hasMoreItems ? (
                <LoadMoreBtn isLoading={isFetching} onClick={handleLoadMore} />
              ) : (
                <p className="p-5 text-center">{`Has no "${searchTerm}" channel more :(`}</p>
              )}
            </>
          )}
        </div>
      )}
    </Layout>
  )
}

export default SearchInput
