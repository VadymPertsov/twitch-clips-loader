/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'clips-media-assets2.twitch.tv',
      },
      {
        protocol: 'https',
        hostname: 'static-cdn.jtvnw.net',
      },
    ],
  },
}

export default nextConfig;
