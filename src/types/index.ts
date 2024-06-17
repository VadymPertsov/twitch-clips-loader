export interface Pagination {
  pagination: { cursor: string }
}

export interface Game {
  id: string
  name: string
  box_art_url: string
  igdb_id: string
}

export interface GameCategory {
  id: string
  name: string
  box_art_url: string
}

export interface Clip {
  id: string
  url: string
  embed_url: string
  broadcaster_id: string
  broadcaster_name: string
  creator_id: string
  creator_name: string
  video_id: string
  game_id: string
  language: string
  title: string
  view_count: number
  created_at: string
  thumbnail_url: string
  duration: number
  vod_offset: number
  is_featured: boolean
}

export interface Channel {
  broadcaster_language: string
  broadcaster_login: string
  display_name: string
  game_id: string
  game_name: string
  id: string
  is_live: boolean
  tag_ids: any[]
  tags: string[]
  thumbnail_url: string
  title: string
  started_at: string
}

export type Timestamps = 'All' | '24h' | '7d' | '1m'

export type Category = 'game' | 'channel'
