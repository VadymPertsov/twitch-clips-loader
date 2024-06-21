import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/shared/Header/Navbar'
import { LightboxProvider } from '@/context/LightboxContext'
import { SelectedClipsProvider } from '@/context/SelectedClipsContext'
import ReactQueryProvider from '@/context/ReactQueryProvider'
import Footer from '@/components/shared/Footer'

const SpaceMono = Space_Mono({
  weight: '400',
  display: 'swap',
  style: 'normal',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Twitch Clips Loader',
  description: 'Find and download any clips from Twitch',
  icons: {
    icon: { url: '/favicon.png', href: '/favicon.png' },
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <LightboxProvider>
      <SelectedClipsProvider>
        <ReactQueryProvider>
          <html lang="en">
            <body className={SpaceMono.className}>
              <div className="flex min-h-full flex-col overflow-hidden">
                <Navbar />
                <main className="flex-grow pt-[95px] md:pt-[75px]">
                  {children}
                </main>
                <Footer />
              </div>
            </body>
          </html>
        </ReactQueryProvider>
      </SelectedClipsProvider>
    </LightboxProvider>
  )
}
