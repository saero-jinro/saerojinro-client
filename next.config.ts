import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dyns.co.kr',
      },
      {
        protocol: 'https',
        hostname: 'saerojinro-bucket.s3.ap-northeast-2.amazonaws.com',
      }, {
        protocol: 'https',
        hostname: 'img1.kakaocdn.net',
      },
    ],
  },
};

export default nextConfig;
