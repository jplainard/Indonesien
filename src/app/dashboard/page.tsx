"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Clock,
  User,
  Award,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '../../components/MainLayout';

interface UserData {
  id: number;
  name: string | null;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  lastLoginAt: string | null;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{ totalTranslations: number; inProgress: number; averageQuality: number } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndStats = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          // Charger les stats utilisateur
          const statsRes = await fetch('/api/user-stats');
          if (statsRes.ok) {
            const statsData = await statsRes.json();
            setStats(statsData);
          }
        } else {
          router.push('/auth');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification:', error);
        router.push('/auth');
      } finally {
        setLoading(false);
      }
    };
    checkAuthAndStats();
  }, [router]);

  const _handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // La redirection est en cours
  }

  return (
    <MainLayout 
      title={<span className="inline-flex items-center gap-2 text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm"><User className="w-7 h-7" /> Tableau de bord</span>}
      description={<span className="text-base text-gray-700 font-medium">Bonjour {user.name || user.email}! Voici vos activités de traduction.</span>}
    >
      <div className="space-y-6">
        {/* Welcome Section modernisée */}
        <motion.div
          className="rounded-2xl bg-white/80 shadow-xl ring-1 ring-blue-100/60 backdrop-blur-md p-8 mb-6 border border-blue-100/40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-extrabold mb-2 text-blue-900 flex items-center gap-2">
            <User className="w-8 h-8 text-blue-700" /> Bienvenue sur IndoFrench !
          </h1>
          <p className="text-blue-700/80 mb-4 font-medium">
            Gérez vos traductions et accédez à tous nos services depuis votre espace personnel.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-blue-700 font-semibold">Rôle:</span>
              <span className="ml-2 font-semibold capitalize text-blue-900">{user.role}</span>
            </div>
            <div>
              <span className="text-blue-700 font-semibold">Membre depuis:</span>
              <span className="ml-2 font-semibold text-blue-900">
                {new Date(user.createdAt).toLocaleDateString('fr-FR')}
              </span>
            </div>
            <div>
              <span className="text-blue-700 font-semibold">Dernière connexion:</span>
              <span className="ml-2 font-semibold text-blue-900">
                {user.lastLoginAt 
                  ? new Date(user.lastLoginAt).toLocaleDateString('fr-FR')
                  : 'Première connexion'
                }
              </span>
            </div>
          {/* Bouton admin visible uniquement pour les admins, bien intégré dans la section d'accueil */}
          {user.role === 'admin' && (
            <div className="col-span-1 md:col-span-3 mt-4 flex justify-center">
              <Link
                href="/admin/users"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-colors shadow-lg"
              >
                <Award className="w-5 h-5" />
                Accéder au panneau d&apos;administration
              </Link>
            </div>
          )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {([
            {
              title: 'Traduire du texte',
              description: 'Traduction instantanée',
              icon: FileText,
              href: '/translate',
              color: 'bg-blue-500'
            },
            {
              title: 'Traduire un fichier',
              description: 'Upload de documents',
              icon: FileText,
              href: '/upload',
              color: 'bg-green-500'
            },
            {
              title: 'Mes traductions',
              description: 'Historique et suivi',
              icon: Clock,
              href: '/mes-traductions',
              color: 'bg-purple-500'
            },
            {
              title: 'Paramètres',
              description: 'Préférences',
              icon: Settings,
              href: '/settings',
              color: 'bg-orange-500'
            }
          ] as const).map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={action.href}
                className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className={`${action.color} rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="bg-white rounded-xl shadow-sm p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Vos statistiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">{stats ? stats.totalTranslations : 0}</div>
              <div className="text-gray-600">Documents traduits</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">{stats ? stats.inProgress : 0}</div>
              <div className="text-gray-600">En cours</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">{stats ? `${stats.averageQuality}%` : '—'}</div>
              <div className="text-gray-600">Qualité moyenne</div>
            </div>
          </div>
        </motion.div>

        {/* Admin Panel Link */}
        {/* Le bouton admin est désormais intégré dans la section d'accueil */}
      </div>
    </MainLayout>
  );
}
