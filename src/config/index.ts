// Configuration centralisée pour IndoFrench
export const config = {
  // Application
  app: {
    name: 'IndoFrench',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
    environment: process.env.NODE_ENV || 'development',
  },

  // Langues supportées
  languages: {
    default: process.env.DEFAULT_LOCALE || 'fr',
    supported: (process.env.SUPPORTED_LOCALES || 'fr,id,en').split(','),
    pairs: [
      { from: 'fr', to: 'id', name: 'Français → Indonésien' },
      { from: 'id', to: 'fr', name: 'Indonésien → Français' },
      { from: 'en', to: 'id', name: 'Anglais → Indonésien' },
      { from: 'en', to: 'fr', name: 'Anglais → Français' },
    ]
  },

  // Base de données
  database: {
    url: process.env.DATABASE_URL,
  },

  // Authentification
  auth: {
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    }
  },

  // Services externes
  services: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4',
    },
    google: {
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
      credentials: process.env.GOOGLE_CLOUD_CREDENTIALS,
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }
  },

  // Limites et quotas
  limits: {
    rateLimit: {
      max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
      window: parseInt(process.env.RATE_LIMIT_WINDOW || '60000'),
    },
    translation: {
      maxLength: 5000,
      dailyLimit: {
        free: 10,
        premium: 100,
        unlimited: -1,
      }
    }
  }
}

export default config
