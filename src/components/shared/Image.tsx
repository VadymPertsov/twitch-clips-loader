import NextImage, { ImageProps as NextImageProps } from 'next/image'

interface ImageProps extends NextImageProps {}

const blurEffect =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8GvS/HgAHEQK3e+aSHwAAAABJRU5ErkJggg=='

const Image = (props: ImageProps) => {
  const { width = 600, height = 800, ...rest } = props

  return (
    <NextImage
      width={width}
      height={height}
      priority
      placeholder="blur"
      blurDataURL={blurEffect}
      {...rest}
    />
  )
}

export default Image
