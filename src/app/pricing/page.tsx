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
  FileText,
  Headphones,
  Globe
} from 'lucide-react';
import MainLayout from '../../components/MainLayout';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Freemium",
      description: "Découvrez l'Indonésie sans engagement",
      icon: Globe,
      price: {
        monthly: 0,
        yearly: 0
      },
      features: [
        "50 pages par mois",
        "IA de traduction basique",
        "Calculateur de marché gratuit",
        "Guides d'expansion (PDF)",
        "Templates légaux de base",
        "Support communautaire"
      ],
      limitations: [
        "Pas de révision humaine",
        "Délai standard: 72h"
      ],
      popular: false,
      cta: "Commencer gratuitement",
      highlight: "🎁 NOUVEAU"
    },
    {
      name: "Starter",
      description: "Parfait pour tester le marché indonésien",
      icon: FileText,
      price: {
        monthly: 14.99,
        yearly: 149
      },
      originalPrice: {
        monthly: 29,
        yearly: 290
      },
      features: [
        "500 pages par mois",
        "IA culturelle avancée",
        "Support email prioritaire",
        "Templates sectoriels",
        "Veille marché mensuelle",
        "Formats: PDF, Word, Excel"
      ],
      limitations: [
        "Révision humaine limitée"
      ],
      popular: false,
      cta: "Démarrer l'expansion",
      discount: "-48%"
    },
    {
      name: "Professional",
      description: "Expansion sérieuse avec accompagnement",
      icon: Crown,
      price: {
        monthly: 39.99,
        yearly: 399
      },
      originalPrice: {
        monthly: 99,
        yearly: 990
      },
      features: [
        "2000 pages par mois",
        "Révision humaine native",
        "API d'intégration",
        "Account manager dédié",
        "Études de marché trimestrielles",
        "Templates légaux avancés",
        "Support téléphonique",
        "Délai prioritaire: 24h",
        "Réseau partenaires Indonésie"
      ],
      limitations: [],
      popular: true,
      cta: "Accélérer l'expansion",
      discount: "-60%"
    },
    {
      name: "Enterprise",
      description: "Solution complète d'expansion indonésienne",
      icon: Zap,
      price: {
        monthly: 149,
        yearly: 1490
      },
      originalPrice: {
        monthly: 299,
        yearly: 2990
      },
      features: [
        "Volume illimité",
        "Équipe dédiée en Indonésie",
        "Setup filiale locale",
        "Accompagnement réglementaire",
        "Due diligence partenaires",
        "Réseau business local",
        "SLA 12h garanti",
        "Support 24/7",
        "Reporting exécutif",
        "Formation équipes",
        "Success manager dédié"
      ],
      limitations: [],
      popular: false,
      cta: "Planifier l'expansion",
      discount: "-50%"
    }
  ];

  const additionalServices = [
    {
      name: "Audit Marché Indonésien",
      description: "Analyse complète de votre secteur + Opportunités",
      price: "€2,500",
      icon: Star,
      duration: "14 jours",
      includes: "250 pages rapport + présentation exécutive"
    },
    {
      name: "Setup Filiale Locale",
      description: "Création entreprise + Comptes bancaires + Licences",
      price: "€15,000",
      icon: Shield,
      duration: "3-6 mois",
      includes: "Accompagnement réglementaire complet"
    },
    {
      name: "Accompagnement Réglementaire",
      description: "Conformité, Licences, Taxes, Droit du travail",
      price: "€5,000",
      icon: Clock,
      duration: "Mensuel",
      includes: "Avocat partenaire + veille réglementaire"
    },
    {
      name: "Réseau Partenaires Business",
      description: "Introduction Distributeurs, Fournisseurs, Clients",
      price: "€8,500",
      icon: Headphones,
      duration: "3 mois",
      includes: "15 contacts qualifiés + due diligence"
    },
    {
      name: "Formation Équipe Locale",
      description: "Culture Business, Négociation, Management indonésien",
      price: "€3,500",
      icon: Globe,
      duration: "5 jours",
      includes: "Formation sur site + kit outils"
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
        <section className="py-12">
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

                    {plan.highlight && (
                      <div className="absolute -top-4 right-4">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold">
                          {plan.highlight}
                        </div>
                      </div>
                    )}

                    {plan.discount && (
                      <div className="absolute -top-4 left-4">
                        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold">
                          {plan.discount}
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
                        {plan.originalPrice && (
                          <div className="text-lg text-gray-400 line-through mb-1">
                            {plan.originalPrice[billingPeriod]}€
                          </div>
                        )}
                        <span className="text-4xl font-bold text-gray-800">
                          {price}€
                        </span>
                        <span className="text-gray-600">
                          /{billingPeriod === 'monthly' ? 'mois' : 'an'}
                        </span>
                        {billingPeriod === 'yearly' && price > 0 && (
                          <div className="text-green-600 text-sm font-medium">
                            Économisez {calculateSavings(monthlyPrice)}%
                          </div>
                        )}
                        {price === 0 && (
                          <div className="text-green-600 text-sm font-medium">
                            🎯 Testez l'Indonésie gratuitement
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

        {/* Services d'Expansion Business */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Services d'Expansion Indonésienne
              </h2>
              <p className="text-blue-100 max-w-3xl mx-auto text-lg">
                Au-delà de la traduction : accompagnement complet pour votre implantation en Indonésie.
                Plus de 147 entreprises nous font confiance.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 text-center">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Prix:</span>
                        <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Délai:</span>
                        <span className="text-gray-700 font-medium">{service.duration}</span>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <span className="text-blue-800 text-xs font-medium">Inclus: </span>
                        <span className="text-blue-700 text-xs">{service.includes}</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                      Découvrir ce service
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Section */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Besoin d'un accompagnement sur-mesure ?
                </h3>
                <p className="text-blue-100 mb-6">
                  Nos experts vous conseillent gratuitement sur votre stratégie d'expansion indonésienne
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Consultation gratuite (30min)
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                    Télécharger le guide expansion
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Démarrez votre essai gratuit dès aujourd&apos;hui. 
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
