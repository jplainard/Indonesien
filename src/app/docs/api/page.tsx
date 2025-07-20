'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  BookOpen, 
  Zap, 
  Shield, 
  Copy,
  Play,
  ChevronRight,
  ChevronDown,
  Check,
  Key,
  Globe,
  Clock,
  AlertCircle
} from 'lucide-react';
import MainLayout from '@/components/MainLayout';

export default function APIDocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('translate');
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);
  const [apiKey, setApiKey] = useState('your-api-key-here');

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Ajouter une notification de succès
  };

  const endpoints = [
    {
      id: 'translate',
      name: 'Traduire du texte',
      method: 'POST',
      path: '/api/v1/translate',
      description: 'Traduit un texte d\'une langue source vers une langue cible'
    },
    {
      id: 'detect',
      name: 'Détecter la langue',
      method: 'POST', 
      path: '/api/v1/detect',
      description: 'Détecte automatiquement la langue d\'un texte'
    },
    {
      id: 'languages',
      name: 'Langues supportées',
      method: 'GET',
      path: '/api/v1/languages',
      description: 'Récupère la liste des langues supportées'
    },
    {
      id: 'document',
      name: 'Traduire un document',
      method: 'POST',
      path: '/api/v1/document/translate',
      description: 'Traduit un document (PDF, DOCX, etc.)'
    },
    {
      id: 'usage',
      name: 'Utilisation API',
      method: 'GET',
      path: '/api/v1/usage',
      description: 'Consulte les statistiques d\'utilisation de votre API'
    }
  ];

  const codeExamples = {
    translate: {
      curl: `curl -X POST "https://api.indofrench.com/v1/translate" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Bonjour, comment allez-vous ?",
    "source_lang": "fr",
    "target_lang": "id",
    "quality": "high"
  }'`,
      javascript: `const response = await fetch('https://api.indofrench.com/v1/translate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'Bonjour, comment allez-vous ?',
    source_lang: 'fr',
    target_lang: 'id',
    quality: 'high'
  })
});

const data = await response.json();
console.log(data.translated_text);`,
      python: `import requests

url = "https://api.indofrench.com/v1/translate"
headers = {
    "Authorization": f"Bearer ${apiKey}",
    "Content-Type": "application/json"
}
data = {
    "text": "Bonjour, comment allez-vous ?",
    "source_lang": "fr", 
    "target_lang": "id",
    "quality": "high"
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result["translated_text"])`
    }
  };

  const responseExample = `{
  "success": true,
  "translated_text": "Selamat pagi, bagaimana kabar Anda?",
  "confidence": 0.98,
  "source_lang": "fr",
  "target_lang": "id",
  "word_count": 5,
  "usage": {
    "characters_used": 32,
    "characters_remaining": 9968
  },
  "metadata": {
    "translation_time": 0.145,
    "model_version": "3.0",
    "quality_score": 0.96
  }
}`;

  const quickStart = [
    {
      step: 1,
      title: "Créer un compte",
      description: "Inscrivez-vous sur IndoFrench pour obtenir vos clés API",
      action: "S'inscrire gratuitement"
    },
    {
      step: 2,
      title: "Obtenir votre clé API",
      description: "Générez votre clé API dans votre espace développeur",
      action: "Générer une clé"
    },
    {
      step: 3,
      title: "Premier appel API",
      description: "Testez votre première traduction avec notre API",
      action: "Tester maintenant"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Traduction instantanée",
      description: "Réponses en moins de 200ms en moyenne"
    },
    {
      icon: Shield,
      title: "Sécurité maximale",
      description: "Chiffrement bout-en-bout et suppression automatique"
    },
    {
      icon: Globe,
      title: "Support 24/7",
      description: "Support technique disponible dans toutes les langues"
    },
    {
      icon: Clock,
      title: "99.9% d'uptime",
      description: "Infrastructure redondante et haute disponibilité"
    }
  ];

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
                  <Code className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Documentation API IndoFrench
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Intégrez facilement nos services de traduction dans vos applications. 
                API REST simple, rapide et fiable pour tous vos besoins de traduction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="#getting-started"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Commencer maintenant
                </motion.a>
                <motion.a
                  href="#endpoints"
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explorer l'API
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section id="getting-started" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Démarrage Rapide
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Commencez à utiliser notre API en 3 étapes simples
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {quickStart.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 text-center relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    {item.action}
                  </button>
                  {index < quickStart.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ChevronRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* API Explorer */}
        <section id="endpoints" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Explorer l'API
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Testez nos endpoints directement depuis cette page
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Endpoints List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Endpoints</h3>
                  <div className="space-y-2">
                    {endpoints.map((endpoint) => (
                      <button
                        key={endpoint.id}
                        onClick={() => setSelectedEndpoint(endpoint.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedEndpoint === endpoint.id
                            ? 'bg-blue-50 border border-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{endpoint.name}</div>
                            <div className="text-sm text-gray-500">{endpoint.path}</div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {endpoint.method}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Code Examples */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900">Exemple de code</h3>
                    <div className="flex items-center space-x-2">
                      <Key className="w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                        placeholder="Votre clé API"
                      />
                    </div>
                  </div>

                  {/* Code Tabs */}
                  <div className="border-b border-gray-200 mb-4">
                    <div className="flex space-x-4">
                      {['curl', 'javascript', 'python'].map((lang) => (
                        <button
                          key={lang}
                          className="pb-2 px-1 border-b-2 border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 font-medium text-sm"
                        >
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Code Block */}
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{codeExamples.translate?.curl}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(codeExamples.translate?.curl || '')}
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Try It Button */}
                  <div className="mt-4">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center">
                      <Play className="w-4 h-4 mr-2" />
                      Tester cet endpoint
                    </button>
                  </div>
                </div>

                {/* Response Example */}
                <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                  <h3 className="font-bold text-gray-900 mb-4">Réponse exemple</h3>
                  <div className="relative">
                    <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{responseExample}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(responseExample)}
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rate Limits */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-yellow-800 mb-2">Limites de taux</h3>
                  <div className="text-yellow-700 space-y-2">
                    <p><strong>Plan Gratuit :</strong> 1 000 requêtes/mois, 10 requêtes/minute</p>
                    <p><strong>Plan Pro :</strong> 100 000 requêtes/mois, 100 requêtes/minute</p>
                    <p><strong>Plan Enterprise :</strong> Illimité, 1 000 requêtes/minute</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Support */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-4">
                Besoin d'Aide ?
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Notre équipe de développeurs est là pour vous aider à intégrer 
                notre API. Support technique disponible 24h/24.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="mailto:api-support@indofrench.com"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contacter le Support
                </motion.a>
                <motion.a
                  href="/help"
                  className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Centre d'Aide
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
