import Link, { LinkProps } from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'

interface BaseTagProps {
  children: ReactNode
  isActive?: boolean
  className?: string
  variant?: 'default' | 'primary'
}

type BtnType = ButtonHTMLAttributes<HTMLButtonElement>
type LinkType = LinkProps

type ActionTagProps = BaseTagProps &
  (
    | (BtnType & {
        as: 'button'
      })
    | (LinkType & {
        as?: 'a'
      })
  )
//TODO: add prop target to link
const ActionTag = (props: ActionTagProps) => {
  const {
    as = 'a',
    children,
    isActive = false,
    className,
    variant = 'default',
    ...rest
  } = props
  const tagCn = cn(
    'border border-violet-800 transition-colors hover:bg-violet-400 hover:text-white',
    {
      'bg-violet-700 text-white': isActive,
      'text-sm bg-violet-700 text-white p-2': variant === 'primary',
      'p-3 text-base': variant === 'default',
    }
  )

  if (as === 'button') {
    return (
      <button {...(rest as BtnType)} className={cn(tagCn, className)}>
        {children}
      </button>
    )
  }

  return (
    <Link {...(rest as LinkType)} className={cn(tagCn, className)}>
      {children}
    </Link>
  )
}

export default ActionTag
