'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface LightboxContextState {
  clipIndex: number
  setClipIndex: (state: number) => void
}

const LightboxContext = createContext<LightboxContextState | undefined>(
  undefined
)

export const useLightboxContext = (): LightboxContextState => {
  const context = useContext(LightboxContext)

  if (!context) {
    throw new Error('useLightboxContext must be used within a LightboxProvider')
  }

  return context
}

export const LightboxProvider = ({ children }: { children: ReactNode }) => {
  const [clipIndex, setClipIndex] = useState(-1)

  const value: LightboxContextState = {
    clipIndex,
    setClipIndex,
  }

  return (
    <LightboxContext.Provider value={value}>
      {children}
    </LightboxContext.Provider>
  )
}
