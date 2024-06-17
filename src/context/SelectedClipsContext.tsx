'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface SelectedClipsContextState {
  selectedClipsIds: string[]
  //TODO: research to init  global.d.ts. type
  setSelectedClipsIds: Dispatch<SetStateAction<string[]>>
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
  const [selectedClipsIds, setSelectedClipsIds] = useState<string[]>([])

  const value: SelectedClipsContextState = {
    selectedClipsIds,
    setSelectedClipsIds,
  }

  return (
    <SelectedClipsContext.Provider value={value}>
      {children}
    </SelectedClipsContext.Provider>
  )
}
