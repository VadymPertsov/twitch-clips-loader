import Image from '@/components/shared/Image'
import ActionTag from '@/components/ui/ActionTag'
import EyeIcon from '@/components/ui/EyeIcon'
import { Clip } from '@/types'
import {
  formatTimeAgo,
  normalizeUrltoMp4,
  normalizeViewCount,
} from '@/utils/helpers-functions'
import { Dispatch, SetStateAction, memo, useCallback } from 'react'

interface ClipItemProps {
  clip: Clip
  index: number
  handleSetIndex: (state: number) => void
  selectedClips: Clip[]
  handleSetSelectedClips: Dispatch<SetStateAction<Clip[]>>
}

const ClipItem = memo((props: ClipItemProps) => {
  const { clip, index, handleSetIndex, selectedClips, handleSetSelectedClips } =
    props

  const {
    thumbnail_url,
    view_count,
    title,
    broadcaster_name,
    url,
    created_at,
    id: clipId,
  } = clip

  const isClipInProfile = isExistInProfile(selectedClips, clipId)

  const handleSetSelected = useCallback(() => {
    if (isClipInProfile) {
      const data = selectedClips.filter(item => item.id !== clip.id)
      handleSetSelectedClips(data)
    } else {
      handleSetSelectedClips(prev => [...prev, clip])
    }
  }, [handleSetSelectedClips, selectedClips, clip])

  return (
    <div className="flex flex-col p-3 shadow-md hover:shadow-lg">
      <div onClick={() => handleSetIndex(index)} className="cursor-pointer">
        <div className="relative">
          <div className="overflow-hidden">
            <Image
              src={thumbnail_url}
              alt="Clip Thumbnail"
              width={480}
              height={272}
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
          <span className="absolute bottom-0 right-0 flex items-center gap-2 rounded-tl-xl bg-violet-700 p-2 text-sm text-white">
            <EyeIcon />
            {normalizeViewCount(view_count)}
          </span>
        </div>
      </div>
      <ActionTag as="button" variant="primary" onClick={handleSetSelected}>
        {isClipInProfile ? 'Remove' : 'Select'}
      </ActionTag>
      <div className="grow pt-2">
        <h5 className="line-clamp-2 text-lg font-semibold" title={title}>
          {title}
        </h5>
        <p>{broadcaster_name}</p>
        <p>{formatTimeAgo(new Date(created_at), new Date())}</p>
      </div>
      <div className="flex items-center justify-between gap-5 pt-2">
        <ActionTag variant="primary" href={normalizeUrltoMp4(thumbnail_url)}>
          Download
        </ActionTag>
        <ActionTag variant="primary" href={url}>
          Twitch link
        </ActionTag>
      </div>
    </div>
  )
})

function isExistInProfile(clips: Clip[], id: string): boolean {
  return clips.some(clip => clip.id === id)
}

export default ClipItem
