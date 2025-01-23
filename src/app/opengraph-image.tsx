import HomePreview from '@/components/metadata/HomePreview'
import { ImageResponse } from 'next/og'

export const runtime = 'edge' // for vercel fast image generation

export const size = {
  width: 1200,
  height: 538,
}

export const contentType = 'image/png'

export default async function Image() {

  return new ImageResponse(
    (
      <HomePreview />
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
