import Container from '@/components/shared/Layout/Container'
import Loader from '@/components/shared/Loader'
import ActionTag from '@/components/ui/ActionTag'
import { Clip } from '@/types'
import { normalizeUrltoMp4 } from '@/utils/helpers-functions'
import axios from 'axios'
import { useMemo } from 'react'
import { useMutation } from 'react-query'

interface DownloadZipProps {
  clipsList: Clip[]
}

const DownloadZip = (props: DownloadZipProps) => {
  const { clipsList } = props

  const urls = useMemo(
    () => clipsList.map(clip => normalizeUrltoMp4(clip.thumbnail_url)),
    [clipsList]
  )

  const { mutate: downloadAllFiles, isLoading } = useMutation(
    async () => {
      const response = await axios.post(
        '/api/archive',
        { urls },
        { responseType: 'blob' }
      )

      if (response.status !== 200) {
        throw new Error('Failed to download files')
      }
      return response.data
    },
    {
      onSuccess: data => {
        const url = window.URL.createObjectURL(new Blob([data]))
        const a = document.createElement('a')
        a.href = url
        a.download = 'files.zip'
        document.body.appendChild(a)
        a.click()
        a.remove()
      },
      onError: error => {
        console.error('Error downloading files:', error)
      },
    }
  )

  return (
    <Container className="flex w-full flex-col items-center justify-center gap-3 pt-10">
      <ActionTag
        disabled={isLoading}
        as="button"
        onClick={() => downloadAllFiles()}
        title="If the download takes more than 1 minute, you will receive an error and a damaged archive. Try selecting fewer clips. A fix for this issue is under development."
      >
        {isLoading ? <Loader /> : 'Download All in ZIP'}
      </ActionTag>
      {isLoading && (
        <>
          <p>Please wait a bit...</p>
          <p className="text-xs italic text-red-400">
            If the download takes more than 1 minute, you will receive an error
            and a damaged archive. Try selecting fewer clips. A fix for this
            issue is under development.
          </p>
        </>
      )}
    </Container>
  )
}

export default DownloadZip
