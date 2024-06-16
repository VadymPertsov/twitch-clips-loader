import { NavlinkProps } from '@/components/shared/Header/Navlink'

export const ROUTES = {
  HOME_PAGE: '/',
  PROFILE_PAGE: '/profile',
  CLIPS_BY_GAME: '/clips/game',
  CLIPS_BY_CHANNEL: '/clips/channel',
}

export const NAV_LINKS: NavlinkProps[] = [
  {
    path: ROUTES.HOME_PAGE,
    name: 'Home',
  },
  {
    path: ROUTES.PROFILE_PAGE,
    name: 'Profile',
  },
]
