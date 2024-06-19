'use client'

import { useSelectedClipsContext } from '@/context/SelectedClipsContext'
import { ClipList } from '@/modules/clips'
import { DownloadZip } from '@/modules/profile'

const ProfilePage = () => {
  const { selectedClips: clipsData } = useSelectedClipsContext()

  return (
    <>
      {clipsData.length ? <DownloadZip clipsList={clipsData} /> : null}
      <ClipList
        clipsList={clipsData}
        isLoading={false}
        title="Watch the clips and enjoy :)"
      />
    </>
  )
}

export default ProfilePage
