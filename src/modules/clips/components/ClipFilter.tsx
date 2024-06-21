import ActionTag from '@/components/ui/ActionTag'
import { Timestamps } from '@/types'
import { memo } from 'react'

interface ClipFilterProps {
  onClick: (time: Timestamps) => void
  currentTimestamp: Timestamps
}

const timestamps: Timestamps[] = ['All', '24h', '7d', '1m']

const ClipFilter = memo((props: ClipFilterProps) => {
  const { onClick, currentTimestamp } = props

  return (
    <div className="flex flex-wrap items-center justify-end gap-5 py-5 font-semibold">
      <h4>Filter by</h4>
      <div className="flex flex-row gap-x-5 md:gap-x-2">
        {timestamps.map(time => (
          <ActionTag
            key={time}
            isActive={time === currentTimestamp}
            as="button"
            onClick={() => onClick(time)}
          >
            {time}
          </ActionTag>
        ))}
      </div>
    </div>
  )
})

export default ClipFilter
