/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    css: {
      // lightningcss 비활성화
      loader: 'postcss'
    }
  }
};

module.exports = nextConfig;
