import Layout from '@/components/shared/Layout/Layout'
import ActionTag from '@/components/ui/ActionTag'
import { normalizeUrltoMp4 } from '@/utils/helpers-functions'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { getClipByUrl } from '../api'

const twitchPath = 'clips.twitch.tv/'
//TODO: add loader to Download btn
const DownloadClip = () => {
  const [twitchClipUrl, setTwitchClipUrl] = useState<string>('')
  const [downloadUrl, setDownloadUrl] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (downloadUrl) {
      window.location.href = downloadUrl
      setTwitchClipUrl('')
      setDownloadUrl('')
    }
  }, [downloadUrl])

  useEffect(() => {
    //TODO: useDebounce
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

      try {
        const clip = await getClipByUrl(clipId)
        if (!clip) return

        const normalizedUrl = normalizeUrltoMp4(clip.data[0].thumbnail_url)
        setDownloadUrl(normalizedUrl)
      } catch (error) {
        console.error('Error fetching clip:', error)
      }
    },
    [twitchClipUrl]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTwitchClipUrl(e.target.value)
    },
    []
  )

  return (
    <Layout
      title="Or you can choose the clips by the game!"
      coloredText="Right Here"
    >
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex gap-5">
          <input
            value={twitchClipUrl}
            onChange={handleInputChange}
            type="text"
            className="block w-full border border-violet-800 p-4"
            placeholder="Paste here the twitch clip link"
            required
          />
          <ActionTag
            as="button"
            type="submit"
            className="disabled:cursor-default disabled:bg-red-300 disabled:text-white"
            disabled={errorMessage.length !== 0}
          >
            Download
          </ActionTag>
        </div>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </Layout>
  )
}

function extractClipId(url: string): string | null {
  const parts = url.split(twitchPath)
  return parts.length > 1 ? parts[1] : null
}

export default DownloadClip
