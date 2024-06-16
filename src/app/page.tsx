'use client'

import { GamesList } from '@/modules/games'
import { SearchInput } from '@/modules/search'
import { DownloadClip } from '@/modules/downloads'

const HomePage = () => {
  return (
    <>
      <DownloadClip />
      <SearchInput />
      <GamesList />
    </>
  )
}

export default HomePage
