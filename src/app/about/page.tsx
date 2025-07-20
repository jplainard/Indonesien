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
  TrendingUp,
  Building
} from 'lucide-react';
import MainLayout from '../../components/MainLayout';

export default function AboutPage() {
  const stats = [
    { icon: Languages, value: "50,000+", label: "Documents traduits" },
    { icon: Users, value: "3,500+", label: "Clients satisfaits" },
    { icon: Globe, value: "45+", label: "Pays desservis" },
    { icon: Award, value: "99.2%", label: "Taux de satisfaction" }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence & Précision",
      description: "Chaque traduction subit un processus de révision en trois étapes : traduction initiale, révision par un second linguiste, et contrôle qualité final. Notre engagement : zéro compromis sur la qualité."
    },
    {
      icon: Heart,
      title: "Passion Culturelle",
      description: "Notre équipe biculturelle franco-indonésienne vit et respire les nuances des deux cultures. Cette immersion culturelle garantit des traductions qui conservent l&apos;essence et le ton du message original."
    },
    {
      icon: TrendingUp,
      title: "Innovation Continue",
      description: "Nous investissons constamment dans les technologies de pointe : IA pour la pré-traduction, outils de mémoire de traduction avancés, et plateformes de collaboration en temps réel pour optimiser délais et cohérence."
    },
    {
      icon: BookOpen,
      title: "Expertise Sectorielle",
      description: "Nos traducteurs sont spécialisés par domaine : juridique (contrats, litiges), médical (études cliniques, AMM), technique (ingénierie, IT), et commercial (marketing, finance). Chaque projet est confié au bon expert."
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "Fondation d&apos;IndoFrench",
      description: "Création de l&apos;entreprise par Marie Dubois et Andi Pratama à Paris, avec l&apos;ambition de combler le gap linguistique franco-indonésien dans le secteur B2B."
    },
    {
      year: "2020",
      title: "Premiers grands comptes",
      description: "Signature des premiers contrats avec des multinationales françaises s&apos;implantant en Indonésie : Total Énergies, Danone, et Crédit Agricole."
    },
    {
      year: "2021",
      title: "Certification ISO 17100",
      description: "Obtention de la certification internationale pour les services de traduction, garantissant notre conformité aux standards les plus exigeants du secteur."
    },
    {
      year: "2022",
      title: "Expansion Équipe",
      description: "Constitution d&apos;une équipe de 25 traducteurs permanents et 150+ freelances certifiés, couvrant tous les secteurs d&apos;activité."
    },
    {
      year: "2023",
      title: "Innovation Technologique",
      description: "Lancement de notre plateforme propriétaire combinant IA et expertise humaine, réduisant les délais de 40% tout en améliorant la qualité."
    },
    {
      year: "2024",
      title: "Leadership Marché",
      description: "Position de leader sur le segment franco-indonésien avec 60% de part de marché et expansion vers d&apos;autres langues d&apos;Asie du Sud-Est."
    }
  ];

  const team = [
    {
      name: "Marie Dubois",
      role: "Co-Fondatrice & Directrice Générale",
      bio: "Master en Traduction de l&apos;ESIT Paris, 15 ans d&apos;expérience en cabinet d&apos;avocats international. Spécialisée en droit des affaires et fusions-acquisitions. Auteure de deux guides sur la traduction juridique.",
      expertise: ["Droit des affaires", "M&A", "Compliance"],
      languages: ["Français (natif)", "Indonésien (C2)", "Anglais (C1)"]
    },
    {
      name: "Andi Pratama",
      role: "Co-Fondateur & Directeur Technique",
      bio: "Ingénieur linguiste, ancien directeur de traduction chez Telkom Indonesia. Expert en localisation logicielle et traduction technique. Certifié Project Management Professional (PMP).",
      expertise: ["Traduction technique", "Localisation", "Gestion de projet"],
      languages: ["Indonésien (natif)", "Français (C2)", "Anglais (C1)"]
    },
    {
      name: "Sophie Martin",
      role: "Directrice Qualité & Linguistique",
      bio: "Docteure en Linguistique Appliquée Sorbonne, 12 ans chez Lionbridge. Développe nos processus qualité et forme nos équipes. Membre du comité technique ISO TC37/SC5.",
      expertise: ["Contrôle Qualité", "Formation", "Normalisation"],
      languages: ["Français (natif)", "Indonésien (C1)", "Anglais (C2)"]
    },
    {
      name: "Budi Santoso",
      role: "Directeur commercial Asie",
      bio: "MBA INSEAD, 10 ans dans le développement commercial en Asie du Sud-Est. Ancien directeur régional chez BNP Paribas Jakarta. Expertise en services financiers et énergétiques.",
      expertise: ["Développement Commercial", "Finance", "Énergie"],
      languages: ["Indonésien (natif)", "Français (C1)", "Anglais (C2)"]
    },
    {
      name: "Clara Nguyen",
      role: "Responsable Innovation & IA",
      bio: "Ingénieure en IA conversationnelle, ancienne research scientist chez Google Translate. Pilote l&apos;intégration de nos outils d&apos;IA propriétaires et l&apos;amélioration continue de nos algorithmes.",
      expertise: ["Intelligence Artificielle", "NLP", "Innovation"],
      languages: ["Français (natif)", "Anglais (C2)", "Indonésien (B2)"]
    },
    {
      name: "David Chen",
      role: "Directeur Financier",
      bio: "Expert-comptable et commissaire aux comptes, ancien CFO de plusieurs scale-ups tech. Supervise la gestion financière, la conformité réglementaire et les opérations de croissance.",
      expertise: ["Finance", "Conformité", "Stratégie"],
      languages: ["Français (natif)", "Anglais (C2)", "Chinois (natif)"]
    }
  ];

  const recognitions = [
    {
      title: "Prix de l&apos;Innovation 2024",
      organization: "Chambre de Commerce Franco-Indonésienne",
      description: "Récompense notre plateforme IA révolutionnaire"
    },
    {
      title: "Top 10 Language Service Providers",
      organization: "CSA Research Global",
      description: "Classement parmi les leaders mondiaux du secteur"
    },
    {
      title: "Certification ISO 17100:2015",
      organization: "AFNOR Certification",
      description: "Standard international pour les services de traduction"
    },
    {
      title: "Label French tech",
      organization: "Bpifrance",
      description: "Reconnaissance de notre excellence technologique"
    }
  ];

  const partnerships = [
    { name: "CCFI", description: "Chambre de Commerce Franco-Indonésienne" },
    { name: "ESIT", description: "École Supérieure d&apos;Interprètes et de Traducteurs" },
    { name: "SFT", description: "Société Française des Traducteurs" },
    { name: "Business France", description: "Agence nationale de développement international" }
  ];

  return (
    <MainLayout>
      <div className="relative">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
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
                  À propos d&apos;IndoFrench
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Depuis 2019, IndoFrench est le partenaire de référence pour la traduction professionnelle 
                franco-indonésienne. Nous accompagnons entreprises et institutions dans leurs projets 
                d&apos;expansion internationale avec une expertise unique alliant innovation technologique 
                et excellence linguistique.
              </motion.p>
            </motion.div>

            {/* Statistiques améliorées */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div 
                    key={index}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" id="histoire">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Notre parcours</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                De startup prometteuse à leader du marché franco-indonésien, 
                découvrez les étapes clés de notre développement.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="relative flex items-start mb-12"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                    {milestone.year.slice(-2)}
                  </div>
                  <div className="ml-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex-grow">
                    <div className="flex items-center mb-3">
                      <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mr-3">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" id="valeurs">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Nos valeurs</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Les principes fondamentaux qui guident notre action quotidienne 
                et garantissent l&apos;excellence de nos services.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Notre Équipe */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm" id="team">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Notre équipe dirigeante</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des experts passionnés avec une vision commune : révolutionner 
                la traduction franco-indonésienne grâce à l&apos;innovation et l&apos;excellence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-blue-100">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">{member.bio}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Expertise :</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, skillIndex) => (
                          <span key={skillIndex} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Langues :</h4>
                      <div className="space-y-1">
                        {member.languages.map((lang, langIndex) => (
                          <span key={langIndex} className="text-sm text-gray-600 block">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reconnaissance et Partenariats */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Reconnaissances */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Reconnaissances</h2>
                <div className="space-y-6">
                  {recognitions.map((recognition, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{recognition.title}</h3>
                          <p className="text-sm text-blue-600 mb-2">{recognition.organization}</p>
                          <p className="text-gray-600 text-sm">{recognition.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Partenariats */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Nos partenaires</h2>
                <div className="space-y-4">
                  {partnerships.map((partner, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                          <Building className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{partner.name}</h3>
                          <p className="text-gray-600 text-sm">{partner.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-3">Rejoignez notre réseau</h3>
                  <p className="mb-4">
                    Vous êtes une institution, une école de traduction ou une entreprise ? 
                    Explorons ensemble les opportunités de collaboration.
                  </p>
                  <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Devenir Partenaire
                  </button>
                </div>
              </motion.div>
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
                Prêt à Collaborer Avec Nous ?
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Que vous ayez un projet de traduction, une question sur nos services, 
                ou souhaitiez rejoindre notre équipe, nous sommes là pour vous accompagner.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all">
                  Demander un Devis
                </button>
                <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
                  Nous Contacter
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
