import { NAV_LINKS, ROUTES } from '@/constants/nav-links'
import Navlink from './Navlink'
import Link from 'next/link'
import Image from '../Image'
import logo from '../../../../public/logo.svg'

const Navbar = () => {
  return (
    <header className="flex w-full items-center justify-between p-5 shadow-md shadow-violet-100">
      <Link href={ROUTES.HOME_PAGE}>
        <Image
          src={logo}
          alt="Logo"
          width={400}
          height={155}
          className="max-w-[300px]"
        />
      </Link>
      <nav className="ml-4 self-center">
        <ul className="flex items-center gap-x-5">
          {NAV_LINKS.map(link => (
            <Navlink key={link.path} name={link.name} path={link.path} />
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
