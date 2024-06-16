'use client'

import { ClipList } from '@/modules/clips'
import { Category } from '@/types'

interface ClipsPageProps {
  params: { category: Category; id: string }
}

const ClipsPage = (props: ClipsPageProps) => {
  const {
    params: { category, id },
  } = props

  return <ClipList category={category} id={id} />
}

export default ClipsPage
