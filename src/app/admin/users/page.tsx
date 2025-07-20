"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../../../components/MainLayout";
import { 
  Users,
  UserPlus,
  Edit3,
  Trash2,
  Shield,
  Mail,
  Calendar,
  BarChart3,
  Star,
  Clock,
  Search,
  Filter,
  ChevronDown,
  Eye
} from "lucide-react";

interface Role {
  id: number;
  name: string;
  description: string;
  _count?: {
    users: number;
  };
}

interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  emailVerified?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  stats: {
    totalTranslations: number;
    averageQuality: number;
    lastActivity: string;
  };
}

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/roles');
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Erreur lors du chargement des rôles:', error);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role.name === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (roleName: string) => {
    const colors: { [key: string]: string } = {
      'admin': 'bg-red-100 text-red-800',
      'moderateur': 'bg-purple-100 text-purple-800',
      'traducteur': 'bg-blue-100 text-blue-800',
      'premium': 'bg-yellow-100 text-yellow-800',
      'utilisateur': 'bg-gray-100 text-gray-800'
    };
    return colors[roleName] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
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
          <p className="text-gray-600">Chargement des utilisateurs...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <MainLayout 
      title={<span className="inline-flex items-center gap-2 text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm"><Users className="w-7 h-7" /> Gestion des utilisateurs</span>}
      description={<span className="text-base text-gray-700 font-medium">Administrez les comptes utilisateurs, rôles et permissions</span>}
    >
      <div className="space-y-6">
        {/* Actions d'en-tête modernisées */}
        <motion.div
          className="rounded-2xl bg-white/80 shadow-xl ring-1 ring-blue-100/60 backdrop-blur-md p-8 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-blue-100/40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus className="w-5 h-5" />
            Nouvel utilisateur
          </motion.button>
        </motion.div>
        {/* Statistiques rapides */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 capitalize">{role.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{role._count?.users || 0}</p>
                </div>
                <Shield className={`w-8 h-8 ${getRoleColor(role.name).includes('red') ? 'text-red-500' : 'text-blue-500'}`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filtres et recherche */}
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">Tous les rôles</option>
                {roles.map(role => (
                  <option key={role.id} value={role.name} className="capitalize">
                    {role.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </motion.div>

        {/* Liste des utilisateurs */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm border overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Utilisateur</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Rôle</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Statistiques</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Dernière activité</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                          {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name || 'Sans nom'}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {user.email}
                          </p>
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            Inscrit le {formatDate(user.createdAt)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getRoleColor(user.role.name)}`}>
                        {user.role.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <BarChart3 className="w-4 h-4 text-blue-500" />
                          <span>{user.stats.totalTranslations} traductions</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{user.stats.averageQuality}% qualité</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {formatDate(user.stats.lastActivity)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <motion.button
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit3 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
