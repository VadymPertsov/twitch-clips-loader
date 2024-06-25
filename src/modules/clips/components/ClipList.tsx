import ClipItem from './ClipItem'
import { Clip, FiltersOptions, LoadMoreOptions } from '@/types'
import Layout, { LayoutProps } from '@/components/shared/Layout/Layout'
import { useLightboxContext } from '@/context/LightboxContext'
import ClipFilter from './ClipFilter'
import LoadMoreBtn from '@/components/shared/LoadMoreBtn'
import ClipLightbox from './ClipLightbox'
import { memo } from 'react'
import { useSelectedClipsContext } from '@/context/SelectedClipsContext'
import Loader from '@/components/shared/Loader'

interface ClipListProps extends Pick<LayoutProps, 'title' | 'coloredText'> {
  clipsList: Clip[]
  isLoading: boolean
  loadMore?: boolean | LoadMoreOptions
  filters?: boolean | FiltersOptions
}

const ClipList = memo((props: ClipListProps) => {
  const {
    clipsList,
    isLoading,
    loadMore = false,
    filters = false,
    ...rest
  } = props

  const enableLoadMoreBtn = loadMore !== false
  const { isFetching, handleLoadMore }: LoadMoreOptions =
    typeof loadMore === 'object' ? loadMore : {}

  const enableFilters = filters !== false
  const { filter, handleFilter }: FiltersOptions =
    typeof filters === 'object' ? filters : {}

  const { setClipIndex } = useLightboxContext()
  const { selectedClips, setSelectedClips } = useSelectedClipsContext()

  return (
    <Layout {...rest}>
      {enableFilters && handleFilter && filter && (
        <ClipFilter onClick={handleFilter} currentTimestamp={filter} />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!clipsList.length ? (
            <p className="text-center">Has no clips :(</p>
          ) : (
            <div className="grid grid-cols-4 gap-5 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
              {clipsList.map((clip, index) => (
                <ClipItem
                  key={clip.id}
                  clip={clip}
                  index={index}
                  handleSetIndex={setClipIndex}
                  handleSetSelectedClips={setSelectedClips}
                  selectedClips={selectedClips}
                />
              ))}
            </div>
          )}
        </>
      )}
      {enableLoadMoreBtn &&
        handleLoadMore &&
        clipsList.length > 0 &&
        !isLoading && (
          <LoadMoreBtn isLoading={isFetching} onClick={handleLoadMore} />
        )}
      <ClipLightbox clipsList={clipsList} />
    </Layout>
  )
})

export default ClipList
