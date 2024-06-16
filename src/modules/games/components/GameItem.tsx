import Image from '@/components/shared/Image'
import { ROUTES } from '@/constants/nav-links'
import { Game } from '@/types'
import { normalizeImagePath } from '@/utils/helpers-functions'
import Link from 'next/link'
import { memo } from 'react'

interface GameItemProps {
  game: Game
}

const GameItem = memo((props: GameItemProps) => {
  const {
    game: { id: gameId, box_art_url, name },
  } = props

  return (
    <Link href={`${ROUTES.CLIPS_BY_GAME}/${gameId}`}>
      <div className="overflow-hidden">
        <Image
          src={normalizeImagePath(box_art_url)}
          alt="Game Thumbnail"
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <h5 className="line-clamp-2 pt-2 text-lg font-semibold" title={name}>
        {name}
      </h5>
    </Link>
  )
})

export default GameItem
