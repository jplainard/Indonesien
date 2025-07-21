# Checklist Variables d'Environnement Vercel

## ✅ Variables OBLIGATOIRES configurées :

- [ ] **DATABASE_URL** - Connection string PostgreSQL de Neon
- [ ] **NEXTAUTH_SECRET** - Secret généré : `bwspTZbPI2niWi1CpHiQtw0RJMph+nszhnWE6xMEuls=`
- [ ] **NEXTAUTH_URL** - URL production : `https://indonesien.vercel.app`
- [ ] **NEXTAUTH_URL** - URL preview : `https://indonesien-6umumygz8-antoines-projects-13eef197.vercel.app`

## 🔧 Variables OPTIONNELLES :

- [ ] **SMTP_HOST** - `smtp.gmail.com`
- [ ] **SMTP_PORT** - `587`
- [ ] **SMTP_USER** - Votre email Gmail
- [ ] **SMTP_PASS** - Mot de passe d'application Gmail
- [ ] **GOOGLE_TRANSLATE_API_KEY** - Clé API Google Translate
- [ ] **OPENAI_API_KEY** - Clé API OpenAI
- [ ] **STRIPE_PUBLIC_KEY** - Clé publique Stripe
- [ ] **STRIPE_SECRET_KEY** - Clé secrète Stripe

## 📋 Comment ajouter une variable sur Vercel :

1. Aller sur https://vercel.com/dashboard
2. Cliquer sur votre projet "indonesien"
3. Aller dans Settings > Environment Variables
4. Cliquer "Add New"
5. Remplir Name et Value
6. Sélectionner les environnements (Production, Preview, Development)
7. Cliquer "Save"

## 🚀 Après avoir ajouté les variables :

1. Faire un nouveau déploiement : `vercel --prod`
2. Ou redéployer depuis le dashboard Vercel
3. Tester le site
