'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface SelectedClipsContextState {
  selectedClipsIds: string[]
  setSelectedClipsIds: SetState<string[]>
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
