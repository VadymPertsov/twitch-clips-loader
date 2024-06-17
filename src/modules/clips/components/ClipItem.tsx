import Image from '@/components/shared/Image'
import ActionTag from '@/components/ui/ActionTag'
import EyeIcon from '@/components/ui/EyeIcon'
import { Clip } from '@/types'
import {
  formatTimeAgo,
  normalizeUrltoMp4,
  normalizeViewCount,
} from '@/utils/helpers-functions'
import { Dispatch, SetStateAction, memo } from 'react'

interface ClipItemProps {
  clip: Clip
  index: number
  handleIndex: (state: number) => void
  handleSelected?: Dispatch<SetStateAction<string[]>>
  selectedClipsIds?: string[]
}

const ClipItem = memo((props: ClipItemProps) => {
  const {
    clip: {
      thumbnail_url,
      view_count,
      title,
      broadcaster_name,
      url,
      created_at,
      id,
    },
    index,
    handleIndex,
    handleSelected,
    selectedClipsIds,
  } = props

  return (
    <div className="flex flex-col p-3 shadow-md hover:shadow-lg">
      <div onClick={() => handleIndex(index)} className="cursor-pointer">
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
      {/* TODO: add the delete from profile logic */}
      {selectedClipsIds && handleSelected && (
        <ActionTag
          as="button"
          variant="primary"
          disabled={selectedClipsIds.includes(id)}
          onClick={() => handleSelected(prev => [...prev, id])}
        >
          {selectedClipsIds.includes(id) ? 'Selected in profile!' : 'Select'}
        </ActionTag>
      )}

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

export default ClipItem
