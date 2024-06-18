'use client'

import { useSelectedClipsContext } from '@/context/SelectedClipsContext'
import { ClipList } from '@/modules/clips'
import DownloadZip from '@/modules/profile/components/DownloadZip'

const ProfilePage = () => {
  const { selectedClips: clipsData } = useSelectedClipsContext()

  return (
    <>
      <DownloadZip clipsList={clipsData} />
      <ClipList
        clipsList={clipsData}
        isLoading={false}
        title="Watch the clips and enjoy :)"
      />
    </>
  )
}

export default ProfilePage
