import GameItem from './GameItem'
import Layout from '@/components/shared/Layout/Layout'
import { useGames } from '../hooks/useGames'
import LoadMoreBtn from '@/components/shared/LoadMoreBtn'
import Loading from '@/app/loading'

const GamesList = () => {
  const {
    filteredGamesData: gamesData,
    handleLoadMore,
    isFetching,
    isLoading,
  } = useGames()

  return (
    <Layout
      title="Or you can choose the clips by the game!"
      coloredText="Right Here"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-5 gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {gamesData.map(game => (
            <GameItem key={game.id} game={game} />
          ))}
        </div>
      )}
      <LoadMoreBtn isLoading={isFetching} onClick={handleLoadMore} />
    </Layout>
  )
}

export default GamesList
