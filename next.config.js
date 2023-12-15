/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'staging.imaginarycloud.com',
        port: '',
        pathname: '/blog/content/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
