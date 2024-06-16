import cn from 'classnames'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

const Container = (props: ContainerProps) => {
  const { children, className } = props

  return (
    <div className={cn('max-w-screen-xl m-auto w-full pl-3 pr-3', className)}>
      {children}
    </div>
  )
}

export default Container
