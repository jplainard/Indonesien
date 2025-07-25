"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  BarChart3,
  Settings,
  TrendingUp,
  Activity,
  Globe,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '../../components/MainLayout';

interface AdminStats {
  users: {
    total: number;
    active: number;
    new: number;
    growth: number;
  };
  translations: {
    total: number;
    today: number;
    pending: number;
    completed: number;
    avgQuality: number;
  };
  system: {
    uptime: string;
    performance: number;
    storage: number;
  bandwidth: number;
  };
}
interface RecentActivity {
  id: string;
  type: 'user' | 'translation' | 'system';
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error' | 'success';
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          if (userData.user.role !== 'admin') {
            router.push('/dashboard');
            return;
          }
          setUser(userData.user);
        } else {
          router.push('/auth');
        }
      } catch (_error: unknown) {
        router.push('/auth');
      }
    };

    checkAuth();
    fetchAdminData();
  }, [router]);

  const fetchAdminData = async () => {
    try {
      // Simulation de données - à remplacer par de vraies API calls
      const mockStats: AdminStats = {
        users: {
          total: 1247,
          active: 892,
          new: 34,
          growth: 12.5
        },
        translations: {
          total: 8934,
          today: 127,
          pending: 23,
          completed: 8911,
          avgQuality: 94
        },
        system: {
          uptime: "99.98%",
          performance: 96,
          storage: 67,
          bandwidth: 34
        }
      };

      const mockActivities: RecentActivity[] = [
        {
          id: '1',
          type: 'user',
          message: 'Nouvel utilisateur inscrit: marie.dupont@example.com',
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          severity: 'success'
        },
        {
          id: '2',
          type: 'translation',
          message: 'Traduction #8934 terminée avec succès (98% qualité)',
          timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
          severity: 'success'
        },
        {
          id: '3',
          type: 'system',
          message: 'Sauvegarde automatique effectuée',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          severity: 'info'
        },
        {
          id: '4',
          type: 'translation',
          message: 'Traduction #8933 nécessite une révision manuelle',
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          severity: 'warning'
        },
            {
              id: '5',
              type: 'system',
              message: 'Pic d&apos;utilisation détecté - performance: 89%',
              timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
              severity: 'warning'
            }
      ];

      setStats(mockStats);
      setActivities(mockActivities);
    } catch (_error: unknown) {
      // Erreur silencieuse lors du chargement des données
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    

    if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      return `Il y a ${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `Il y a ${Math.floor(diffInMinutes / 1440)} jour(s)`;
    }
}

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const quickActions = [
    {
      title: "Gestion des utilisateurs",
      description: "Voir, modifier et gérer tous les comptes utilisateurs",
      icon: Users,
      href: "/admin/users",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Traductions",
      description: "Monitorer et gérer toutes les traductions",
      icon: FileText,
      href: "/admin/translations",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Statistiques",
      description: "Tableaux de bord et analytics détaillés",
      icon: BarChart3,
      href: "/admin/stats",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Paramètres système",
      description: "Configuration et paramètres de la plateforme",
      icon: Settings,
      href: "/admin/settings",
      color: "from-gray-500 to-gray-600"
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
            <p className="text-gray-600">Chargement du panneau d&apos;administration...</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Panneau d&apos;Administration
            </h1>
            <p className="text-gray-600">
              Vue d&apos;ensemble de la plateforme IndoFrench
            </p>
          </motion.div>

          {/* Stats Overview */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">+{stats?.users?.growth ?? 0}%</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {stats?.users?.total?.toLocaleString() ?? 0}
                </h3>
                <p className="text-gray-600 text-sm">
                  Utilisateurs total ({stats?.users?.active ?? 0} actifs)
                </p>
                <p className="text-green-600 text-sm mt-2">
                  +{stats?.users?.new ?? 0} nouveaux aujourd&apos;hui
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-green-600">
                    <span className="text-sm font-medium">{stats?.translations?.avgQuality ?? 0}% qualité</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {stats?.translations?.total?.toLocaleString() ?? 0}
                </h3>
                <p className="text-gray-600 text-sm">
                  Traductions complétées
                </p>
                <p className="text-blue-600 text-sm mt-2">
                  {stats?.translations?.today ?? 0} aujourd&apos;hui | {stats?.translations?.pending ?? 0} en attente
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Activity className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-green-600">
                    <span className="text-sm font-medium">{stats?.system?.uptime ?? ''}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {stats?.system?.performance ?? 0}%
                </h3>
                <p className="text-gray-600 text-sm">
                  Performance système
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Uptime: {stats?.system?.uptime ?? ''}
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-orange-100 rounded-full p-3">
                    <Globe className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-blue-600">
                    <span className="text-sm font-medium">{stats?.system?.bandwidth ?? 0}% utilisé</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {stats?.system?.storage ?? 0}%
                </h3>
                <p className="text-gray-600 text-sm">
                  Stockage utilisé
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Bande passante: {stats?.system?.bandwidth ?? 0}%
                </p>
              </motion.div>
            </div>
          )}

          {/* Quick Actions */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6">Actions rapides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.a
                    key={index}
                    href={action.href}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`bg-gradient-to-r ${action.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {action.description}
                    </p>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Activité récente</h2>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">Temps réel</span>
              </div>
            </div>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getSeverityIcon(activity.severity)}
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-800 text-sm">{activity.message}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'translation' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {activity.type}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link 
                href="/admin" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Actualiser les données →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
