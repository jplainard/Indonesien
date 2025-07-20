'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Languages, 
  Upload, 
  BarChart3, 
  User, 
  LogOut, 
  Menu, 
  X,
  Home,
  Users
} from 'lucide-react';

interface User {
  id: number;
  email: string;
  role: string;
}

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Vérifier l'authentification
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification d\'authentification:', error);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      window.location.href = '/auth';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Navigation publique (visible pour tous)
  const publicNavigationItems = [
    { href: '/about', label: 'À propos', icon: Home },
    { href: '/pricing', label: 'Tarifs', icon: BarChart3 },
    { href: '/contact', label: 'Contact', icon: Users }
  ];

  // Navigation privée (visible seulement si connecté et pas sur la page d'accueil)
  const privateNavigationItems = [
    { href: '/translate', label: 'Traduire', icon: Languages },
    { href: '/upload', label: 'Upload', icon: Upload },
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 }
  ];

  // Navigation admin (visible seulement pour les admins)
  const adminNavigationItems = [
    { href: '/admin', label: 'Admin', icon: Users }
  ];

  // Construire la liste des items de navigation selon l'état utilisateur
  let navigationItems = [...publicNavigationItems];
  
  // Ne pas afficher les liens privés sur la page d'accueil
  if (user && pathname !== '/') {
    navigationItems = [...navigationItems, ...privateNavigationItems];
    
    if (user.role === 'admin') {
      navigationItems = [...navigationItems, ...adminNavigationItems];
    }
  } else if (user && user.role === 'admin' && pathname !== '/') {
    // Pour les admins, toujours afficher le lien admin (sauf sur accueil)
    navigationItems = [...navigationItems, ...adminNavigationItems];
  }

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et nom */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Languages className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IndoFrench
              </span>
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-600 border border-blue-500/30'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-500/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Utilisateur et menu mobile */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Bouton Dashboard spécial pour la page d'accueil */}
                {pathname === '/' && (
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{user.email}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Connexion</span>
              </Link>
            )}

            {/* Menu mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-500/10 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/20 py-4"
          >
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-600'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-500/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Bouton Dashboard spécial pour mobile sur la page d'accueil */}
              {user && pathname === '/' && (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
              )}
              
              {user && (
                <div className="pt-2 border-t border-gray-200">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Connecté en tant que: {user.email} ({user.role})
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
