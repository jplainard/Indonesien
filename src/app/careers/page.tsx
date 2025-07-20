'use client';

import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  TrendingUp,
  Heart,
  Globe,
  ArrowRight,
  Coffee,
  Target,
  Award
} from 'lucide-react';
import MainLayout from '@/components/MainLayout';

export default function CareersPage() {
  const jobOffers = [
    {
      id: 1,
      title: "Traducteur Senior Indonésien-Français",
      department: "Traduction",
      location: "Paris, France",
      type: "CDI",
      level: "Senior",
      description: "Nous recherchons un traducteur expérimenté pour rejoindre notre équipe de traduction spécialisée.",
      requirements: [
        "Master en traduction ou équivalent",
        "5+ années d&apos;expérience en traduction professionnelle",
        "Maîtrise parfaite du français et de l&apos;indonésien",
        "Spécialisation dans les domaines juridique ou technique"
      ],
      benefits: ["Télétravail possible", "Formation continue", "Primes de performance"]
    },
    {
      id: 2,
      title: "Développeur Full-Stack",
      department: "Technique",
      location: "Paris, France / Remote",
      type: "CDI",
      level: "Intermédiaire",
      description: "Rejoignez notre équipe technique pour développer les outils de traduction de demain.",
      requirements: [
        "Expérience avec React, Node.js, TypeScript",
        "Connaissance des API de traduction (Google, DeepL)",
        "Expérience en IA/ML pour le traitement du langage",
        "Maîtrise de l&apos;anglais technique"
      ],
      benefits: ["Remote-friendly", "Stack moderne", "Projets innovants"]
    },
    {
      id: 3,
      title: "Chef de Projet International",
      department: "Management",
      location: "Jakarta, Indonésie",
      type: "CDI",
      level: "Senior",
      description: "Pilotez des projets de traduction à grande échelle pour nos clients internationaux.",
      requirements: [
        "Expérience en gestion de projet (PMP apprécié)",
        "Bilingue français-indonésien obligatoire",
        "Connaissance de l&apos;industrie de la traduction",
        "Compétences en négociation et relation client"
      ],
      benefits: ["Expatriation", "Package complet", "Évolution rapide"]
    },
    {
      id: 4,
      title: "Spécialiste Marketing Digital",
      department: "Marketing",
      location: "Paris, France",
      type: "CDI",
      level: "Junior/Intermédiaire",
      description: "Développez notre présence digitale et nos campagnes marketing multilingues.",
      requirements: [
        "Formation en marketing digital ou communication",
        "Maîtrise des outils SEO/SEM",
        "Expérience en marketing de contenu",
        "Créativité et rigueur analytique"
      ],
      benefits: ["Environnement créatif", "Outils modernes", "Formation marketing"]
    },
    {
      id: 5,
      title: "Ingénieur IA Linguistique",
      department: "R&D",
      location: "Paris, France",
      type: "CDI",
      level: "Senior",
      description: "Développez des modèles d&apos;IA avancés pour améliorer la qualité de nos traductions.",
      requirements: [
        "PhD en informatique ou linguistique computationnelle",
        "Expérience avec TensorFlow/PyTorch",
        "Publication dans des revues scientifiques",
        "Passion pour les langues et l&apos;IA"
      ],
      benefits: ["Recherche appliquée", "Conférences internationales", "Impact mondial"]
    },
    {
      id: 6,
      title: "Customer Success Manager",
      department: "Commercial",
      location: "Paris, France / Remote",
      type: "CDI",
      level: "Intermédiaire",
      description: "Accompagnez nos clients dans leur réussite et développez les relations à long terme.",
      requirements: [
        "Expérience en relation client B2B",
        "Excellent sens de la communication",
        "Maîtrise de l&apos;anglais professionnel",
        "Empathie et orientation solution"
      ],
      benefits: ["Contact client international", "Formation produit", "Évolution interne"]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Bien-être au travail",
      description: "Équilibre vie pro/perso, télétravail flexible, congés supplémentaires"
    },
    {
      icon: TrendingUp,
      title: "Développement professionnel",
      description: "Formation continue, conférences, certification, évolution de carrière"
    },
    {
      icon: Globe,
      title: "Environnement international",
      description: "Équipe multiculturelle, projets globaux, opportunités de mobilité"
    },
    {
      icon: Award,
      title: "Reconnaissance",
      description: "Primes de performance, programmes de reconnaissance, stock-options"
    },
    {
      icon: Coffee,
      title: "Environnement stimulant",
      description: "Bureaux modernes, technologie de pointe, espaces de collaboration"
    },
    {
      icon: Target,
      title: "Mission impactante",
      description: "Contribuez à connecter les cultures, projets à fort impact social"
    }
  ];

  const values = [
    {
      title: "Excellence",
      description: "Nous visons l&apos;excellence dans chaque traduction et chaque interaction",
      icon: "🏆"
    },
    {
      title: "Innovation",
      description: "Nous repoussons les limites de la technologie de traduction",
      icon: "🚀"
    },
    {
      title: "Diversité",
      description: "Notre force réside dans la richesse de nos différences culturelles",
      icon: "🌍"
    },
    {
      title: "Intégrité",
      description: "Transparence, honnêteté et éthique guident toutes nos actions",
      icon: "💎"
    }
  ];

  const stats = [
    { number: "50+", label: "Collaborateurs" },
    { number: "25", label: "Nationalités" },
    { number: "95%", label: "Satisfaction employés" },
    { number: "4.8/5", label: "Note Glassdoor" }
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
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Rejoignez l&apos;Aventure IndoFrench
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Construisez votre carrière dans une entreprise innovante qui connecte 
                les cultures à travers la traduction. Découvrez nos opportunités 
                d&apos;emploi dans un environnement international stimulant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/careers#jobs"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voir nos offres d&apos;emploi
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
                <motion.a
                  href="/careers#culture"
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Découvrir notre culture
                </motion.a>
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

        {/* Values Section */}
        <section id="culture" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nos Valeurs
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez les valeurs qui nous unissent et qui guident notre 
                mission de rapprocher les cultures.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
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
                Pourquoi Nous Rejoindre ?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Chez IndoFrench, nous croyons que des employés épanouis font 
                des équipes performantes. Découvrez nos avantages.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Job Offers Section */}
        <section id="jobs" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nos Offres d&apos;Emploi
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez les postes disponibles et trouvez celui qui correspond 
                à vos compétences et vos ambitions.
              </p>
            </motion.div>

            <div className="space-y-6">
              {jobOffers.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {job.department}
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {job.type}
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          {job.level}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600 mb-4 space-x-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{job.type}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{job.description}</p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Exigences :</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {job.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Avantages :</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.benefits.map((benefit, benefitIndex) => (
                              <span
                                key={benefitIndex}
                                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                              >
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 lg:mt-0 lg:ml-6">
                      <motion.button
                        className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Postuler
                      </motion.button>
                    </div>
                  </div>
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
              <h2 className="text-2xl font-bold mb-4">
                Candidature Spontanée
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Vous ne trouvez pas le poste qui vous correspond ? 
                Envoyez-nous votre candidature spontanée, nous serions ravis 
                de découvrir votre profil !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="mailto:careers@indofrench.com"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Envoyer votre CV
                </motion.a>
                <motion.a
                  href="https://linkedin.com/company/indofrench"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Nous suivre sur LinkedIn
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
