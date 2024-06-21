import { useState, useRef, MutableRefObject } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

interface VideoMergerProps {
  videosList: string[]
}

const VideoMerger = (props: VideoMergerProps) => {
  const { videosList } = props

  const [isMerging, setIsMerging] = useState<boolean>(false)
  const [mergedVideo, setMergedVideo] = useState<string>('')

  const ffmpegRef = useRef<FFmpeg>(new FFmpeg())

  const loadFFmpeg = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
    const ffmpeg = ffmpegRef.current

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        'application/wasm'
      ),
    })
  }

  const mergeVideos = async () => {
    setIsMerging(true)

    await loadFFmpeg()

    const ffmpeg = ffmpegRef.current

    if (!ffmpeg.loaded) {
      console.error('FFmpeg is not loaded yet.')
      return
    }

    const videosData = await processVideos(videosList)

    videosData.forEach(
      async (video, index) => await ffmpeg.writeFile(`video${index}.mp4`, video)
    )

    const concatFileContent = videosData
      .map((_, index) => `file video${index}.mp4`)
      .join('\n')
    await ffmpeg.writeFile(
      'concat.txt',
      new TextEncoder().encode(concatFileContent)
    )

    await ffmpeg.exec([
      '-f',
      'concat',
      '-safe',
      '0',
      '-i',
      'concat.txt',
      '-c',
      'copy',
      'output.mp4',
    ])

    const data = (await ffmpeg.readFile('output.mp4')) as Uint8Array
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: 'video/mp4' })
    )
    setMergedVideo(url)
    setIsMerging(false)
  }

  return (
    <div className="flex flex-col gap-5">
      {videosList?.map(video => (
        <video key={video} src={video} controls></video>
      ))}
      <button onClick={mergeVideos} disabled={isMerging}>
        {isMerging ? 'Merging...' : 'Merge Videos'}
      </button>
      {mergedVideo && (
        <div>
          <h2>Merged Video:</h2>
          <video controls src={mergedVideo}></video>
        </div>
      )}
    </div>
  )
}

const processVideos = async (videos: string[]): Promise<Uint8Array[]> =>
  await Promise.all(videos.map(async video => await fetchFile(video)))

export default VideoMerger
