'use client';

import { motion } from 'framer-motion';
import { 
  Book, 
  FileText, 
  Play, 
  Code, 
  Settings, 
  HelpCircle,
  Search,
  Download,
  Star,
  ArrowRight,
  Clock,
  User,
  Lightbulb,
  MessageCircle
} from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import { useState } from 'react';

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tout', icon: Book },
    { id: 'quickstart', name: 'Démarrage rapide', icon: Play },
    { id: 'api', name: 'API', icon: Code },
    { id: 'guides', name: 'Guides', icon: FileText },
    { id: 'integration', name: 'Intégrations', icon: Settings },
    { id: 'faq', name: 'FAQ', icon: HelpCircle }
  ];

  const popularDocs = [
    {
      title: "Guide de démarrage rapide",
      description: "Commencez à utiliser IndoFrench en moins de 5 minutes",
      category: "quickstart",
      readTime: "5 min",
      popularity: 5,
      updated: "Hier"
    },
    {
      title: "Référence API complète",
      description: "Documentation détaillée de toutes les endpoints API",
      category: "api",
      readTime: "15 min",
      popularity: 5,
      updated: "Il y a 2 jours"
    },
    {
      title: "Intégration avec React",
      description: "Guide pas-à-pas pour intégrer IndoFrench dans votre app React",
      category: "integration",
      readTime: "12 min",
      popularity: 4,
      updated: "Il y a 1 semaine"
    },
    {
      title: "Gestion des erreurs",
      description: "Comment gérer les erreurs et exceptions dans vos intégrations",
      category: "guides",
      readTime: "8 min",
      popularity: 4,
      updated: "Il y a 3 jours"
    }
  ];

  const documentationSections = [
    {
      title: "Démarrage Rapide",
      icon: Play,
      color: "from-green-500 to-emerald-600",
      description: "Commencez immédiatement avec IndoFrench",
      docs: [
        {
          title: "Première traduction",
          description: "Votre première traduction en 30 secondes",
          time: "2 min"
        },
        {
          title: "Configuration de compte",
          description: "Paramétrez votre compte et vos préférences",
          time: "5 min"
        },
        {
          title: "Obtenir vos clés API",
          description: "Générez et gérez vos clés d&apos;authentification",
          time: "3 min"
        },
        {
          title: "Limites et quotas",
          description: "Comprenez les limites de votre plan",
          time: "4 min"
        }
      ]
    },
    {
      title: "Guides Développeur",
      icon: Code,
      color: "from-blue-500 to-cyan-600",
      description: "Intégrez IndoFrench dans vos applications",
      docs: [
        {
          title: "Architecture API REST",
          description: "Comprendre la structure de notre API",
          time: "10 min"
        },
        {
          title: "Authentification et sécurité",
          description: "Méthodes d&apos;auth et bonnes pratiques",
          time: "8 min"
        },
        {
          title: "Webhooks et callbacks",
          description: "Recevoir des notifications en temps réel",
          time: "12 min"
        },
        {
          title: "SDKs et bibliothèques",
          description: "Utilisez nos SDK officiels",
          time: "6 min"
        }
      ]
    },
    {
      title: "Intégrations",
      icon: Settings,
      color: "from-purple-500 to-pink-600",
      description: "Connectez IndoFrench à vos outils favoris",
      docs: [
        {
          title: "WordPress Plugin",
          description: "Installation et configuration du plugin",
          time: "8 min"
        },
        {
          title: "Shopify App",
          description: "Traduisez votre boutique automatiquement",
          time: "10 min"
        },
        {
          title: "Slack Bot",
          description: "Traductions instantanées dans Slack",
          time: "6 min"
        },
        {
          title: "Google Sheets Add-on",
          description: "Traduisez vos tableaux directement",
          time: "7 min"
        }
      ]
    },
    {
      title: "Tutoriels Avancés",
      icon: Lightbulb,
      color: "from-orange-500 to-red-600",
      description: "Maîtrisez les fonctionnalités avancées",
      docs: [
        {
          title: "Traduction par lots",
          description: "Optimisez pour de gros volumes",
          time: "15 min"
        },
        {
          title: "Personnalisation des modèles",
          description: "Adaptez les traductions à votre domaine",
          time: "20 min"
        },
        {
          title: "Gestion de la mémoire de traduction",
          description: "Réutilisez vos traductions précédentes",
          time: "18 min"
        },
        {
          title: "Monitoring et analytics",
          description: "Surveillez vos usages et performances",
          time: "12 min"
        }
      ]
    }
  ];

  const faqs = [
    {
      question: "Comment puis-je obtenir une clé API ?",
      answer: "Connectez-vous à votre tableau de bord, allez dans 'Paramètres' > 'API' et cliquez sur 'Générer une nouvelle clé'. Gardez-la en sécurité !"
    },
    {
      question: "Quelles sont les limites de taux de l'API ?",
      answer: "Les limites dépendent de votre plan : 1000 req/h (Gratuit), 10000 req/h (Pro), illimité (Enterprise). Consultez la documentation API pour plus de détails."
    },
    {
      question: "Puis-je traduire des fichiers PDF ?",
      answer: "Oui ! Notre API supporte les PDF, Word, Excel, PowerPoint et de nombreux autres formats. La structure et mise en forme sont préservées."
    },
    {
      question: "Comment gérer les traductions sensibles ?",
      answer: "Utilisez notre mode 'Données sensibles' qui garantit que vos textes ne sont pas stockés et sont traités dans des environnements isolés."
    },
    {
      question: "L'API supporte-t-elle la traduction en temps réel ?",
      answer: "Oui, via WebSockets pour les traductions instantanées ou via notre endpoint '/translate/stream' pour le streaming."
    }
  ];

  const codeExamples = [
    {
      title: "Traduction simple",
      language: "JavaScript",
      code: `const response = await fetch('https://api.indofrench.com/v1/translate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'Selamat pagi, apa kabar?',
    from: 'id',
    to: 'fr'
  })
});

const translation = await response.json();
console.log(translation.result); // "Bonjour, comment allez-vous ?"`,
    },
    {
      title: "Traduction par lots",
      language: "Python",
      code: `import requests

texts = [
    "Selamat datang di Indonesia",
    "Terima kasih banyak",
    "Sampai jumpa lagi"
]

response = requests.post('https://api.indofrench.com/v1/translate/batch', 
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json={
        'texts': texts,
        'from': 'id',
        'to': 'fr'
    }
)

translations = response.json()['results']
for original, translated in zip(texts, translations):
    print(f"{original} → {translated}")`,
    }
  ];

  const filteredDocs = popularDocs.filter(doc => 
    selectedCategory === 'all' || doc.category === selectedCategory
  ).filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Book className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Documentation IndoFrench
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Tout ce que vous devez savoir pour intégrer et utiliser IndoFrench. 
                Guides, API, tutoriels et exemples pratiques.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher dans la documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
                <div className="text-gray-600">Articles de doc</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-gray-600">Exemples de code</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-green-600 mb-2">20+</div>
                <div className="text-gray-600">Intégrations</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">Support dev</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Popular Documentation */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Documentation Populaire
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredDocs.map((doc, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{doc.title}</h3>
                    <div className="flex">
                      {[...Array(doc.popularity)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{doc.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{doc.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>Mis à jour {doc.updated}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Explorez la Documentation
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Trouvez rapidement ce que vous cherchez grâce à notre documentation 
                organisée par thèmes et niveaux.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {documentationSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
                      <div className="flex items-center space-x-3 mb-3">
                        <Icon className="w-8 h-8" />
                        <h3 className="text-xl font-bold">{section.title}</h3>
                      </div>
                      <p className="text-blue-100">{section.description}</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        {section.docs.map((doc, docIndex) => (
                          <div key={docIndex} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                              <p className="text-sm text-gray-600">{doc.description}</p>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{doc.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Exemples de Code
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Démarrez rapidement avec nos exemples prêts à utiliser.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {codeExamples.map((example, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between p-4 bg-gray-700">
                    <div className="flex items-center space-x-3">
                      <Code className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-semibold">{example.title}</span>
                    </div>
                    <span className="text-gray-300 text-sm">{example.language}</span>
                  </div>
                  <pre className="p-4 text-gray-300 text-sm overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Questions Fréquentes
              </h2>
              <p className="text-gray-600">
                Les réponses aux questions les plus courantes de nos développeurs.
              </p>
            </motion.div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Support CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Besoin d&apos;Aide Supplémentaire ?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Notre équipe de développeurs est là pour vous aider. 
                Contactez-nous pour un support personnalisé.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Discuter avec un expert
                </motion.button>
                <motion.button
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger les SDK
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
