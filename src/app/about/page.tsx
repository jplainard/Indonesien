"use client";

import { motion } from 'framer-motion';
import { 
  Globe, 
  Users, 
  Award, 
  Target, 
  Heart, 
  BookOpen,
  Languages,
  TrendingUp
} from 'lucide-react';
import MainLayout from '../../components/MainLayout';

export default function AboutPage() {
  const stats = [
    { icon: Languages, value: "10,000+", label: "Traductions réalisées" },
    { icon: Users, value: "1,500+", label: "Clients satisfaits" },
    { icon: Globe, value: "25+", label: "Pays desservis" },
    { icon: Award, value: "98%", label: "Taux de satisfaction" }
  ];

  const values = [
    {
      icon: Target,
      title: "Précision",
      description: "Chaque traduction est révisée par nos experts pour garantir une qualité irréprochable."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Notre équipe partage une passion authentique pour les langues et les cultures."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Nous utilisons les dernières technologies pour améliorer continuellement nos services."
    },
    {
      icon: BookOpen,
      title: "Expertise",
      description: "Des traducteurs natifs spécialisés dans les domaines juridique, commercial et technique."
    }
  ];

  const team = [
    {
      name: "Marie Dubois",
      role: "Directrice & Traductrice Senior",
      bio: "15 ans d'expérience en traduction français-indonésien, spécialisée en droit des affaires.",
      image: "/team/marie.jpg"
    },
    {
      name: "Andi Pratama",
      role: "Traducteur Senior",
      bio: "Expert en traduction technique et commerciale, basé à Jakarta depuis 10 ans.",
      image: "/team/andi.jpg"
    },
    {
      name: "Sophie Martin",
      role: "Responsable Qualité",
      bio: "Linguiste diplômée, garantit la cohérence et la qualité de toutes nos traductions.",
      image: "/team/sophie.jpg"
    }
  ];

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
                  À propos d'IndoFrench
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Votre partenaire de confiance pour la traduction professionnelle 
                entre l'indonésien et le français. Nous connectons les cultures 
                et facilitons les échanges commerciaux depuis 2020.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Notre Mission
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Chez IndoFrench, nous croyons que la langue ne doit jamais être 
                  une barrière aux échanges commerciaux et culturels. Notre mission 
                  est de fournir des services de traduction de la plus haute qualité 
                  pour faciliter la communication entre la France et l'Indonésie.
                </p>
                <p className="text-gray-600 text-lg mb-8">
                  Que vous soyez une entreprise cherchant à s'implanter sur de 
                  nouveaux marchés ou un particulier ayant besoin de documents 
                  traduits, nous mettons notre expertise à votre service.
                </p>
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-semibold mb-3">Notre Engagement</h3>
                  <p>
                    Livraison dans les délais, respect de la confidentialité, 
                    et satisfaction client garantie à 100%.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Globe className="w-16 h-16 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Expertise Bilingue
                    </h3>
                    <p className="text-gray-600">
                      Notre équipe maîtrise parfaitement les subtilités 
                      culturelles et linguistiques des deux pays.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
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
                Nos Valeurs
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ces principes guident chacune de nos actions et garantissent 
                la qualité de nos services.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Notre Équipe
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Des professionnels passionnés et expérimentés à votre service.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-semibold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <div className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {member.bio}
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
                Prêt à collaborer avec nous ?
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Découvrez pourquoi des centaines d'entreprises nous font confiance 
                pour leurs besoins de traduction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contactez-nous
                </motion.a>
                <motion.a
                  href="/pricing"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voir nos tarifs
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
