/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    CONTENTFUL_SPACE_ID: "km0ikbrty09v",
    CONTENTFUL_ACCESS_TOKEN: "zJJrZWGZMPwGR2h5J3ncEh-cz0YdZkCzaogiX0cRm48"

  },
}

module.exports = nextConfig
