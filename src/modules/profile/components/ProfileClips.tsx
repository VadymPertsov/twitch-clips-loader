'use client'

import Loading from '@/app/loading'
import Layout from '@/components/shared/Layout/Layout'
import { ClipItem, ClipLightbox } from '@/modules/clips'
import { useProfileClips } from '../hooks/useProfileClips'

const ProfileClips = () => {
  const { clipsData, isLoading, setClipIndex } = useProfileClips()

  // TODO: add logic max selected clips 100
  return (
    <Layout title="Your selected clips">
      {isLoading ? (
        <Loading isFullscreen={false} />
      ) : !clipsData.length ? (
        <p>No clips selected :(</p>
      ) : (
        <div className="grid grid-cols-4 gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {clipsData.map((clip, index) => (
            <ClipItem
              key={clip.id}
              clip={clip}
              index={index}
              handleIndex={setClipIndex}
            />
          ))}
        </div>
      )}
      <ClipLightbox clipsList={clipsData} />
    </Layout>
  )
}

export default ProfileClips
