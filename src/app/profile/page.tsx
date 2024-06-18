'use client'

import { useSelectedClipsContext } from '@/context/SelectedClipsContext'
import { ClipList } from '@/modules/clips'

const ProfilePage = () => {
  const { selectedClips: clipsData } = useSelectedClipsContext()

  return (
    <>
      <ClipList
        clipsList={clipsData}
        isLoading={false}
        title="Watch the clips and enjoy :)"
      />
    </>
  )
}

export default ProfilePage
