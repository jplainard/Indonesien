/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour App Router (pas d'i18n legacy)
  experimental: {
    // Optimisations pour le développement
  },
  
  // Configuration pour production (standalone pour Docker, export pour Vercel)
  output: process.env.VERCEL ? undefined : 'standalone',
  
  // Configuration pour éviter les problèmes de permissions et de cache
  typescript: {
    // Ignorer les erreurs TypeScript en production si nécessaire
    ignoreBuildErrors: false,
  },
  
  eslint: {
    // Ignorer les erreurs ESLint en production si nécessaire
    ignoreDuringBuilds: false,
  },
  
  // Configuration du cache pour éviter les corruptions
  onDemandEntries: {
    // Période d'expiration des pages en millisecondes
    maxInactiveAge: 25 * 1000,
    // Nombre de pages à garder simultanément
    pagesBufferLength: 2,
  },
  
  // Configuration pour WSL et développement local
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Configuration pour éviter les problèmes de permissions en développement
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
    }
    
    // Ignore le module 'canvas' pour pdfjs-dist car on n'en a pas besoin pour l'extraction de texte
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };
    
    return config;
  },
  
  // Configuration pour éviter les problèmes de build
  distDir: '.next',
  cleanDistDir: true,
  
  // ...autres options Next.js
};

module.exports = nextConfig;
