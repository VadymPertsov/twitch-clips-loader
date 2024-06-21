'use client'

import { NAV_LINKS, ROUTES } from '@/constants/nav-links'
import Navlink from './Navlink'
import Link from 'next/link'
import Image from '../Image'
import logo from '../../../../public/logo.svg'
import { useSelectedClipsContext } from '@/context/SelectedClipsContext'
import Container from '../Layout/Container'

const Navbar = () => {
  const { selectedClips } = useSelectedClipsContext()

  return (
    <header className="fixed z-10 w-full bg-violet-800 py-2">
      <Container className="xs:gap-1 flex items-center justify-between gap-2">
        <Link href={ROUTES.HOME_PAGE}>
          <Image
            src={logo}
            alt="Logo"
            width={400}
            height={155}
            placeholder="empty"
            className="max-w-[200px] md:max-w-[150px]"
          />
        </Link>
        <nav className="ml-4 self-center">
          <ul className="flex items-center gap-x-5 md:gap-x-2">
            {NAV_LINKS.map(link => (
              <Navlink
                key={link.path}
                name={
                  link.path === ROUTES.PROFILE_PAGE
                    ? `${link.name}(${selectedClips.length})`
                    : link.name
                }
                path={link.path}
              />
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Navbar
