import { memo } from 'react'
import Loader from './Loader'
import ActionTag from '../ui/ActionTag'
import cn from 'classnames'

interface LoadMoreBtnProps {
  onClick: () => void
  isLoading?: boolean
  label?: string
  className?: string
}

const LoadMoreBtn = memo((props: LoadMoreBtnProps) => {
  const { className, onClick, isLoading = false, label = 'Load more' } = props

  return (
    <div className="flex justify-center pb-5 pt-10">
      <ActionTag
        as="button"
        className={className}
        isActive
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? <Loader /> : <p>{label}</p>}
      </ActionTag>
    </div>
  )
})

export default LoadMoreBtn
