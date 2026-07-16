import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  outputFileTracingRoot: path.resolve('.'),
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
