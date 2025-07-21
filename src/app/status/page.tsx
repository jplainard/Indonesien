'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Server, 
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import MainLayout from '@/components/MainLayout';

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const systemStatus = {
    overall: 'operational', // operational, degraded, major_outage
    lastUpdate: '2025-07-20T15:30:00Z'
  };

  const services = [
    {
      name: 'API de Traduction',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '156ms',
      description: 'Service principal de traduction de texte',
      incidents: 0
    },
    {
      name: 'Traduction de Documents',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '2.3s',
      description: 'Service de traduction de fichiers PDF, DOCX, etc.',
      incidents: 0
    },
    {
      name: 'Interface Web',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '87ms',
      description: 'Site web et dashboard utilisateur',
      incidents: 0
    },
    {
      name: 'Base de Données',
      status: 'operational',
      uptime: '100%',
      responseTime: '12ms',
      description: 'Stockage des données utilisateurs et traductions',
      incidents: 0
    },
    {
      name: 'Authentification',
      status: 'degraded',
      uptime: '99.89%',
      responseTime: '234ms',
      description: 'Service d\'authentification et autorisation',
      incidents: 1
    },
    {
      name: 'Notifications',
      status: 'operational',
      uptime: '99.92%',
      responseTime: '45ms',
      description: 'Emails et notifications push',
      incidents: 0
    }
  ];

  const infrastructure = [
    {
      name: 'Serveurs Europe',
      region: 'eu-west-1',
      status: 'operational',
      load: 45,
      connections: 1247
    },
    {
      name: 'Serveurs Asie',
      region: 'ap-southeast-1',
      status: 'operational',
      load: 38,
      connections: 892
    },
    {
      name: 'CDN Global',
      region: 'global',
      status: 'operational',
      load: 62,
      connections: 4521
    }
  ];

  const metrics = [
    {
      name: 'Traductions/minute',
      value: '2,847',
      change: '+12%',
      trend: 'up'
    },
    {
      name: 'Utilisateurs actifs',
      value: '1,234',
      change: '+8%',
      trend: 'up'
    },
    {
      name: 'Temps de réponse moyen',
      value: '142ms',
      change: '-5%',
      trend: 'down'
    },
    {
      name: 'Taux d\'erreur',
      value: '0.02%',
      change: '-15%',
      trend: 'down'
    }
  ];

  const incidents = [
    {
      id: 1,
      title: 'Lenteur intermittente du service d\'authentification',
      status: 'investigating',
      severity: 'minor',
      startTime: '2025-07-20T14:15:00Z',
      description: 'Nous observons des temps de réponse plus lents que d\'habitude pour le service d\'authentification. Nos équipes enquêtent.',
      updates: [
        {
          time: '2025-07-20T15:30:00Z',
          status: 'investigating',
          message: 'L\'équipe technique a identifié la cause probable et travaille sur une solution.'
        },
        {
          time: '2025-07-20T14:45:00Z',
          status: 'investigating',
          message: 'Problème confirmé. Investigation en cours pour identifier la cause racine.'
        },
        {
          time: '2025-07-20T14:15:00Z',
          status: 'identified',
          message: 'Nous avons détecté des temps de réponse anormalement élevés sur le service d\'authentification.'
        }
      ]
    }
  ];

  const pastIncidents = [
    {
      id: 2,
      title: 'Maintenance planifiée - Mise à jour base de données',
      status: 'resolved',
      severity: 'maintenance',
      startTime: '2025-07-18T02:00:00Z',
      endTime: '2025-07-18T04:30:00Z',
      description: 'Maintenance planifiée pour la mise à jour de notre infrastructure de base de données.'
    },
    {
      id: 3,
      title: 'Problème réseau temporaire région Asie',
      status: 'resolved',
      severity: 'major',
      startTime: '2025-07-15T08:30:00Z',
      endTime: '2025-07-15T10:15:00Z',
      description: 'Problème réseau chez notre fournisseur cloud en Asie du Sud-Est causant des interruptions.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'major_outage':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'degraded':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'major_outage':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational':
        return 'Opérationnel';
      case 'degraded':
        return 'Dégradé';
      case 'major_outage':
        return 'Panne majeure';
      case 'investigating':
        return 'Investigation';
      case 'resolved':
        return 'Résolu';
      default:
        return 'Inconnu';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Activity className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Statut Système IndoFrench
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Surveillez en temps réel l&apos;état de nos services et infrastructures. 
                Transparence totale sur les performances et incidents.
              </p>
              
              {/* Overall Status */}
              <motion.div
                className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full ${getStatusColor(systemStatus.overall)}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {getStatusIcon(systemStatus.overall)}
                <span className="font-semibold">
                  Tous les systèmes sont opérationnels
                </span>
              </motion.div>
              
              <div className="mt-4 text-sm text-gray-500">
                Dernière mise à jour : {formatTime(systemStatus.lastUpdate)}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Live Metrics */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Métriques en Temps Réel
              </h2>
              <p className="text-gray-600">
                Mise à jour automatique - {currentTime.toLocaleTimeString('fr-FR')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
                    <TrendingUp className={`w-4 h-4 ${
                      metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {metric.value}
                  </div>
                  <div className={`text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change} vs hier
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Status */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                État des Services
              </h2>
            </motion.div>

            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(service.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">{service.uptime}</div>
                        <div className="text-xs text-gray-500">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">{service.responseTime}</div>
                        <div className="text-xs text-gray-500">Temps de réponse</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                        {getStatusText(service.status)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Infrastructure
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {infrastructure.map((infra, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Server className="w-6 h-6 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{infra.name}</h3>
                        <p className="text-sm text-gray-500">{infra.region}</p>
                      </div>
                    </div>
                    {getStatusIcon(infra.status)}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Charge CPU</span>
                        <span>{infra.load}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${infra.load}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Connexions actives</span>
                      <span className="font-medium">{infra.connections.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Incidents */}
        {incidents.length > 0 && (
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Incidents en Cours
                </h2>
              </motion.div>

              <div className="space-y-6">
                {incidents.map((incident, index) => (
                  <motion.div
                    key={incident.id}
                    className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-400"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {incident.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{incident.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Début : {formatTime(incident.startTime)}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            incident.severity === 'minor' ? 'bg-yellow-100 text-yellow-800' :
                            incident.severity === 'major' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {incident.severity === 'minor' ? 'Mineur' :
                             incident.severity === 'major' ? 'Majeur' : 'Maintenance'}
                          </span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(incident.status)}`}>
                        {getStatusText(incident.status)}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Mises à jour :</h4>
                      {incident.updates.map((update, updateIndex) => (
                        <div key={updateIndex} className="border-l-2 border-gray-200 pl-4">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {formatTime(update.time)}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(update.status)}`}>
                              {getStatusText(update.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{update.message}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Past Incidents */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Historique des Incidents
              </h2>
              <p className="text-gray-600">Derniers incidents résolus</p>
            </motion.div>

            <div className="space-y-4">
              {pastIncidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  className="bg-white rounded-xl shadow-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {incident.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{incident.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Début : {formatTime(incident.startTime)}</span>
                        {incident.endTime && (
                          <span>Fin : {formatTime(incident.endTime)}</span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          incident.severity === 'minor' ? 'bg-yellow-100 text-yellow-800' :
                          incident.severity === 'major' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {incident.severity === 'minor' ? 'Mineur' :
                           incident.severity === 'major' ? 'Majeur' : 'Maintenance'}
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Résolu
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe to Updates */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-4">
                Restez Informé
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Recevez des notifications en temps réel sur l&apos;état de nos services 
                et soyez le premier informé des maintenances planifiées.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  S&apos;abonner aux notifications
                </motion.button>
                <motion.button
                  className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Flux RSS
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
