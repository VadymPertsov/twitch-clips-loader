import ClipItem from './ClipItem'
import { Category } from '@/types'
import Layout from '@/components/shared/Layout/Layout'
import { useLightboxContext } from '@/context/LightboxContext'
import { useClips } from '../hooks/useClips'
import ClipFilter from './ClipFilter'
import LoadMoreBtn from '@/components/shared/LoadMoreBtn'
import ClipLightbox from './ClipLightbox'
import Loading from '@/app/loading'
import { memo } from 'react'
import { useSelectedClipsContext } from '@/context/SelectedClipsContext'

interface ClipListProps {
  category: Category
  id: string
}

const ClipList = memo((props: ClipListProps) => {
  const { category, id } = props

  const {
    isLoading,
    clipsData,
    handleLoadMore,
    isFetching,
    filterClipsData,
    filter,
  } = useClips(category, id)

  const { setClipIndex } = useLightboxContext()
  const { selectedClipsIds, setSelectedClipsIds } = useSelectedClipsContext()

  return (
    <Layout
      title="Watch the clips and enjoy :)"
      coloredText="You can select the clip in your profile!"
    >
      <ClipFilter onClick={filterClipsData} currentTimestamp={filter} />
      {isLoading ? (
        <Loading isFullscreen={false} />
      ) : (
        <div className="grid grid-cols-4 gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {!clipsData.length ? (
            <p>Has no clips :(</p>
          ) : (
            clipsData.map((clip, index) => (
              <ClipItem
                key={clip.id}
                clip={clip}
                index={index}
                handleIndex={setClipIndex}
                handleSelected={setSelectedClipsIds}
                selectedClipsIds={selectedClipsIds}
              />
            ))
          )}
        </div>
      )}
      {clipsData.length > 0 && (
        <LoadMoreBtn isLoading={isFetching} onClick={handleLoadMore} />
      )}
      <ClipLightbox clipsList={clipsData} />
    </Layout>
  )
})

export default ClipList
