const { version }  = require('./package.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['lucide-react'],
    publicRuntimeConfig: {
        version
    },
    images: {
        remotePatterns: [
            {
                hostname: 'firebasestorage.googleapis.com',
                protocol: 'https',
                port: '',
                pathname: '**'
            },
            {
                hostname: 'img.clerk.com',
                protocol: 'https',
                port: '',
                pathname: '**'
            },
            {
                protocol: 'https',
                port: '',
                hostname: 'storage.cloud.google.com',
                pathname: '**',
            },
        ]
    }
}

module.exports = nextConfig
