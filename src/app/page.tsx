'use client'

import { GamesList } from '@/modules/games'
import { SearchInput } from '@/modules/search'
import { DownloadClip } from '@/modules/downloads'

const HomePage = () => {
  return (
    <>
      <DownloadClip />
      <SearchInput
        category="channel"
        title="You can search the clips by channel!"
        coloredText="Right Here"
        placeholder="Search twitch channels..."
      />
      <SearchInput
        category="game"
        title="You can search the game!"
        coloredText="Right Here"
        placeholder="Search twitch games..."
      />
      <GamesList />
    </>
  )
}

export default HomePage
