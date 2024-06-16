import { useLightboxContext } from '@/context/LightboxContext'
import { Clip } from '@/types'
import { normalizeUrltoMp4 } from '@/utils/helpers-functions'
import { memo } from 'react'
import Lightbox, { LightboxProps } from 'yet-another-react-lightbox'
import Video from 'yet-another-react-lightbox/plugins/video'
import 'yet-another-react-lightbox/styles.css'

interface ClipLightboxProps {
  clipsList: Clip[]
}

const ClipLightbox = memo((props: ClipLightboxProps) => {
  const { clipsList } = props
  const { clipIndex, setClipIndex } = useLightboxContext()

  return (
    <Lightbox
      index={clipIndex}
      open={clipIndex >= 0}
      close={() => setClipIndex(-1)}
      plugins={[Video]}
      slides={renderLightboxSlides(clipsList)}
      styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .8)' } }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
        closeOnPullUp: true,
      }}
    />
  )
})

function renderLightboxSlides(clips: Clip[]): LightboxProps['slides'] {
  return clips.map(clip => ({
    type: 'video',
    width: 1280,
    height: 720,
    poster: clip.thumbnail_url,
    loop: false,
    autoPlay: true,
    sources: [
      {
        src: normalizeUrltoMp4(clip.thumbnail_url),
        type: 'video/mp4',
      },
    ],
  }))
}

export default ClipLightbox
