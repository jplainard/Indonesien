"use client";

import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  Search, 
  MessageCircle,
  Book,
  Video,
  Download,
  ExternalLink,
  ChevronRight,
  Clock,
  Users,
  Zap,
  Shield
} from 'lucide-react';
import { useState } from 'react';
import MainLayout from '../../components/MainLayout';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Toutes les catégories', icon: Book },
    { id: 'getting-started', label: 'Premiers pas', icon: Zap },
    { id: 'translation', label: 'Traduction', icon: MessageCircle },
    { id: 'account', label: 'Compte', icon: Users },
    { id: 'billing', label: 'Facturation', icon: Shield },
    { id: 'technical', label: 'Technique', icon: HelpCircle }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'Comment créer mon premier projet de traduction ?',
      answer: 'Pour créer votre premier projet, connectez-vous à votre compte, cliquez sur "Nouveau projet" depuis le dashboard, uploadez votre document et sélectionnez les langues source et cible. Notre système analysera automatiquement votre document et vous proposera un devis.'
    },
    {
      category: 'translation',
      question: 'Quels formats de fichiers sont supportés ?',
      answer: 'Nous supportons une large gamme de formats : PDF, Word (.doc, .docx), Excel (.xls, .xlsx), PowerPoint (.ppt, .pptx), texte brut (.txt), RTF, et bien d\'autres. Pour les formats spéciaux, contactez notre équipe.'
    },
    {
      category: 'translation',
      question: 'Combien de temps prend une traduction ?',
      answer: 'Le délai dépend de la longueur et de la complexité du document. En général : documents courts (1-5 pages) : 24-48h, documents moyens (6-20 pages) : 2-5 jours, documents longs : sur devis. Nous proposons aussi des services express.'
    },
    {
      category: 'account',
      question: 'Comment modifier mes informations personnelles ?',
      answer: 'Rendez-vous dans votre profil utilisateur via le menu en haut à droite, cliquez sur "Modifier le profil", actualisez vos informations et sauvegardez. Certaines modifications peuvent nécessiter une vérification.'
    },
    {
      category: 'billing',
      question: 'Comment fonctionne la facturation ?',
      answer: 'La facturation se base sur le nombre de mots ou de pages selon votre plan. Les factures sont générées automatiquement et envoyées par email. Vous pouvez consulter votre historique de facturation dans votre tableau de bord.'
    },
    {
      category: 'technical',
      question: 'Que faire si j\'ai des problèmes techniques ?',
      answer: 'Pour les problèmes techniques, consultez d\'abord cette section d\'aide. Si le problème persiste, contactez notre support technique à support@indofrench.com ou utilisez le chat en direct (disponible 9h-18h).'
    },
    {
      category: 'translation',
      question: 'La confidentialité de mes documents est-elle garantie ?',
      answer: 'Absolument. Tous nos traducteurs signent des accords de confidentialité. Vos documents sont stockés de manière sécurisée et supprimés après la période de rétention. Nous sommes conformes RGPD.'
    },
    {
      category: 'account',
      question: 'Comment résilier mon abonnement ?',
      answer: 'Vous pouvez annuler votre abonnement à tout moment depuis votre espace client. L\'annulation prend effet à la fin de votre période de facturation en cours. Aucuns frais d\'annulation ne sont appliqués.'
    }
  ];

  const quickLinks = [
    {
      title: 'Guide de démarrage rapide',
      description: 'Apprenez les bases en 5 minutes',
      icon: Zap,
      type: 'guide',
      url: '/docs/quick-start'
    },
    {
      title: 'Documentation API',
      description: 'Intégrez nos services dans vos applications',
      icon: Book,
      type: 'documentation',
      url: '/docs/api'
    },
    {
      title: 'Tutoriels vidéo',
      description: 'Guides visuels pour toutes les fonctionnalités',
      icon: Video,
      type: 'video',
      url: '/tutorials'
    },
    {
      title: 'Ressources téléchargeables',
      description: 'Modèles, guides PDF et outils',
      icon: Download,
      type: 'download',
      url: '/resources'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (searchQuery === '' || 
     faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Centre d'aide
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Trouvez rapidement les réponses à vos questions. 
                Notre équipe est là pour vous accompagner dans votre utilisation d'IndoFrench.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher dans l'aide..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl font-bold text-center text-gray-800 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Ressources populaires
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={index}
                    href={link.url}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {link.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {link.description}
                    </p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      En savoir plus
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Questions Fréquentes
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Parcourez nos réponses aux questions les plus courantes ou utilisez la recherche ci-dessus.
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* FAQ List */}
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                      <h3 className="text-lg font-semibold text-gray-800 pr-4">
                        {faq.question}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-gray-500">
                  Essayez avec d'autres mots-clés ou contactez notre support.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <MessageCircle className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Vous ne trouvez pas votre réponse ?
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Notre équipe support est disponible pour vous aider. 
                Nous répondons généralement sous 2 heures.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <motion.a
                  href="/contact"
                  className="bg-white text-blue-600 px-6 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contacter le support
                </motion.a>
                <motion.a
                  href="mailto:support@indofrench.com"
                  className="border-2 border-white text-white px-6 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Email direct
                </motion.a>
              </div>

              <div className="mt-8 flex items-center justify-center space-x-6 text-blue-100">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">Réponse sous 2h</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">Support expert</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
