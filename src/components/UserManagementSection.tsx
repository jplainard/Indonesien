"use client";

// Type pour les utilisateurs API (hors fonction)
export type UserApi = {
  createdAt: string;
  lastLoginAt: string;
  role: { name: string };
  stats: { lastActivity: string };
};

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users,
  Shield,
  TrendingUp,
  UserCheck,
  Award,
  Crown,
  Activity
} from "lucide-react";

interface UserStats {
  totalUsers: number;
  newUsersThisMonth: number;
  usersByRole: {
    [key: string]: number;
  };
  activeUsers: number;
}

export default function UserManagementSection() {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      
      // Calculer les statistiques
      const stats: UserStats = {
        totalUsers: users.length,




        newUsersThisMonth: users.filter((user: UserApi) => {
          const userDate = new Date(user.createdAt);
          const now = new Date();
          return userDate.getMonth() === now.getMonth() && 
                 userDate.getFullYear() === now.getFullYear();
        }).length,
        usersByRole: users.reduce((acc: Record<string, number>, user: UserApi) => {
          acc[user.role.name] = (acc[user.role.name] || 0) + 1;
          return acc;
        }, {}),
        activeUsers: users.filter((user: UserApi) => {
          const lastActivity = new Date(user.stats.lastActivity);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return lastActivity > thirtyDaysAgo;
        }).length
      };
      
      setUserStats(stats);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques utilisateurs:', error);
      // Données de démonstration
      setUserStats({
        totalUsers: 3421,
        newUsersThisMonth: 234,
        usersByRole: {
          'utilisateur': 2841,
          'premium': 423,
          'traducteur': 89,
          'moderateur': 34,
          'admin': 12
        },
        activeUsers: 1987
      });
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    const icons = {
      'admin': Crown,
      'moderateur': Shield,
      'traducteur': Award,
      'premium': TrendingUp,
      'utilisateur': Users
    };
    return icons[role as keyof typeof icons] || Users;
  };

  const getRoleColor = (role: string) => {
    const colors = {
      'admin': 'from-red-500 to-red-600',
      'moderateur': 'from-purple-500 to-purple-600',
      'traducteur': 'from-blue-500 to-blue-600',
      'premium': 'from-yellow-500 to-yellow-600',
      'utilisateur': 'from-gray-500 to-gray-600'
    };
    return colors[role as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  if (loading || !userStats) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-gray-600">Chargement des statistiques utilisateurs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Notre communauté IndoFrench
          </h2>
          <p className="text-xl text-gray-600">
            Une plateforme qui rassemble traducteurs professionnels et utilisateurs du monde entier
          </p>
        </motion.div>

        {/* Statistiques principales */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Users className="w-8 h-8 text-white" />
            </motion.div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {userStats.totalUsers.toLocaleString()}
            </div>
            <div className="text-gray-600">Utilisateurs inscrits</div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="bg-gradient-to-r from-green-500 to-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </motion.div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              +{userStats.newUsersThisMonth}
            </div>
            <div className="text-gray-600">Nouveaux ce mois</div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <Activity className="w-8 h-8 text-white" />
            </motion.div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {userStats.activeUsers.toLocaleString()}
            </div>
            <div className="text-gray-600">Utilisateurs actifs</div>
          </motion.div>
        </motion.div>

        {/* Répartition par rôles */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Répartition de notre communauté
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {Object.entries(userStats.usersByRole).map(([role, count], index) => {
              const IconComponent = getRoleIcon(role);
              const colorClass = getRoleColor(role);
              
              return (
                <motion.div
                  key={role}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className={`bg-gradient-to-r ${colorClass} rounded-xl p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center`}
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {count.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 capitalize font-medium">
                    {role}
                    {role === 'utilisateur' ? 's' : role === 'admin' ? 's' : 's'}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserCheck className="w-5 h-5" />
            Rejoindre la communauté
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
