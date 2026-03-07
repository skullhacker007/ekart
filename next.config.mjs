import withBundleAnalyzer from '@next/bundle-analyzer';

const withBundle = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default withBundle(nextConfig);
