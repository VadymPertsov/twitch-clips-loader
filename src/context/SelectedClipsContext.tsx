'use client'

import { LOCAL_STORAGE_SELECTED_CLIPS } from '@/constants/localstorage'
import { Clip } from '@/types'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface SelectedClipsContextState {
  selectedClips: Clip[]
  //TODO: research to init  global.d.ts. type
  setSelectedClips: Dispatch<SetStateAction<Clip[]>>
}

const SelectedClipsContext = createContext<
  SelectedClipsContextState | undefined
>(undefined)

export const useSelectedClipsContext = (): SelectedClipsContextState => {
  const context = useContext(SelectedClipsContext)

  if (!context) {
    throw new Error(
      'useSelectedClipsContext must be used within a SelectedClipsProvider'
    )
  }

  return context
}

export const SelectedClipsProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [selectedClips, setSelectedClips] = useState<Clip[]>([])

  useEffect(() => {
    const savedClips = localStorage.getItem(LOCAL_STORAGE_SELECTED_CLIPS)
    if (savedClips) {
      setSelectedClips(JSON.parse(savedClips))
    }
  }, [])

  const value: SelectedClipsContextState = {
    selectedClips,
    setSelectedClips,
  }

  return (
    <SelectedClipsContext.Provider value={value}>
      {children}
    </SelectedClipsContext.Provider>
  )
}
