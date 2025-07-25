"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Bell,
  Globe,
  Key,
  Trash2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import MainLayout from '../../components/MainLayout';
import Image from 'next/image';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  role: string;
  avatar?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const router = useRouter();

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    marketing: true,
    security: true
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
          setEditForm({
            name: userData.user.name || '',
            email: userData.user.email || '',
            phone: userData.user.phone || '',
            company: userData.user.company || '',
            address: userData.user.address || ''
          });
        } else {
          router.push('/auth');
        }
      } catch (_error) {
        router.push('/auth');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/users/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditing(false);
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch (_error) {
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (response.ok) {
        alert('Mot de passe modifié avec succès');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordForm(false);
      } else {
        const error = await response.json();
        alert(error.message || 'Erreur lors du changement de mot de passe');
      }
    } catch (_error) {
      alert('Erreur lors du changement de mot de passe');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Préférences', icon: Globe }
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
            <p className="text-gray-600">Chargement du profil...</p>
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
            className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-8 py-12">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                    {user.avatar ? (
                      <Image src={user.avatar} alt={user.name || 'Avatar'} width={96} height={96} className="w-24 h-24 rounded-full object-cover" />
                    ) : (
                      user.name?.charAt(0)?.toUpperCase() || 'U'
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">{user.name || 'Utilisateur'}</h1>
                  <p className="text-blue-100 mb-1">{user.email}</p>
                  <div className="flex items-center space-x-4 text-sm text-blue-100">
                    <span className="px-3 py-1 bg-white/20 rounded-full">
                      {user.role}
                    </span>
                    <span>
                      Membre depuis {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="px-8 flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">Informations du profil</h2>
                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Modifier</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
                      </button>
                      <button
                        onClick={() => {
                          setEditing(false);
                          setEditForm({
                            name: user.name || '',
                            email: user.email || '',
                            phone: user.phone || '',
                            company: user.company || '',
                            address: user.address || ''
                          });
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Annuler</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Nom complet
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 rounded-lg">{user.name || 'Non renseigné'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    {editing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 rounded-lg">{user.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Téléphone
                    </label>
                    {editing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+33 1 23 45 67 89"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 rounded-lg">{user.phone || 'Non renseigné'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building className="w-4 h-4 inline mr-2" />
                      Entreprise
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={editForm.company}
                        onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nom de votre entreprise"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 rounded-lg">{user.company || 'Non renseigné'}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Adresse
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Votre adresse complète"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-gray-50 rounded-lg">{user.address || 'Non renseigné'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Sécurité du compte</h2>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">Mot de passe</h3>
                        <p className="text-gray-600">Dernière modification: Il y a 3 mois</p>
                      </div>
                      <button
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Key className="w-4 h-4 inline mr-2" />
                        Modifier
                      </button>
                    </div>

                    {showPasswordForm && (
                      <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mot de passe actuel
                          </label>
                          <input
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nouveau mot de passe
                          </label>
                          <input
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmer le nouveau mot de passe
                          </label>
                          <input
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="flex space-x-2">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Sauvegarder
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowPasswordForm(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Sessions actives</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium">Session actuelle</p>
                          <p className="text-sm text-gray-600">Chrome sur Windows • Paris, France</p>
                        </div>
                        <span className="text-green-600 text-sm font-medium">Actuelle</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                    <h3 className="text-lg font-semibold text-red-800 mb-4">Zone de danger</h3>
                    <p className="text-red-600 mb-4">
                      La suppression de votre compte est définitive et irréversible.
                    </p>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                      <Trash2 className="w-4 h-4 inline mr-2" />
                      Supprimer le compte
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Préférences de notification</h2>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications par email</h3>
                    <div className="space-y-4">
                      {Object.entries({
                        email: 'Notifications importantes',
                        marketing: 'Actualités et promotions',
                        security: 'Alertes de sécurité'
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-700">{label}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications[key as keyof typeof notifications]}
                              onChange={(e) => setNotifications({
                                ...notifications,
                                [key]: e.target.checked
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Préférences</h2>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Langue et région</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Langue de l&apos;interface</label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option value="fr">Français</option>
                          <option value="en">English</option>
                          <option value="id">Bahasa Indonesia</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fuseau horaire</label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option value="Europe/Paris">Europe/Paris (CET)</option>
                          <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Préférences de traduction</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Langue source par défaut</label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option value="fr">Français</option>
                          <option value="id">Indonésien</option>
                          <option value="auto">Détection automatique</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Qualité préférée</label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option value="standard">Standard</option>
                          <option value="premium">Premium</option>
                          <option value="expert">Expert</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
