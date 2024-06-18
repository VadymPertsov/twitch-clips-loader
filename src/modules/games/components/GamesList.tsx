import GameItem from './GameItem'
import LoadMoreBtn from '@/components/shared/LoadMoreBtn'
import Loading from '@/app/loading'
import { Game, LoadMoreOptions } from '@/types'
import Layout from '@/components/shared/Layout/Layout'

interface GamesListProps {
  gamesList: Game[]
  isLoading: boolean
  loadMore?: boolean | LoadMoreOptions
}

const GamesList = (props: GamesListProps) => {
  const { gamesList, isLoading, loadMore = false } = props

  const enableLoadMoreBtn = loadMore !== false
  const { isFetching, handleLoadMore }: LoadMoreOptions =
    typeof loadMore === 'object' ? loadMore : {}

  return isLoading ? (
    <Loading isFullscreen />
  ) : (
    <Layout
      title="Or you can choose the clips by the game!"
      coloredText="Right Here"
    >
      <div className="grid grid-cols-5 gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {gamesList.map(game => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>
      {enableLoadMoreBtn && handleLoadMore && (
        <LoadMoreBtn isLoading={isFetching} onClick={handleLoadMore} />
      )}
    </Layout>
  )
}

export default GamesList
