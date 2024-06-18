'use client'

import { ClipList, useClips } from '@/modules/clips'
import { Category } from '@/types'

interface ClipsPageProps {
  params: { category: Category; id: string }
}

const ClipsPage = (props: ClipsPageProps) => {
  const {
    params: { category, id },
  } = props

  const {
    isLoading,
    filteredClipsData: clipsData,
    handleLoadMore,
    isFetching,
    handleFilter,
    filter,
  } = useClips(category, id)

  return (
    <ClipList
      clipsList={clipsData}
      isLoading={isLoading}
      filters={{ handleFilter, filter }}
      loadMore={{ handleLoadMore, isFetching }}
      title="Watch the clips and enjoy :)"
      coloredText="You can select the clip in your profile!"
    />
  )
}

export default ClipsPage
