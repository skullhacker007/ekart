/** @type {import('next').NextConfig} */
const nextConfig = {};
import withPlausibleProxy from '@vercel/plausible-proxy/nextjs'
import withBundleAnalyzer from '@next/bundle-analyzer'

const withBundle = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

export default nextConfig;
