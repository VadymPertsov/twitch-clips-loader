'use client'

import ActionTag from '@/components/ui/ActionTag'
import { usePathname } from 'next/navigation'

export interface NavlinkProps {
  path: string
  name: string
}

const Navlink = (props: NavlinkProps) => {
  const { path, name } = props

  const pagePath: string = usePathname()

  return (
    <li>
      <ActionTag href={path} isActive={path === pagePath}>
        {name}
      </ActionTag>
    </li>
  )
}

export default Navlink
