import Container from '@/components/shared/Layout/Container'
import Loader from '@/components/shared/Loader'
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

  const downloadAllFiles = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        '/api/archive',
        { urls },
        { responseType: 'blob' }
      )

      if (response.status !== 200) {
        throw new Error('Failed to download files')
      }

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = 'files.zip'
      document.body.appendChild(a)
      a.click()
      a.remove()
    } catch (error) {
      console.error('Error downloading files:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className="flex w-full flex-col items-center justify-center gap-3 pt-10">
      <ActionTag as="button" onClick={downloadAllFiles}>
        {isLoading ? <Loader /> : 'Download All in ZIP'}
      </ActionTag>
      {isLoading && <p>Please wait a bit...</p>}
    </Container>
  )
}

export default DownloadZip
