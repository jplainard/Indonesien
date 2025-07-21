# 🚀 Déploiement sur Vercel

## Prérequis

1. **Compte Vercel** : [vercel.com](https://vercel.com)
2. **Base de données PostgreSQL** en ligne (recommandé : [Neon](https://neon.tech), [Supabase](https://supabase.com), ou [PlanetScale](https://planetscale.com))
3. **Vercel CLI** : `npm i -g vercel`

## Étape 1 : Préparation

### 1.1 Installation de la CLI Vercel
```bash
npm i -g vercel
vercel login
```

### 1.2 Configuration de la base de données
Créez une base de données PostgreSQL en ligne et notez l'URL de connexion.

## Étape 2 : Déploiement

### 2.1 Premier déploiement
```bash
# Depuis le répertoire du projet
./deploy-vercel.sh
```

### 2.2 Configuration des variables d'environnement
Dans le dashboard Vercel (vercel.com/dashboard) :
1. Allez dans votre projet
2. Cliquez sur "Settings" > "Environment Variables"
3. Ajoutez ces variables **OBLIGATOIRES** :

```env
DATABASE_URL=postgresql://user:pass@host:port/db
NEXTAUTH_SECRET=un-secret-tres-long-et-complexe
NEXTAUTH_URL=https://votre-domaine.vercel.app
```

### 2.3 Variables optionnelles (selon vos besoins)
```env
# API de traduction
GOOGLE_TRANSLATE_API_KEY=votre-cle-google
OPENAI_API_KEY=votre-cle-openai
HUGGINGFACE_API_KEY=votre-cle-huggingface

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app

# Paiements
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

## Étape 3 : Migration de la base de données

Après avoir configuré DATABASE_URL :

```bash
# Exécuter les migrations Prisma
npx prisma db push

# Initialiser les rôles utilisateur
npx prisma db seed
```

## Étape 4 : Test et validation

1. **Test de l'application** : Visitez votre URL Vercel
2. **Test de l'authentification** : Créez un compte
3. **Test de traduction** : Uploadez un document

## Étape 5 : Domaine personnalisé (optionnel)

Dans Vercel Dashboard > Settings > Domains :
1. Ajoutez votre domaine personnalisé
2. Configurez les DNS selon les instructions Vercel
3. Mettez à jour `NEXTAUTH_URL` avec votre nouveau domaine

## Déploiement en production

```bash
./deploy-vercel.sh --production
```

## Commandes utiles

```bash
# Voir les logs
vercel logs

# Voir les déploiements
vercel ls

# Rollback vers un déploiement précédent
vercel rollback [deployment-url]

# Variables d'environnement
vercel env ls
vercel env add
vercel env rm
```

## Troubleshooting

### Erreur de build
- Vérifiez que toutes les dépendances sont dans `package.json`
- Assurez-vous que TypeScript compile sans erreur

### Erreur de base de données
- Vérifiez que `DATABASE_URL` est correctement configurée
- Assurez-vous que la base de données est accessible depuis Internet

### Erreur d'authentification
- Vérifiez `NEXTAUTH_SECRET` et `NEXTAUTH_URL`
- Assurez-vous que l'URL correspond à votre domaine Vercel

## Monitoring

Vercel offre :
- **Analytics** : Trafic et performance
- **Speed Insights** : Métriques Core Web Vitals
- **Log streaming** : Logs en temps réel

## Coûts

- **Hobby Plan** : Gratuit pour les projets personnels
- **Pro Plan** : $20/mois pour usage commercial
- **Enterprise** : Prix sur demande

## Support

- [Documentation Vercel](https://vercel.com/docs)
- [Discord Vercel](https://vercel.com/discord)
- [GitHub Discussions](https://github.com/vercel/vercel/discussions)
