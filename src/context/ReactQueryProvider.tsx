'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
})

interface ReactQueryProviderProps {
  children: ReactNode
}

const ReactQueryProvider = (props: ReactQueryProviderProps) => {
  const { children } = props
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider
