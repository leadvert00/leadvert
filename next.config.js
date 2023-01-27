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
    MAGIC_API_KEY: 'pk_live_8F0B453B57256DEF',
    MAGIC_SECRET_KEY: 'sk_live_06F211ACB88C8C0E'
  },
}

module.exports = nextConfig
