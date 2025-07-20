"use client";

import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Home, 
  RefreshCw,
  ArrowLeft,
  MessageCircle,
  Mail,
  Server
} from 'lucide-react';
import Link from 'next/link';

export default function Error500Page() {
  const suggestions = [
    { href: '/', label: 'Retour à l\'accueil', icon: Home },
    { href: '/contact', label: 'Signaler le problème', icon: Mail },
    { href: '/help', label: 'Centre d\'aide', icon: MessageCircle }
  ];

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 500 Animation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-9xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-700 bg-clip-text text-transparent mb-4"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, -1, 1, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            500
          </motion.div>
          
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full p-4">
              <Server className="w-12 h-12 text-white" />
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
            Erreur du serveur
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Nous rencontrons actuellement des difficultés techniques. 
            Notre équipe a été automatiquement notifiée.
          </p>
          <p className="text-gray-500">
            Veuillez patienter quelques instants et réessayer. 
            Si le problème persiste, n'hésitez pas à nous contacter.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            onClick={handleReload}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-semibold hover:from-red-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-5 h-5" />
            <span>Réessayer</span>
          </motion.button>
          
          <motion.button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-gray-800 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl border border-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Page précédente</span>
          </motion.button>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
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
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full p-3">
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

        {/* Status Info */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg border border-red-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Incident en cours
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Nos ingénieurs travaillent activement à résoudre ce problème. 
            Nous nous excusons pour la gêne occasionnée.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="/status" 
              className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
            >
              Voir le statut du système →
            </a>
            <a 
              href="mailto:support@indofrench.com" 
              className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
            >
              Contacter le support →
            </a>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <motion.div
            className="w-20 h-20 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"
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
            className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
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
            className="w-12 h-12 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"
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
