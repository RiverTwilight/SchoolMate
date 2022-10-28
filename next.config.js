/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
        imageSizes: [320, 480, 820, 1200, 1600],
        domains: ['i.loli.net'],
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
