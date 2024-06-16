import Loading from '@/app/loading'
import { memo } from 'react'

interface LoadMoreBtnProps {
  onClick: () => void
  isLoading?: boolean
  label?: string
}

const LoadMoreBtn = memo((props: LoadMoreBtnProps) => {
  const { onClick, isLoading = false, label = 'Load more' } = props

  return (
    <div className="pt-10 text-center">
      <button
        className="border border-violet-800 p-3 text-lg transition-colors hover:bg-violet-400 hover:text-white"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? <Loading isFullscreen={false} /> : <p>{label}</p>}
      </button>
    </div>
  )
})

export default LoadMoreBtn
