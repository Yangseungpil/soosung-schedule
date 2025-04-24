/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    css: {
      loader: 'postcss', // lightningcss 대신 postcss 사용
    },
  },
};

module.exports = nextConfig;
