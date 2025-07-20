"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Star, 
  Crown,
  Zap,
  Shield,
  Clock,
  Users,
  FileText,
  Headphones,
  Globe
} from 'lucide-react';
import MainLayout from '../../components/MainLayout';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Starter",
      description: "Parfait pour les particuliers et petites entreprises",
      icon: FileText,
      price: {
        monthly: 29,
        yearly: 290
      },
      features: [
        "Jusqu'à 10 pages par mois",
        "Traduction FR ↔ ID uniquement",
        "Délai standard: 48h",
        "Support par email",
        "Révision de base",
        "Formats: PDF, Word, TXT"
      ],
      limitations: [
        "Pas de traduction technique",
        "Pas de service urgent"
      ],
      popular: false,
      cta: "Commencer gratuitement"
    },
    {
      name: "Professional",
      description: "Idéal pour les entreprises en croissance",
      icon: Crown,
      price: {
        monthly: 99,
        yearly: 990
      },
      features: [
        "Jusqu'à 50 pages par mois",
        "Toutes paires de langues",
        "Délai prioritaire: 24h",
        "Support téléphonique",
        "Double révision",
        "Tous formats supportés",
        "Traduction technique",
        "Glossaire personnalisé",
        "Chef de projet dédié"
      ],
      limitations: [],
      popular: true,
      cta: "Démarrer l'essai gratuit"
    },
    {
      name: "Enterprise",
      description: "Solution sur-mesure pour les grandes entreprises",
      icon: Zap,
      price: {
        monthly: 299,
        yearly: 2990
      },
      features: [
        "Volume illimité",
        "Toutes paires de langues",
        "Délai express: 12h",
        "Support 24/7 prioritaire",
        "Révision premium",
        "API d'intégration",
        "Traduction spécialisée",
        "Équipe dédiée",
        "SLA garantie 99.9%",
        "Facturation personnalisée",
        "Formation de votre équipe"
      ],
      limitations: [],
      popular: false,
      cta: "Contactez-nous"
    }
  ];

  const additionalServices = [
    {
      name: "Traduction urgente",
      description: "Livraison en moins de 12h",
      price: "+50%",
      icon: Clock
    },
    {
      name: "Interprétation",
      description: "Service d'interprétation en ligne ou sur site",
      price: "150€/h",
      icon: Headphones
    },
    {
      name: "Localisation",
      description: "Adaptation culturelle complète",
      price: "Sur devis",
      icon: Globe
    },
    {
      name: "Révision tierce",
      description: "Révision par un second traducteur",
      price: "+30%",
      icon: Shield
    }
  ];

  const faq = [
    {
      question: "Y a-t-il un engagement de durée ?",
      answer: "Non, tous nos abonnements sont sans engagement. Vous pouvez annuler à tout moment."
    },
    {
      question: "Que se passe-t-il si je dépasse mon quota ?",
      answer: "Vous serez facturé au tarif unitaire de votre plan. Nous vous préviendrons avant que cela arrive."
    },
    {
      question: "Proposez-vous un essai gratuit ?",
      answer: "Oui, tous nos plans offrent un essai gratuit de 14 jours avec accès complet aux fonctionnalités."
    },
    {
      question: "Les tarifs incluent-ils la TVA ?",
      answer: "Les tarifs affichés sont HT. La TVA sera ajoutée selon votre localisation."
    },
    {
      question: "Peut-on changer de plan en cours d'abonnement ?",
      answer: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements sont proratisés."
    }
  ];

  const calculateSavings = (monthlyPrice: number) => {
    const yearlyTotal = monthlyPrice * 12;
    const actualYearlyPrice = monthlyPrice * 10; // 2 mois gratuits
    return Math.round((yearlyTotal - actualYearlyPrice) / yearlyTotal * 100);
  };

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
                  Tarifs Transparents
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Choisissez la formule qui correspond à vos besoins. 
                Tous nos plans incluent une garantie de qualité et un support professionnel.
              </motion.p>

              {/* Billing Toggle */}
              <motion.div
                className="flex items-center justify-center bg-white rounded-full p-1 shadow-lg max-w-xs mx-auto mb-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <button
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    billingPeriod === 'monthly'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setBillingPeriod('monthly')}
                >
                  Mensuel
                </button>
                <button
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all relative ${
                    billingPeriod === 'yearly'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setBillingPeriod('yearly')}
                >
                  Annuel
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    -17%
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                const price = plan.price[billingPeriod];
                const monthlyPrice = plan.price.monthly;
                
                return (
                  <motion.div
                    key={index}
                    className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all ${
                      plan.popular 
                        ? 'ring-2 ring-blue-500 transform scale-105' 
                        : 'hover:scale-105'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          Plus populaire
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {plan.description}
                      </p>
                      
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-800">
                          {price}€
                        </span>
                        <span className="text-gray-600">
                          /{billingPeriod === 'monthly' ? 'mois' : 'an'}
                        </span>
                        {billingPeriod === 'yearly' && (
                          <div className="text-green-600 text-sm font-medium">
                            Économisez {calculateSavings(monthlyPrice)}%
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-start opacity-60">
                          <span className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-center">×</span>
                          <span className="text-gray-500 line-through">{limitation}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      className={`w-full py-4 rounded-lg font-semibold transition-all ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {plan.cta}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Services Complémentaires
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Enrichissez votre abonnement avec nos services spécialisés.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {service.description}
                    </p>
                    <div className="text-blue-600 font-semibold">
                      {service.price}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Questions Fréquentes
              </h2>
              <p className="text-gray-600">
                Tout ce que vous devez savoir sur nos tarifs et services.
              </p>
            </motion.div>

            <div className="space-y-6">
              {faq.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {item.question}
                  </h3>
                  <p className="text-gray-600">
                    {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Prêt à commencer ?
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Démarrez votre essai gratuit dès aujourd'hui. 
                Aucune carte bancaire requise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/auth"
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Essai gratuit 14 jours
                </motion.a>
                <motion.a
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contactez-nous
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
