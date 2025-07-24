"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Log persistant pour debug
  console.log('🏗️ [AUTH PAGE] Composant rendu, loading:', loading);
  
  // Empêcher le rechargement de page
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', (e) => {
      if (loading) {
        console.log('⚠️ [WINDOW] Tentative de fermeture pendant loading');
        e.preventDefault();
        e.returnValue = '';
      }
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Effacer l'erreur quand l'utilisateur tape
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🚀 [FORM] Event reçu, tentative preventDefault');
    console.log('🚀 [FORM] Event type:', e.type, 'Event target:', e.target);
    
    // Triple protection contre la soumission
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent?.preventDefault?.();
    
    console.log('🔄 Début de la soumission du formulaire');
    console.log('📊 FormData:', formData);
    console.log('🔍 [DEBUG] Loading state:', loading);
    
    if (loading) {
      console.log('⚠️ [FORM] Déjà en cours de traitement, abandon');
      return false;
    }
    
    // Bloquer immédiatement toute autre soumission
    setLoading(true);
    setError('');
    
    console.log('🔒 [STATE] Loading mis à true, formulaire bloqué');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      console.log('🎯 Endpoint:', endpoint);
      console.log('📤 Body:', body);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response ok:', response.ok);

      const data = await response.json();
      console.log('📥 Response data:', data);

      if (response.ok) {
        console.log('✅ Connexion réussie, redirection immédiate...');
        
        // Redirection immédiate avec window.location
        console.log('🚀 [REDIRECTION] Redirection vers /dashboard');
        window.location.href = '/dashboard';
        
        // Cette ligne ne devrait jamais s'exécuter
        console.log('⚠️ [REDIRECTION] Cette ligne ne devrait pas apparaître');
        return;
      } else {
        console.log('❌ Erreur de connexion:', data.error);
        setError(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('💥 Erreur:', error);
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
      console.log('🏁 Fin de la soumission');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <LogIn className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Connexion' : 'Créer un compte'}
          </h1>
          <p className="text-gray-600">
            {isLogin 
              ? 'Accédez à votre espace IndoFrench' 
              : 'Rejoignez la communauté IndoFrench'
            }
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <motion.button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              isLogin 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => {
              setIsLogin(true);
              setError('');
              setFormData({ email: '', password: '', name: '' });
            }}
            whileTap={{ scale: 0.98 }}
          >
            Connexion
          </motion.button>
          <motion.button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              !isLogin 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => {
              setIsLogin(false);
              setError('');
              setFormData({ email: '', password: '', name: '' });
            }}
            whileTap={{ scale: 0.98 }}
          >
            Inscription
          </motion.button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form 
          onSubmit={handleSubmit} 
          className="space-y-6" 
          suppressHydrationWarning
          noValidate
          action="javascript:void(0);"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && loading) {
              console.log('⚠️ [FORM] Enter pressé pendant loading, empêchement');
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          onReset={(e) => {
            console.log('⚠️ [FORM] Reset tenté, empêchement');
            e.preventDefault();
          }}
        >
          {/* Name Field (only for registration) */}
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Votre nom complet"
                />
              </div>
            </motion.div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={isLogin ? 'Votre mot de passe' : 'Minimum 8 caractères'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {!isLogin && (
              <p className="mt-1 text-sm text-gray-500">
                Le mot de passe doit contenir au moins 8 caractères
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            onClick={(e) => {
              console.log('🖱️ [BUTTON] Clic détecté');
              if (loading) {
                console.log('⚠️ [BUTTON] Déjà en cours, empêchement du clic');
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {isLogin ? 'Connexion...' : 'Création...'}
              </div>
            ) : (
              isLogin ? 'Se connecter' : 'Créer le compte'
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
