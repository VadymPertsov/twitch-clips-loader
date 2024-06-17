import Image from '@/components/shared/Image'
import ActionTag from '@/components/ui/ActionTag'
import { ROUTES } from '@/constants/nav-links'
import { Channel, GameCategory } from '@/types'

interface SearchItemProps<T> {
  item: T
}
// TODO: cleanup this
const SearchItem = <T extends Channel | GameCategory>({
  item,
}: SearchItemProps<T>) => {
  if ('is_live' in item) {
    const { id: channelId, is_live, thumbnail_url, display_name } = item

    return (
      <li className="border border-b-violet-800">
        <ActionTag
          as="a"
          href={`${ROUTES.CLIPS_BY_CHANNEL}/${channelId}`}
          className="inline-flex w-full border-none px-4 py-2"
        >
          <div className="flex items-center gap-5">
            <div className="relative">
              <Image
                src={thumbnail_url}
                alt="Search Item Thumbnail"
                width={60}
                height={60}
                className="max-w-[60px] rounded-full"
              />
              {is_live && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border border-green-900 bg-green-500"></span>
              )}
            </div>
            {display_name}
          </div>
        </ActionTag>
      </li>
    )
  }

  if ('box_art_url' in item) {
    const { id: gameId, box_art_url, name } = item

    return (
      <li className="border border-b-violet-800">
        <ActionTag
          as="a"
          href={`${ROUTES.CLIPS_BY_GAME}/${gameId}`}
          className="inline-flex w-full border-none px-4 py-2"
        >
          <div className="flex items-center gap-5">
            <div className="relative">
              <Image
                src={box_art_url}
                alt="Search Item Thumbnail"
                width={60}
                height={60}
                className="max-w-[60px] rounded-full"
              />
            </div>
            {name}
          </div>
        </ActionTag>
      </li>
    )
  }
}

export default SearchItem
