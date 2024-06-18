'use client'

import { Clip } from '@/types'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface SelectedClipsContextState {
  //TODO: save in context full clip data, not only ids
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
