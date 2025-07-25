"use client";

import { motion } from 'framer-motion';
import { TrendingUp, Building2, Users, Globe, ArrowRight, Star, Award, BarChart3 } from 'lucide-react';
import MainLayout from '../../components/MainLayout';

export default function SuccessStories() {
  const successStories = [
    {
      company: "TechFlow SAS",
      sector: "SaaS/Fintech",
      location: "Paris → Jakarta",
      logo: "TF",
      revenue: "€847K",
      growth: "+127%",
      timeframe: "8 mois",
      quote: "L'accompagnement d'IndoFrench a été décisif. En 8 mois, nous avons généré €847K en Indonésie grâce à leur expertise locale et leurs traductions techniques impeccables.",
      author: "Marie Chen, CEO",
      challenges: ["Réglementation fintech complexe", "Adaptation UX locale", "Partenariats bancaires"],
      solutions: ["Accompagnement juridique complet", "Localisation culturelle poussée", "Réseau partenaires qualifiés"],
      results: ["€847K de revenus en 8 mois", "15 000 utilisateurs actifs", "3 partenariats bancaires majeurs"]
    },
    {
      company: "EcoLogistics SARL",
      sector: "Logistique/Transport",
      location: "Lyon → Surabaya",
      logo: "EL",
      revenue: "€1.2M",
      growth: "+89%",
      timeframe: "12 mois",
      quote: "Impossible d'imaginer notre expansion sans IndoFrench. Leur réseau local nous a ouvert des portes que nous n'aurions jamais trouvées seuls.",
      author: "Pierre Dubois, Directeur International",
      challenges: ["Réglementation douanière", "Réseau distributeurs", "Certification ASEAN"],
      solutions: ["Expertise réglementaire", "Introduction 8 distributeurs", "Accompagnement certification"],
      results: ["€1.2M de CA la première année", "8 distributeurs exclusifs", "Certification ASEAN obtenue"]
    },
    {
      company: "BioCosm France",
      sector: "Cosmétiques/Beauté",
      location: "Nice → Bali",
      logo: "BC",
      revenue: "€2.3M",
      growth: "+156%",
      timeframe: "14 mois",
      quote: "IndoFrench a transformé notre vision de l'expansion internationale. Leur approche culturelle nous a permis de créer des produits parfaitement adaptés au marché indonésien.",
      author: "Camille Laurent, Responsable Export",
      challenges: ["Adaptation produits", "Réglementation cosmétique", "Positionnement premium"],
      solutions: ["R&D locale adaptée", "Conformité BPOM", "Stratégie marque premium"],
      results: ["€2.3M de revenus", "120 points de vente", "N°3 cosmétiques français"]
    }
  ];

  const keyMetrics = [
    {
      icon: TrendingUp,
      value: "+127%",
      label: "Croissance moyenne",
      description: "revenus clients à 12 mois"
    },
    {
      icon: Building2,
      value: "147",
      label: "Entreprises accompagnées",
      description: "depuis 2019"
    },
    {
      icon: Globe,
      value: "€127M",
      label: "Revenus cumulés générés",
      description: "pour nos clients"
    },
    {
      icon: Users,
      value: "94%",
      label: "Taux de succès",
      description: "projets d'expansion"
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
                🏆 +127% de croissance moyenne • 94% de taux de succès
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Ils ont réussi leur
                <span className="block text-red-600 mt-2">expansion en Indonésie</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez comment nos clients ont multiplié leurs revenus grâce à notre 
                accompagnement personnalisé sur le marché indonésien.
              </p>
            </motion.div>

            {/* Métriques clés */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {keyMetrics.map((metric, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="font-semibold text-gray-700 mb-1">{metric.label}</div>
                  <div className="text-sm text-gray-500">{metric.description}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Cas d'études détaillés
            </motion.h2>

            <div className="space-y-16">
              {successStories.map((story, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Contenu principal */}
                    <div className="p-8 lg:p-12">
                      {/* Header de l'entreprise */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl font-bold">
                          {story.logo}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{story.company}</h3>
                          <p className="text-gray-600">{story.sector} • {story.location}</p>
                        </div>
                      </div>

                      {/* Métriques de résultats */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{story.revenue}</div>
                          <div className="text-sm text-gray-600">Revenus générés</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{story.growth}</div>
                          <div className="text-sm text-gray-600">Croissance</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{story.timeframe}</div>
                          <div className="text-sm text-gray-600">Délai</div>
                        </div>
                      </div>

                      {/* Citation */}
                      <blockquote className="text-lg italic text-gray-700 mb-4 border-l-4 border-blue-500 pl-4">
                        "{story.quote}"
                      </blockquote>
                      <p className="text-sm text-gray-600 mb-8">— {story.author}</p>

                      {/* CTA */}
                      <motion.button 
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Voir l'étude complète</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>

                    {/* Détails du processus */}
                    <div className="bg-gray-50 p-8 lg:p-12">
                      <h4 className="text-xl font-bold mb-6">Processus d'accompagnement</h4>
                      
                      {/* Défis */}
                      <div className="mb-6">
                        <h5 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Défis identifiés
                        </h5>
                        <ul className="space-y-2">
                          {story.challenges.map((challenge, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Solutions */}
                      <div className="mb-6">
                        <h5 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          Solutions déployées
                        </h5>
                        <ul className="space-y-2">
                          {story.solutions.map((solution, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Résultats */}
                      <div>
                        <h5 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Résultats obtenus
                        </h5>
                        <ul className="space-y-2">
                          {story.results.map((result, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Témoignages courts */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ce qu'ils disent de notre accompagnement
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "IndoFrench maîtrise parfaitement les subtilités culturelles indonésiennes. Un avantage concurrentiel énorme.",
                  author: "Thomas Moreau",
                  company: "Digital Innovations",
                  rating: 5
                },
                {
                  quote: "Leur réseau de partenaires locaux nous a fait gagner 18 mois. ROI exceptionnel.",
                  author: "Sophie Bernard",
                  company: "GreenTech Solutions",
                  rating: 5
                },
                {
                  quote: "Accompagnement juridique et traductions techniques au top. Équipe très professionnelle.",
                  author: "Alexandre Kim",
                  company: "MedDevice France",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à écrire votre success story ?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Rejoignez les 147 entreprises qui ont fait confiance à IndoFrench 
                pour leur expansion en Indonésie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Démarrer mon expansion
                </motion.button>
                <motion.button 
                  className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Calculer mon potentiel
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
