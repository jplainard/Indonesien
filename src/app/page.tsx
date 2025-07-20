"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  FileText, 
  Building2, 
  BarChart3, 
  GraduationCap,
  Users,
  UserCheck,
  Upload,
  Calculator,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Award,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  TrendingUp,
  Globe,
  Star,
  Zap
} from "lucide-react";
import UserManagementSection from "../components/UserManagementSection";

// Composant pour les particules flottantes (évite le problème d'hydration)
function FloatingParticles() {
  const [particles, setParticles] = useState<{ left: number; top: number; x: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Génère les positions aléatoires côté client uniquement
    setParticles(
      Array.from({ length: 12 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        x: Math.random() * 20 - 10,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 4,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.x, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  interface StatsOverview {
    totalTranslations: number;
    totalUsers: number;
    languagePairs: number;
    todayTranslations: number;
    averageQuality: number;
    publicTranslations: number;
  }
  interface Stats {
    overview: StatsOverview;
    translationTypes?: Array<{ type: string; count: number }>;
    monthlyData?: Record<string, number>;
    topLanguages?: Array<{ language: string; count: number }>;
    growth?: { thisMonth: number; lastMonth: number };
  }
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
        // Données de démonstration en cas d'erreur
        setStats({
          overview: {
            totalTranslations: 12847,
            totalUsers: 3421,
            languagePairs: 12,
            todayTranslations: 47,
            averageQuality: 96,
            publicTranslations: 8943
          }
        });
      } finally {
        setLoading(false);
      }
    };
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(!!data?.user);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };
    fetchStats();
    checkAuth();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">IndoFrench</h1>
              <span className="ml-3 text-sm text-gray-500">Traduction de documents</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="#tarifs" className="text-gray-700 hover:text-blue-600 transition-colors">Tarifs</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              {isAuthenticated ? (
                <a href="/dashboard" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1">
                  <UserCheck className="w-4 h-4" />
                  Mon dashboard
                </a>
              ) : (
                <a href="/auth" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Connexion
                </a>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* HERO - TRADUCTION DE DOCUMENTS */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 overflow-hidden">
        {/* Fond décoratif avec formes géométriques */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Image SVG de fond */}
          <motion.div
            className="absolute top-10 right-10 opacity-20"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Image 
              src="/translation-bg.svg" 
              alt="Translation background" 
              width={384}
              height={288}
              className="w-96 h-72"
              priority
            />
          </motion.div>

          {/* Illustration de gauche - représentation abstraite de documents */}
          <motion.div
            className="absolute bottom-10 left-10 opacity-15"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          >
            <div className="relative">
              {/* Stack de documents */}
              <div className="w-32 h-40 bg-gradient-to-br from-blue-300/30 to-blue-400/30 rounded-lg transform rotate-3"></div>
              <div className="w-32 h-40 bg-gradient-to-br from-purple-300/30 to-purple-400/30 rounded-lg transform -rotate-2 absolute top-2 left-2"></div>
              <div className="w-32 h-40 bg-gradient-to-br from-green-300/30 to-green-400/30 rounded-lg transform rotate-1 absolute top-4 left-4"></div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl"
            animate={{ 
              rotate: [360, 0],
              scale: [1.1, 1, 1.1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-2xl"
            animate={{ 
              y: [-20, 20, -20],
              x: [-10, 10, -10]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Éléments géométriques flottants */}
          <motion.div
            className="absolute top-20 right-20 w-4 h-4 bg-blue-500/30 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div
            className="absolute top-40 left-20 w-6 h-6 bg-purple-500/30 rotate-45"
            animate={{ 
              rotate: [45, 225, 45],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div
            className="absolute bottom-20 right-40 w-3 h-3 bg-green-500/40 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />

          {/* Icônes flottantes représentant la traduction */}
          <motion.div
            className="absolute top-32 left-10 text-blue-400/40"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Globe className="w-8 h-8" />
          </motion.div>
          
          <motion.div
            className="absolute top-16 right-32 text-purple-400/40"
            animate={{ 
              y: [0, 12, 0],
              rotate: [0, -8, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <FileText className="w-6 h-6" />
          </motion.div>

          <motion.div
            className="absolute bottom-32 left-32 text-green-400/40"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 3.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 right-16 text-yellow-400/40"
            animate={{ 
              x: [0, 8, 0],
              y: [0, -8, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          >
            <Star className="w-7 h-7" />
          </motion.div>
          
          {/* Lignes décoratives */}
          <motion.div
            className="absolute top-10 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"
            animate={{ 
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div
            className="absolute bottom-16 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent rotate-45"
            animate={{ 
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Pattern de points subtil */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Particules flottantes */}
        <FloatingParticles />

        {/* Effet laser de scan */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 48%, rgba(59, 130, 246, 0.3) 50%, rgba(59, 130, 246, 0.1) 52%, transparent 100%)',
            width: '200%',
            height: '100%',
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Effet de lueur derrière le texte */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-200/20 via-purple-200/20 to-blue-200/20 blur-xl -z-10"></span>
              <span className="relative">
                Traduction professionnelle de documents<br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-extrabold">
                  Indonésien ↔ Français
                </span>
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Nous traduisons vos documents officiels, commerciaux et techniques avec précision et confidentialité. 
              Service dédié aux entreprises et particuliers.
            </motion.p>
            
            {/* Types de documents */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { icon: FileText, title: "Contrats" },
                { icon: Building2, title: "Documents RH" },
                { icon: BarChart3, title: "Rapports" },
                { icon: GraduationCap, title: "Diplômes" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-sm font-medium">{item.title}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.a
                href="/translate"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-5 h-5" />
                Traduire du texte
              </motion.a>
              <motion.a
                href="/upload"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Upload className="w-5 h-5" />
                Traduire un document
              </motion.a>
              <motion.a
                href="/devis"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calculator className="w-5 h-5" />
                Demander un devis
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* POUR QUI ? */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Nos clients
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* ENTREPRISES */}
            <motion.div 
              className="bg-blue-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Building2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Entreprises</h3>
              <ul className="space-y-3 text-gray-700">
                {[
                  { icon: FileText, text: "Contrats commerciaux", desc: "Accords, partenariats, conditions générales" },
                  { icon: Users, text: "Documentation RH", desc: "Offres d&apos;emploi, règlements intérieurs" },
                  { icon: BarChart3, text: "Marketing", desc: "Brochures, sites web, supports commerciaux" },
                  { icon: CheckCircle, text: "Technique", desc: "Manuels, spécifications, notices" },
                  { icon: Shield, text: "Juridique", desc: "Statuts, procédures, correspondances" }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <item.icon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>{item.text}</strong> - {item.desc}
                    </div>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6">
                <motion.a 
                  href="/entreprises" 
                  className="text-blue-600 font-semibold hover:underline flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>

            {/* PARTICULIERS */}
            <motion.div 
              className="bg-green-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <UserCheck className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Particuliers</h3>
              <ul className="space-y-3 text-gray-700">
                {[
                  { icon: Award, text: "Documents officiels", desc: "Actes d&apos;état civil, passeports" },
                  { icon: GraduationCap, text: "Études", desc: "Diplômes, relevés de notes, lettres de motivation" },
                  { icon: FileText, text: "Immigration", desc: "Dossiers de visa, attestations" },
                  { icon: CheckCircle, text: "Médical", desc: "Ordonnances, comptes-rendus médicaux" },
                  { icon: Users, text: "Personnel", desc: "Correspondances, documents familiaux" }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <item.icon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>{item.text}</strong> - {item.desc}
                    </div>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6">
                <motion.a 
                  href="/particuliers" 
                  className="text-green-600 font-semibold hover:underline flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FORMATS ACCEPTÉS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Formats de documents acceptés
          </motion.h2>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              { icon: FileText, title: "PDF", color: "text-red-600" },
              { icon: FileText, title: "Word", color: "text-blue-600" },
              { icon: FileSpreadsheet, title: "Excel", color: "text-green-600" },
              { icon: Presentation, title: "PowerPoint", color: "text-orange-600" },
              { icon: ImageIcon, title: "Images", color: "text-purple-600" },
              { icon: FileText, title: "Texte", color: "text-gray-600" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
                <div className="text-sm font-medium">{item.title}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATISTIQUES EN TEMPS RÉEL */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              IndoFrench en chiffres
            </h2>
            <p className="text-xl opacity-90">
              Statistiques en temps réel de notre plateforme
            </p>
          </motion.div>

          {!loading && stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Traductions totales */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <FileText className="w-8 h-8 text-blue-600" />
                </motion.div>
                <motion.div
                  className="text-3xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {stats.overview.totalTranslations.toLocaleString()}
                </motion.div>
                <div className="text-white/80">Documents traduits</div>
              </motion.div>

              {/* Utilisateurs */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="bg-green-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Users className="w-8 h-8 text-blue-600" />
                </motion.div>
                <motion.div
                  className="text-3xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  {stats.overview.totalUsers.toLocaleString()}
                </motion.div>
                <div className="text-white/80">Utilisateurs actifs</div>
              </motion.div>

              {/* Qualité moyenne */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="bg-orange-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Star className="w-8 h-8 text-blue-600" />
                </motion.div>
                <motion.div
                  className="text-3xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  {stats.overview.averageQuality}%
                </motion.div>
                <div className="text-white/80">Qualité moyenne</div>
              </motion.div>

              {/* Traductions aujourd'hui */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="bg-purple-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-8 h-8 text-blue-600" />
                </motion.div>
                <motion.div
                  className="text-3xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.1 }}
                  viewport={{ once: true }}
                >
                  {stats.overview.todayTranslations}
                </motion.div>
                <div className="text-white/80">Aujourd&apos;hui</div>
              </motion.div>
            </div>
          )}

          {/* Indicateurs de performance supplémentaires */}
          {!loading && stats && (
            <motion.div
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <motion.div
                  className="flex items-center justify-center gap-2 mb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Globe className="w-6 h-6 text-yellow-400" />
                  <span className="text-2xl font-bold">{stats.overview.languagePairs}</span>
                </motion.div>
                <p className="text-white/80">Paires de langues supportées</p>
              </div>
              
              <div className="text-center">
                <motion.div
                  className="flex items-center justify-center gap-2 mb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <span className="text-2xl font-bold">24/7</span>
                </motion.div>
                <p className="text-white/80">Service disponible</p>
              </div>
              
              <div className="text-center">
                <motion.div
                  className="flex items-center justify-center gap-2 mb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Shield className="w-6 h-6 text-blue-400" />
                  <span className="text-2xl font-bold">100%</span>
                </motion.div>
                <p className="text-white/80">Confidentialité garantie</p>
              </div>
            </motion.div>
          )}

          {loading && (
            <div className="text-center">
              <motion.div
                className="inline-block w-8 h-8 border-4 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="mt-4 text-white/80">Chargement des statistiques...</p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION GESTION DES UTILISATEURS */}
      <UserManagementSection />

      {/* PROCESS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Comment ça marche ?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { 
                step: 1, 
                icon: Upload, 
                title: "Envoyez votre document", 
                desc: "Uploadez votre fichier ou collez votre texte",
                color: "bg-blue-100 text-blue-600"
              },
              { 
                step: 2, 
                icon: CheckCircle, 
                title: "Choisissez vos options", 
                desc: "Langue, délai, niveau de révision",
                color: "bg-green-100 text-green-600"
              },
              { 
                step: 3, 
                icon: Clock, 
                title: "Traduction", 
                desc: "IA + révision humaine si nécessaire",
                color: "bg-orange-100 text-orange-600"
              },
              { 
                step: 4, 
                icon: CheckCircle, 
                title: "Livraison", 
                desc: "Réception par email en quelques heures",
                color: "bg-purple-100 text-purple-600"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className={`${item.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 relative`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-8 h-8" />
                  <div className="absolute -top-2 -right-2 bg-white border-2 border-current rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {item.step}
                  </div>
                </motion.div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Prêt à traduire vos documents ?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Démarrez dès maintenant ou demandez un devis personnalisé
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/translate"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-5 h-5" />
              Traduire du texte
            </motion.a>
            <motion.a
              href="/upload"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload className="w-5 h-5" />
              Traduire un document
            </motion.a>
            <motion.a
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-5 h-5" />
              Nous contacter
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">IndoFrench</h3>
              <p className="text-sm">Traduction professionnelle de documents indonésien-français pour entreprises et particuliers.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/entreprises" className="hover:text-white">Entreprises</a></li>
                <li><a href="/particuliers" className="hover:text-white">Particuliers</a></li>
                <li><a href="/tarifs" className="hover:text-white">Tarifs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                <li><a href="/aide" className="hover:text-white">Aide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/mentions-legales" className="hover:text-white">Mentions légales</a></li>
                <li><a href="/confidentialite" className="hover:text-white">Confidentialité</a></li>
                <li><a href="/cgv" className="hover:text-white">CGV</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>© 2024 IndoFrench. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
