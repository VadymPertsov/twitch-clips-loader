import Loading from '@/app/loading'
import Container from '@/components/shared/Layout/Container'
import ActionTag from '@/components/ui/ActionTag'
import { Clip } from '@/types'
import { normalizeUrltoMp4 } from '@/utils/helpers-functions'
import axios from 'axios'
import { useState } from 'react'

interface DownloadZipProps {
  clipsList: Clip[]
}

const DownloadZip = (props: DownloadZipProps) => {
  const { clipsList } = props

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const urls = clipsList.map(clip => normalizeUrltoMp4(clip.thumbnail_url))

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `/api/archive?images=${encodeURIComponent(JSON.stringify(urls))}`,
        {
          responseType: 'blob',
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'clips.zip')
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className="flex w-full justify-center pt-10">
      <ActionTag as="button" onClick={handleDownload}>
        {isLoading ? <Loading /> : 'Download All in ZIP'}
      </ActionTag>
      {isLoading && <p>Please wait a bit...</p>}
    </Container>
  )
}

export default DownloadZip
