'use client'

import MergeVideos from '@/components/Video'
import { useSelectedClipsContext } from '@/context/SelectedClipsContext'
import { ClipList } from '@/modules/clips'
import { DownloadZip } from '@/modules/downloads'
import { normalizeUrltoMp4 } from '@/utils/helpers-functions'

const ProfilePage = () => {
  const { selectedClips: clipsData } = useSelectedClipsContext()

  return (
    <>
      <MergeVideos
        // videosList={clipsData.map(clip =>
        //   normalizeUrltoMp4(clip.thumbnail_url)
        // )}
        videosList={[
          'https://clips-media-assets2.twitch.tv/AT-cm%7C962031684.mp4',
          'https://clips-media-assets2.twitch.tv/AT-cm%7C387940519.mp4',
        ]}
      />
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
