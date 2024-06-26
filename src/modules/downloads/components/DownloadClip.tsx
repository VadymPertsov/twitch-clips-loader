import Layout from '@/components/shared/Layout/Layout'
import ActionTag from '@/components/ui/ActionTag'
import { normalizeUrltoMp4 } from '@/utils/helpers-functions'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { getClipByUrl } from '../api'
import { useMutation } from 'react-query'
import Loader from '@/components/shared/Loader'
import Input from '@/components/shared/Input'

const twitchPath = 'clips.twitch.tv/'

const DownloadClip = () => {
  const [twitchClipUrl, setTwitchClipUrl] = useState<string>('')
  const [downloadUrl, setDownloadUrl] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { isLoading, mutate: fetchClipByUrl } = useMutation(
    async (clipId: string) => await getClipByUrl(clipId),
    {
      onSuccess: clip => {
        if (clip) {
          const normalizedUrl = normalizeUrltoMp4(clip.data[0].thumbnail_url)
          setDownloadUrl(normalizedUrl)
        }
      },
    }
  )

  useEffect(() => {
    if (downloadUrl) {
      window.location.href = downloadUrl
      setTwitchClipUrl('')
      setDownloadUrl('')
    }
  }, [downloadUrl])

  useEffect(() => {
    if (twitchClipUrl && !twitchClipUrl.includes(twitchPath)) {
      setErrorMessage(
        'Invalid Twitch clip URL. Please make sure it contains "clips.twitch.tv".'
      )
    } else {
      setErrorMessage('')
    }
  }, [twitchClipUrl])

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const clipId = extractClipId(twitchClipUrl)
      if (!clipId) return

      fetchClipByUrl(clipId)
    },
    [fetchClipByUrl, twitchClipUrl]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTwitchClipUrl(e.target.value)
    },
    []
  )

  return (
    <Layout
      title="You can download the twitch clip right here"
      coloredText="By the link!"
    >
      <form className="mx-auto max-w-[600px]" onSubmit={handleSubmit}>
        <div className="flex gap-5 md:flex-wrap md:justify-center">
          <Input
            value={twitchClipUrl}
            onChange={handleInputChange}
            type="text"
            placeholder="Paste here the twitch clip link..."
            required
          />
          <ActionTag
            as="button"
            type="submit"
            isActive
            className="disabled:cursor-default disabled:bg-red-300 disabled:text-white"
            disabled={errorMessage.length !== 0}
          >
            {isLoading ? <Loader /> : 'Download'}
          </ActionTag>
        </div>
      </form>
      {errorMessage && (
        <p className="mt-2 text-center text-red-500">{errorMessage}</p>
      )}
    </Layout>
  )
}

function extractClipId(url: string): string | null {
  const parts = url.split(twitchPath)
  return parts.length > 1 ? parts[1] : null
}

export default DownloadClip
