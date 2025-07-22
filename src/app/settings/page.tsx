"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Globe, 
  Shield,
  Settings,
  Save,
  Check,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import MainLayout from '../../components/MainLayout';

export default function SettingsPage() {
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const [settings, setSettings] = useState({
    // Général
    language: 'fr',
    timezone: 'Europe/Paris',
    theme: 'light',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    securityAlerts: true,
    
    // Traduction
    defaultSourceLang: 'auto',
    defaultTargetLang: 'fr',
    autoSave: true,
    qualityLevel: 'standard',
    
    // Confidentialité
    profileVisibility: 'private',
    dataSharing: false,
    analytics: true
  });

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      } else {
        router.push('/auth');
      }
    } catch (error) {
      console.error('Erreur d&apos;authentification:', error);
      router.push('/auth');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    loadSettings();
  }, []);

  const loadSettings = async () => {
    // Simulation du chargement des paramètres
    // En réalité, cela viendrait d'une API
    // Les paramètres actuels sont déjà définis par défaut dans l'état
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Simulation de la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSettingChange = (key: string, value: unknown) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const settingsSections = [
    {
      id: 'general',
      title: 'Général',
      icon: Settings,
      settings: [
        {
          key: 'language',
          label: 'Langue de l&apos;interface',
          type: 'select',
          options: [
            { value: 'fr', label: 'Français' },
            { value: 'en', label: 'English' },
            { value: 'id', label: 'Bahasa Indonesia' }
          ]
        },
        {
          key: 'timezone',
          label: 'Fuseau horaire',
          type: 'select',
          options: [
            { value: 'Europe/Paris', label: 'Europe/Paris (CET)' },
            { value: 'Asia/Jakarta', label: 'Asia/Jakarta (WIB)' },
            { value: 'UTC', label: 'UTC' }
          ]
        },
        {
          key: 'theme',
          label: 'Thème',
          type: 'select',
          options: [
            { value: 'light', label: 'Clair' },
            { value: 'dark', label: 'Sombre' },
            { value: 'auto', label: 'Automatique' }
          ]
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          key: 'emailNotifications',
          label: 'Notifications par email',
          type: 'toggle',
          description: 'Recevoir des notifications importantes par email'
        },
        {
          key: 'pushNotifications',
          label: 'Notifications push',
          type: 'toggle',
          description: 'Notifications en temps réel sur votre navigateur'
        },
        {
          key: 'marketingEmails',
          label: 'Emails promotionnels',
          type: 'toggle',
          description: 'Recevoir nos offres et actualités'
        },
        {
          key: 'securityAlerts',
          label: 'Alertes de sécurité',
          type: 'toggle',
          description: 'Notifications pour les activités de sécurité'
        }
      ]
    },
    {
      id: 'translation',
      title: 'Traduction',
      icon: Globe,
      settings: [
        {
          key: 'defaultSourceLang',
          label: 'Langue source par défaut',
          type: 'select',
          options: [
            { value: 'auto', label: 'Détection automatique' },
            { value: 'fr', label: 'Français' },
            { value: 'id', label: 'Indonésien' },
            { value: 'en', label: 'Anglais' }
          ]
        },
        {
          key: 'defaultTargetLang',
          label: 'Langue cible par défaut',
          type: 'select',
          options: [
            { value: 'fr', label: 'Français' },
            { value: 'id', label: 'Indonésien' },
            { value: 'en', label: 'Anglais' }
          ]
        },
        {
          key: 'qualityLevel',
          label: 'Niveau de qualité préféré',
          type: 'select',
          options: [
            { value: 'standard', label: 'Standard' },
            { value: 'premium', label: 'Premium' },
            { value: 'expert', label: 'Expert' }
          ]
        },
        {
          key: 'autoSave',
          label: 'Sauvegarde automatique',
          type: 'toggle',
          description: 'Sauvegarder automatiquement vos traductions'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Confidentialité',
      icon: Shield,
      settings: [
        {
          key: 'profileVisibility',
          label: 'Visibilité du profil',
          type: 'select',
          options: [
            { value: 'private', label: 'Privé' },
            { value: 'public', label: 'Public' },
            { value: 'contacts', label: 'Contacts uniquement' }
          ]
        },
        {
          key: 'dataSharing',
          label: 'Partage de données',
          type: 'toggle',
          description: 'Autoriser l&apos;utilisation anonyme de vos données pour améliorer le service'
        },
        {
          key: 'analytics',
          label: 'Analytics',
          type: 'toggle',
          description: 'Autoriser la collecte de données d&apos;usage anonymes'
        }
      ]
    }
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="inline-block w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-600">Chargement des paramètres...</p>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Paramètres
                </h1>
                <p className="text-gray-600">
                  Personnalisez votre expérience IndoFrench
                </p>
              </div>
              
              <motion.button
                onClick={handleSaveSettings}
                disabled={saving}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  saved 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } disabled:opacity-50`}
                whileHover={{ scale: saving ? 1 : 1.05 }}
                whileTap={{ scale: saving ? 1 : 0.95 }}
              >
                {saving ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Sauvegarde...</span>
                  </>
                ) : saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Sauvegardé !</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Sauvegarder</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Settings Sections */}
          <div className="space-y-8">
            {settingsSections.map((section, sectionIndex) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  className="bg-white rounded-3xl shadow-lg p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-blue-100 rounded-full p-3">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {section.settings.map((setting, _settingIndex) => (
                      <div key={setting.key} className="flex items-center justify-between">
                        <div className="flex-grow">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {setting.label}
                          </label>
                          {setting.description && (
                            <p className="text-sm text-gray-500">{setting.description}</p>
                          )}
                        </div>

                        <div className="ml-6">
                          {setting.type === 'toggle' ? (
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Boolean(settings[setting.key as keyof typeof settings])}
                                onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          ) : (
                            <select
                              value={String(settings[setting.key as keyof typeof settings])}
                              onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[160px]"
                            >
                              {setting.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Reset Section */}
          <motion.div
            className="bg-red-50 border border-red-200 rounded-3xl p-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-red-800 mb-4">
              Zone de danger
            </h3>
            <p className="text-red-600 mb-4">
              Réinitialiser tous les paramètres aux valeurs par défaut. 
              Cette action est irréversible.
            </p>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              <X className="w-4 h-4 inline mr-2" />
              Réinitialiser les paramètres
            </button>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
