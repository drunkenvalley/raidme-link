/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: [
            ".storybook",
            "components",
            "interfaces",
            "pages",
            "stories",
            "utils"
        ]
    },
    images: {
        domains: [
            "clips-media-assets2.twitch.tv",
            "static-cdn.jtvnw.net"
        ]
    },
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
