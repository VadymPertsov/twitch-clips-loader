import Image from '@/components/shared/Image'
import ActionTag from '@/components/ui/ActionTag'
import EyeIcon from '@/components/ui/EyeIcon'
import { LOCAL_STORAGE_SELECTED_CLIPS } from '@/constants/localstorage'
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
      removeClipFromLocaleStorage(clip)
    } else {
      handleSetSelectedClips(prev => [...prev, clip])
      saveClipToLocaleStorage(clip)
    }
  }, [handleSetSelectedClips, selectedClips, isClipInProfile, clip])

  return (
    <div className="flex flex-col rounded-md p-3 shadow-lg hover:shadow-violet-400">
      <div
        onClick={() => handleSetIndex(index)}
        className="mb-1 cursor-pointer"
      >
        <div className="relative">
          <div className="overflow-hidden rounded-md">
            <Image
              src={thumbnail_url}
              alt="Clip Thumbnail"
              width={480}
              height={272}
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
          <span className="absolute bottom-0 right-0 flex items-center gap-2 rounded-br-md rounded-tl-md bg-violet-700 bg-opacity-70 p-2 text-xs font-semibold text-white">
            <EyeIcon />
            {normalizeViewCount(view_count)}
          </span>
          <span className="absolute bottom-0 left-0 flex items-center gap-2 rounded-bl-md rounded-tr-md bg-violet-700 bg-opacity-70 p-2 text-xs font-semibold text-white">
            {formatTimeAgo(new Date(created_at), new Date())}
          </span>
        </div>
      </div>
      <ActionTag
        as="button"
        variant="primary"
        className="mb-2"
        onClick={handleSetSelected}
      >
        {isClipInProfile ? 'Remove' : 'Select'}
      </ActionTag>
      <div className="mb-2 grow">
        <h5 className="line-clamp-2 text-lg font-semibold" title={title}>
          {title}
        </h5>
        <p>{broadcaster_name}</p>
      </div>
      <div className="flex items-center justify-between gap-5">
        <ActionTag variant="primary" href={normalizeUrltoMp4(thumbnail_url)}>
          Download
        </ActionTag>
        <ActionTag target="_blank" variant="primary" href={url}>
          Twitch link
        </ActionTag>
      </div>
    </div>
  )
})

function isExistInProfile(clips: Clip[], id: string): boolean {
  return clips.some(clip => clip.id === id)
}

function saveClipToLocaleStorage(clip: Clip): void {
  const savedClips = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_SELECTED_CLIPS) || '[]'
  )
  savedClips.push(clip)
  localStorage.setItem(LOCAL_STORAGE_SELECTED_CLIPS, JSON.stringify(savedClips))
}

function removeClipFromLocaleStorage(clip: Clip) {
  let savedClips = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_SELECTED_CLIPS) || '[]'
  )
  savedClips = savedClips.filter((item: Clip) => item.id !== clip.id)
  localStorage.setItem(LOCAL_STORAGE_SELECTED_CLIPS, JSON.stringify(savedClips))
}

export default ClipItem
