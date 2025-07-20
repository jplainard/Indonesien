'use client';

import { motion } from 'framer-motion';
import { 
  Building, 
  Shield, 
  Zap, 
  HeadphonesIcon,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  Settings
} from 'lucide-react';
import MainLayout from '@/components/MainLayout';

export default function EnterprisePage() {
  const features = [
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Infrastructure dédiée, chiffrement bout-en-bout, conformité RGPD et ISO 27001",
      benefits: [
        "Serveurs dédiés isolés",
        "Chiffrement AES-256",
        "Audit de sécurité trimestriel",
        "Conformité réglementaire"
      ]
    },
    {
      icon: Zap,
      title: "Performance Garantie",
      description: "SLA 99.99%, temps de réponse optimisés, capacité scalable selon vos besoins",
      benefits: [
        "SLA 99.99% garanti",
        "Réponse < 100ms",
        "Scalabilité automatique",
        "Cache géographique"
      ]
    },
    {
      icon: HeadphonesIcon,
      title: "Support Prioritaire",
      description: "Équipe dédiée, support 24/7, account manager personnel, formation incluse",
      benefits: [
        "Support 24h/24 7j/7",
        "Account manager dédié",
        "Formation personnalisée",
        "Maintenance proactive"
      ]
    },
    {
      icon: Settings,
      title: "Intégration Sur-Mesure",
      description: "API personnalisée, connecteurs spécifiques, workflow adapté à vos processus",
      benefits: [
        "API personnalisée",
        "Connecteurs métier",
        "Workflow sur-mesure",
        "Migration assistée"
      ]
    }
  ];

  const useCases = [
    {
      industry: "Services Financiers",
      icon: "🏦",
      description: "Traduction de documents financiers, rapports réglementaires et communications client",
      metrics: {
        accuracy: "99.8%",
        volume: "500K docs/mois",
        compliance: "SOX, GDPR"
      },
      testimonial: {
        text: "IndoFrench a transformé notre capacité à servir nos clients indonésiens avec des traductions financières précises et conformes.",
        author: "Marie Dubois",
        role: "Directrice Conformité",
        company: "BankCorp Europe"
      }
    },
    {
      industry: "E-commerce",
      icon: "🛒",
      description: "Localisation de catalogues produits, descriptions, avis clients et contenus marketing",
      metrics: {
        accuracy: "99.5%",
        volume: "2M produits",
        growth: "+45% ventes"
      },
      testimonial: {
        text: "Grâce à IndoFrench, nous avons pu localiser notre catalogue complet en 3 semaines au lieu de 6 mois.",
        author: "Ahmad Suryanto",
        role: "VP International",
        company: "ShopGlobal"
      }
    },
    {
      industry: "Secteur Légal",
      icon: "⚖️",
      description: "Traduction de contrats, actes juridiques, brevets et documentation légale",
      metrics: {
        accuracy: "99.9%",
        certified: "100%",
        turnaround: "24h"
      },
      testimonial: {
        text: "La précision juridique d&apos;IndoFrench est exceptionnelle. Nos traductions sont systématiquement validées par nos juristes.",
        author: "Sophie Martin",
        role: "Associée Senior",
        company: "Cabinet Juridique International"
      }
    }
  ];

  const plans = [
    {
      name: "Business",
      price: "€2,499",
      period: "/mois",
      description: "Pour les entreprises en croissance",
      features: [
        "500 000 mots/mois inclus",
        "API illimitée",
        "Support business",
        "SLA 99.5%",
        "Intégrations standards",
        "Rapports mensuels"
      ],
      cta: "Commencer l&apos;essai"
    },
    {
      name: "Enterprise",
      price: "Sur devis",
      period: "",
      description: "Solution complète sur-mesure",
      features: [
        "Volume illimité",
        "Infrastructure dédiée",
        "Support 24/7 dédié",
        "SLA 99.99%",
        "Intégrations personnalisées",
        "Account manager",
        "Formation équipe",
        "Migration assistée"
      ],
      cta: "Demander un devis",
      popular: true
    },
    {
      name: "Global",
      price: "€9,999",
      period: "/mois",
      description: "Pour les multinationales",
      features: [
        "Volume illimité",
        "Multi-régions",
        "Support premium",
        "SLA 99.99%",
        "White labeling",
        "API privée",
        "Conformité avancée"
      ],
      cta: "Nous contacter"
    }
  ];

  const integrations = [
    { name: "Microsoft Office 365", logo: "📄" },
    { name: "Salesforce", logo: "☁️" },
    { name: "SAP", logo: "🔧" },
    { name: "Adobe Creative Suite", logo: "🎨" },
    { name: "Slack", logo: "💬" },
    { name: "Zendesk", logo: "🎧" },
    { name: "HubSpot", logo: "📈" },
    { name: "Jira", logo: "🔗" }
  ];

  const stats = [
    { number: "500+", label: "Entreprises clientes" },
    { number: "50M+", label: "Mots traduits/mois" },
    { number: "99.99%", label: "Uptime garanti" },
    { number: "24h", label: "Support disponible" }
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
                  <Building className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Solutions Entreprise IndoFrench
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transformez votre communication internationale avec nos solutions 
                de traduction d&apos;entreprise. Sécurité, performance et support dédié 
                pour vos équipes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Demander une démo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
                <motion.button
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Planifier un appel
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
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
                Fonctionnalités Enterprise
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Des solutions robustes conçues pour répondre aux exigences 
                les plus strictes des grandes entreprises.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        <ul className="space-y-2">
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-gray-600 text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Cas d&apos;Usage par Secteur
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez comment les entreprises de différents secteurs 
                utilisent IndoFrench pour leurs besoins de traduction.
              </p>
            </motion.div>

            <div className="space-y-12">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-3xl">{useCase.icon}</span>
                        <h3 className="text-2xl font-bold text-gray-900">{useCase.industry}</h3>
                      </div>
                      <p className="text-gray-600 mb-6">{useCase.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {Object.entries(useCase.metrics).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-blue-600">{value}</div>
                            <div className="text-xs text-gray-500 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <blockquote className="text-gray-800 italic mb-4">
                            &quot;{useCase.testimonial.text}&quot;
                          </blockquote>
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900">{useCase.testimonial.author}</div>
                            <div className="text-gray-600">{useCase.testimonial.role}</div>
                            <div className="text-gray-500">{useCase.testimonial.company}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
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
                Intégrations Natives
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Connectez IndoFrench à vos outils existants pour un workflow fluide.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {integrations.map((integration, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl mb-3">{integration.logo}</div>
                  <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
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
                Plans Enterprise
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Des solutions flexibles adaptées à vos besoins et votre budget.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg p-8 relative ${
                    plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Recommandé
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.cta}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
                Prêt à Transformer Votre Communication ?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Nos experts sont à votre disposition pour analyser vos besoins 
                et concevoir une solution sur-mesure pour votre entreprise.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold mb-2">Appelez-nous</h4>
                  <p className="text-blue-200">+33 1 23 45 67 89</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold mb-2">Écrivez-nous</h4>
                  <p className="text-blue-200">enterprise@indofrench.com</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold mb-2">Planifiez un rendez-vous</h4>
                  <p className="text-blue-200">Consultation gratuite</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Demander une démo personnalisée
                </motion.button>
                <motion.button
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Télécharger la brochure
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
