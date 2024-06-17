import { useLightboxContext } from '@/context/LightboxContext'
import { useSelectedClipsContext } from '@/context/SelectedClipsContext'
import { Clip } from '@/types'
import { useEffect, useState } from 'react'
import { getClipsByIds } from '../api'

export const useProfileClips = () => {
  const [clipsData, setClipsData] = useState<Clip[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)

  const { selectedClipsIds } = useSelectedClipsContext()
  const { setClipIndex } = useLightboxContext()

  useEffect(() => {
    const fetchClipsByIds = async () => {
      setLoading(true)
      try {
        const clips = await getClipsByIds(selectedClipsIds)
        if (clips) {
          setClipsData(clips.data)
        }
      } catch (error) {
        console.error('Error fetching clips:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchClipsByIds()
  }, [selectedClipsIds])

  return {
    isLoading,
    clipsData,
    setClipIndex,
  }
}
