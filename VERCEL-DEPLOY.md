# 🚀 Guide de Déploiement Vercel - IndoFrench

## ✅ Statut du Projet

✅ **ESLint** : Aucune erreur  
✅ **TypeScript** : Compilation réussie  
✅ **Build** : Tests passants  
✅ **Scripts** : Automatisés et testés  
✅ **Configuration** : vercel.json optimisé  

## Vue d'ensemble

Ce guide explique comment déployer l'application IndoFrench sur Vercel avec toutes les configurations nécessaires. Le projet est maintenant prêt pour le déploiement en production.

## 🎯 Déploiement Rapide

### Une seule commande
```bash
# Déploiement production complet
npm run vercel:prod

# Ou avec le script personnalisé
./vercel-deploy.sh production
```

## Prérequis

### 1. Compte Vercel
- Créer un compte sur [vercel.com](https://vercel.com)
- Connecter votre repository GitHub

### 2. CLI Vercel (automatique)
```bash
# Installation automatique via le script
npm run vercel:install

# Ou installation manuelle
npm install -g vercel
```

### 3. Base de données
Configurez une base de données PostgreSQL compatible avec Vercel :
- **Recommandé**: [Neon](https://neon.tech) - PostgreSQL sans serveur
- **Alternatives**: Supabase, PlanetScale, Railway

## Configuration Rapide

### 1. Première installation
```bash
# Cloner et installer
git clone https://github.com/jplainard/Indonesien.git
cd Indonesien
npm install

# Lier le projet à Vercel (si pas déjà fait)
npm run vercel:setup
```

### 2. Variables d'environnement
Le projet est déjà configuré avec l'ID Vercel. Copiez les variables de `.env.vercel.example` dans le dashboard Vercel :

**Dashboard > Settings > Environment Variables**

#### Variables essentielles :
```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.vercel.app"
NODE_ENV="production"
JWT_SECRET="your-jwt-secret"
```

#### Variables API (optionnelles) :
```bash
GOOGLE_TRANSLATE_API_KEY="..."
OPENAI_API_KEY="..."
HUGGINGFACE_API_KEY="..."
STRIPE_SECRET_KEY="..."
STRIPE_PUBLIC_KEY="..."
```

## Déploiement

### Méthode 1 : Script automatisé (Recommandé)
```bash
# Déploiement preview (test)
npm run vercel:deploy

# Déploiement production
npm run vercel:prod

# Ou directement
./vercel-deploy.sh preview
./vercel-deploy.sh production
```

### Méthode 2 : CLI manuelle
```bash
# Preview
vercel

# Production
vercel --prod

# Avec confirmation
vercel --prod --yes
```

### Méthode 3 : Auto-déploiement GitHub
- Connectez votre repository dans le dashboard Vercel
- Les commits sur `main` déclenchent un déploiement automatique

## Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run vercel:deploy` | Déploiement preview |
| `npm run vercel:prod` | Déploiement production |
| `npm run vercel:env` | Lister variables d'environnement |
| `npm run vercel:logs` | Voir les logs de déploiement |
| `npm run pre-deploy` | Vérifications avant déploiement |

## Résolution de Problèmes

### 1. Erreurs de build
```bash
# Tester le build localement
npm run build

# Corriger les erreurs ESLint
npm run lint --fix

# Vérifier TypeScript
npm run type-check
```

### 2. Variables d'environnement manquantes
```bash
# Lister les variables configurées
npm run vercel:env

# Vérifier dans le dashboard
https://vercel.com/dashboard
```

### 3. Erreurs de base de données
- Vérifiez que `DATABASE_URL` est correcte
- Testez la connexion avec `npx prisma db push`
- Régénérez le client Prisma : `npm run db:generate`

### 4. Timeouts de fonction
Les fonctions Vercel ont une limite de 30 secondes (configuré dans `vercel.json`).

### 5. Logs de debug
```bash
# Voir les logs en temps réel
vercel logs

# Logs d'une fonction spécifique
vercel logs --follow
```

## Configuration Avancée

### 1. Domaine personnalisé
Dans le dashboard Vercel :
1. Settings > Domains
2. Ajouter votre domaine
3. Configurer les DNS

### 2. Analytics
- Activez Vercel Analytics dans le dashboard
- Configurez `GOOGLE_ANALYTICS_ID` si nécessaire

### 3. Monitoring
- **Vercel Monitoring** : Performances et erreurs
- **Sentry** : Tracking d'erreurs avancé
- **LogTail** : Logs centralisés

## Sécurité

### 1. Variables sensibles
- Utilisez uniquement les variables d'environnement Vercel
- Ne committez jamais de secrets dans le code

### 2. CORS et headers
Configuré dans `vercel.json` :
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

## URLs de Production

Après déploiement, vos URLs seront :
- **App principale** : `https://your-domain.vercel.app`
- **API** : `https://your-domain.vercel.app/api/*`
- **Admin** : `https://your-domain.vercel.app/admin`

## Support

### Resources Vercel
- [Documentation](https://vercel.com/docs)
- [Support](https://vercel.com/support)
- [Status](https://vercel-status.com)

### Resources du projet
- [Repository](https://github.com/jplainard/Indonesien)
- [Issues](https://github.com/jplainard/Indonesien/issues)

## Commandes de maintenance

```bash
# Redémarrer l'application
vercel --prod --force

# Vérifier le statut
vercel ls

# Supprimer un déploiement
vercel rm <deployment-url>

# Rollback vers une version précédente
# (depuis le dashboard Vercel)
```

---

**✅ Prêt pour le déploiement !** 

Utilisez `./vercel-deploy.sh preview` pour votre premier test.
