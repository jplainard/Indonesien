"use client";

import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Home, 
  Search,
  ArrowLeft,
  MessageCircle,
  Mail
} from 'lucide-react';
import Link from 'next/link';

export default function NotFoundPage() {
  const suggestions = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/translate', label: 'Service de traduction', icon: Search },
    { href: '/contact', label: 'Nous contacter', icon: Mail },
    { href: '/help', label: 'Centre d\'aide', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Animation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            404
          </motion.div>
          
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-full p-4">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Page introuvable
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Oups ! La page que vous recherchez semble avoir été déplacée, 
            supprimée ou n'a jamais existé.
          </p>
          <p className="text-gray-500">
            Ne vous inquiétez pas, il nous arrive à tous de nous perdre parfois. 
            Voici quelques liens pour vous aider à retrouver votre chemin.
          </p>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          className="grid md:grid-cols-2 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={suggestion.href}
                  className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-gray-800">
                      {suggestion.label}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à la page précédente</span>
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <motion.div
            className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        <div className="absolute bottom-10 right-10 opacity-20">
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="absolute top-1/3 right-20 opacity-10">
          <motion.div
            className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  );
}
