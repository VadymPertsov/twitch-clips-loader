import axios from 'axios'
import JSZip from 'jszip'

export const maxDuration = 60
export async function POST(req: Request) {
  //TODO: try to set S3 for files download from server
  const { urls } = await req.json()

  if (!urls || !Array.isArray(urls)) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), {
      status: 400,
    })
  }

  const zip = new JSZip()

  try {
    await Promise.all(
      urls.map(async url => {
        const response = await axios.get(url, { responseType: 'arraybuffer' })
        const filename = url.split('/').pop()
        zip.file(filename, response.data)
      })
    )

    const content = await zip.generateAsync({ type: 'nodebuffer' })

    return new Response(content, {
      headers: {
        'Content-Disposition': 'attachment; filename="files.zip"',
        'Content-Type': 'application/zip',
      },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    })
  }
}
