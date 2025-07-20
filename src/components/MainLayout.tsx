'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';

// Composant pour les particules flottantes (même style que la page d'accueil)
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

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function MainLayout({ 
  children, 
  title, 
  description,
  className = ""
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Arrière-plan animé similaire à la page d'accueil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cercles dégradés flottants */}
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25, 
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
          className="absolute bottom-32 right-32 w-8 h-1 bg-blue-400/40 rounded-full"
          animate={{ 
            scaleX: [1, 2, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />

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
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Contenu principal */}
      <main className={`relative z-10 ${className}`}>
        {/* En-tête de page optionnel */}
        {(title || description) && (
          <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {title && (
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-gray-600 text-lg">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Contenu de la page */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
