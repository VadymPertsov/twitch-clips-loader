'use client'

import ActionTag from '@/components/ui/ActionTag'
import { ROUTES } from '@/constants/nav-links'
import { useSelectedClipsContext } from '@/context/SelectedClipsContext'
import { usePathname } from 'next/navigation'

export interface NavlinkProps {
  path: string
  name: string
}

const Navlink = (props: NavlinkProps) => {
  const { path, name } = props

  const pagePath: string = usePathname()

  const { selectedClips } = useSelectedClipsContext()

  return (
    <li>
      <ActionTag href={path} isActive={path === pagePath}>
        {path === ROUTES.PROFILE_PAGE
          ? `${name}(${selectedClips.length})`
          : name}
      </ActionTag>
    </li>
  )
}

export default Navlink
