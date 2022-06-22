/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      //{
      //  source: '/to',
      //  destination: '/',
      //  permanent: true,
      //},
    ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig
