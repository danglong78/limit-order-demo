const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.pexels.com',
      'storage-realnextate.sgp1.digitaloceanspaces.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    outputStandalone: true,
    scrollRestoration: true,
  },
  i18n,
};
