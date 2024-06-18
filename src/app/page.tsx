'use client'

import { GamesList, useGames } from '@/modules/games'
import { SearchInput } from '@/modules/search'
import { DownloadClip } from '@/modules/downloads'

const HomePage = () => {
  const {
    filteredGamesData: gamesData,
    handleLoadMore,
    isFetching,
    isLoading,
  } = useGames()

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
      <GamesList
        gamesList={gamesData}
        isLoading={isLoading}
        loadMore={{ handleLoadMore, isFetching }}
      />
    </>
  )
}

export default HomePage
