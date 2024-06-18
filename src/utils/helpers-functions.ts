import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  format,
} from 'date-fns'

export const normalizeImagePath = (
  path: string,
  width = 600,
  height = 800
): string =>
  path
    .replace('{width}', width.toString())
    .replace('{height}', height.toString())

export const normalizeUrltoMp4 = (url: string): string =>
  url.split('-preview')[0] + '.mp4'

export const formatTimeAgo = (targetDate: Date, currentDate: Date): string => {
  const diffInMonths = differenceInMonths(currentDate, targetDate)
  const diffInDays = differenceInDays(currentDate, targetDate)
  const diffInHours = differenceInHours(currentDate, targetDate)
  const diffInMinutes = differenceInMinutes(currentDate, targetDate)
  const diffInSeconds = differenceInSeconds(currentDate, targetDate)

  if (diffInMonths >= 1) {
    return `${format(targetDate, 'MMMM dd, yyyy')}`
  } else if (diffInDays >= 1) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`
  } else if (diffInHours >= 1) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`
  } else if (diffInMinutes >= 1) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`
  } else {
    return `${diffInSeconds} ${diffInSeconds === 1 ? 'second' : 'seconds'} ago`
  }
}

export const normalizeViewCount = (count: number): string => {
  return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const filterUniqueListById = <T extends { id: string }>(
  list: T[]
): T[] => {
  const map = new Map<string, T>()

  list.forEach(item => {
    map.set(item.id, item)
  })

  return Array.from(map.values())
}

export const getTimestamp = (time: '24h' | '7d' | '1m'): string => {
  const now = new Date()
  let start: Date
  let end: Date

  switch (time) {
    case '24h':
      start = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      end = now
      break
    case '7d':
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      end = now
      break
    case '1m':
      start = new Date(now.getFullYear(), now.getMonth(), 1)
      end = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      end.setMilliseconds(end.getMilliseconds() - 1)
      break
    default:
      throw new Error(`Unsupported time range: ${time}`)
  }
  return `&started_at=${start.toISOString()}&ended_at=${end.toISOString()}`
}

export const buildClipsByIdsPath = (ids: string[]): string => {
  return ids.map(id => `id=${id}`).join('&')
}
