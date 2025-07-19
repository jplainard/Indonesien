/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour App Router (pas d'i18n legacy)
  experimental: {
    // Optimisations pour le développement
  },
  // Configuration pour Docker et production
  output: 'standalone',
  // ...autres options Next.js
};

module.exports = nextConfig;
