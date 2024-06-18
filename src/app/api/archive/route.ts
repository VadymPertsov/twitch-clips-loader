import axios from 'axios'
import JSZip from 'jszip'
import { NextApiRequest } from 'next'

export async function GET(req: NextApiRequest) {
  const { searchParams } = new URL(req.url || '')
  const images = JSON.parse(searchParams.get('images') || '[]')

  if (!Array.isArray(images) || images.length === 0) {
    throw new Error('No images provided or invalid format')
  }

  const downloads = await Promise.all(
    images.map(async (image: string, index: number) => {
      const response = await axios.get(image, { responseType: 'arraybuffer' })
      return {
        image,
        data: response.data,
        index,
      }
    })
  )

  const zip = new JSZip()

  downloads.forEach(download => {
    zip.file(`image_${download.index}.mp4`, download.data)
  })

  const archive = await zip.generateAsync({ type: 'blob' })

  return new Response(archive, {
    status: 200,
    headers: {
      'Content-Type': 'application/zip',
    },
  })
}
