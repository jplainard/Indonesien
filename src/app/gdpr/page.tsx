'use client';

import { motion } from 'framer-motion';
import { Shield, Database, Eye, Lock, UserCheck, Settings, FileCheck, AlertCircle } from 'lucide-react';
import MainLayout from '@/components/MainLayout';

export default function GDPRPage() {
  const gdprRights = [
    {
      icon: Eye,
      title: "Droit d'accès",
      description: "Obtenez une copie de toutes les données personnelles que nous détenons sur vous",
      action: "Demander l'accès",
      timeframe: "Réponse sous 30 jours"
    },
    {
      icon: Settings,
      title: "Droit de rectification",
      description: "Corrigez ou mettez à jour vos informations personnelles inexactes",
      action: "Modifier mes données",
      timeframe: "Correction immédiate"
    },
    {
      icon: Database,
      title: "Droit à l'effacement",
      description: "Demandez la suppression de vos données personnelles ('droit à l'oubli')",
      action: "Supprimer mes données",
      timeframe: "Traitement sous 30 jours"
    },
    {
      icon: Lock,
      title: "Droit à la limitation",
      description: "Limitez le traitement de vos données dans certaines circonstances",
      action: "Limiter le traitement",
      timeframe: "Application immédiate"
    },
    {
      icon: FileCheck,
      title: "Droit à la portabilité",
      description: "Récupérez vos données dans un format structuré et lisible",
      action: "Exporter mes données",
      timeframe: "Export sous 30 jours"
    },
    {
      icon: UserCheck,
      title: "Droit d'opposition",
      description: "Opposez-vous au traitement de vos données pour des raisons légitimes",
      action: "S'opposer au traitement",
      timeframe: "Arrêt immédiat"
    }
  ];

  const dataProcessing = [
    {
      purpose: "Fourniture des services",
      legalBasis: "Exécution du contrat",
      retention: "Durée du contrat + 3 ans",
      description: "Traitement nécessaire pour fournir nos services de traduction"
    },
    {
      purpose: "Marketing et communication",
      legalBasis: "Consentement",
      retention: "Jusqu'au retrait du consentement",
      description: "Envoi de newsletters et informations commerciales"
    },
    {
      purpose: "Amélioration des services",
      legalBasis: "Intérêt légitime",
      retention: "Données anonymisées - 5 ans",
      description: "Analyse des performances et optimisation des traductions"
    },
    {
      purpose: "Obligations légales",
      legalBasis: "Obligation légale",
      retention: "Selon la réglementation",
      description: "Respect des obligations fiscales et comptables"
    }
  ];

  const securityMeasures = [
    {
      icon: Shield,
      title: "Chiffrement des données",
      measures: [
        "Chiffrement AES-256 au repos",
        "TLS 1.3 pour les transmissions",
        "Clés de chiffrement séparées",
        "Rotation automatique des clés"
      ]
    },
    {
      icon: Lock,
      title: "Contrôle d'accès",
      measures: [
        "Authentification multi-facteurs",
        "Principe du moindre privilège",
        "Audit des accès régulier",
        "Sessions à durée limitée"
      ]
    },
    {
      icon: Database,
      title: "Protection des infrastructures",
      measures: [
        "Centres de données certifiés ISO 27001",
        "Surveillance 24h/24 et 7j/7",
        "Sauvegardes chiffrées quotidiennes",
        "Plan de continuité d'activité"
      ]
    },
    {
      icon: UserCheck,
      title: "Formation du personnel",
      measures: [
        "Formation RGPD obligatoire",
        "Sensibilisation à la sécurité",
        "Accords de confidentialité",
        "Mise à jour des compétences"
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Conformité RGPD
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Notre engagement pour la protection de vos données personnelles 
                selon le Règlement Général sur la Protection des Données.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Certification RGPD - Conformité vérifiée le 20 juillet 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Introduction RGPD */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Qu'est-ce que le RGPD ?</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Le Règlement Général sur la Protection des Données (RGPD) est un règlement 
                  européen qui renforce et unifie la protection des données personnelles des 
                  résidents de l'Union européenne.
                </p>
                <p className="mb-4">
                  Chez IndoFrench, nous nous conformons pleinement au RGPD et nous nous engageons 
                  à protéger vos données avec le plus haut niveau de sécurité et de transparence.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Notre DPO (délégué à la protection des données)</h4>
                      <p className="text-blue-800 text-sm">
                        Marie Dubois - DPO certifiée CNIL<br />
                        Email : dpo@indofrench.com<br />
                        Téléphone : +33 1 23 45 67 89
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vos Droits RGPD */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Vos droits selon le RGPD
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Le RGPD vous accorde plusieurs droits fondamentaux concernant vos données personnelles. 
                Découvrez comment les exercer facilement.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gdprRights.map((right, index) => {
                const Icon = right.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{right.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{right.description}</p>
                    <div className="space-y-2">
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        {right.action}
                      </button>
                      <p className="text-xs text-gray-500 text-center">{right.timeframe}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Finalités de traitement */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Finalités de traitement des données
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez pourquoi et comment nous traitons vos données personnelles, 
                ainsi que les bases légales qui nous y autorisent.
              </p>
            </motion.div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Finalité</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Base légale</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Durée de conservation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {dataProcessing.map((item, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{item.purpose}</div>
                            <div className="text-sm text-gray-600">{item.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.legalBasis}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.retention}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Mesures de sécurité */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Mesures de Sécurité
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nous mettons en œuvre des mesures techniques et organisationnelles 
                appropriées pour protéger vos données personnelles.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {securityMeasures.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.measures.map((measure, measureIndex) => (
                        <li key={measureIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm">{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact DPO */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-6">Exercer vos droits RGPD</h2>
                <p className="text-blue-100 mb-8">
                  Pour exercer vos droits ou pour toute question concernant le traitement 
                  de vos données personnelles, contactez notre DPO.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold mb-2">Par email</h4>
                    <a href="mailto:dpo@indofrench.com" className="text-blue-200 hover:text-white">
                      dpo@indofrench.com
                    </a>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Settings className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold mb-2">Espace client</h4>
                    <p className="text-blue-200">Gérez vos préférences</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold mb-2">Formulaire Dédié</h4>
                    <p className="text-blue-200">Demande structurée</p>
                  </div>
                </div>

                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Formulaire de Contact DPO
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dernière mise à jour */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-gray-50 rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 text-sm">
                <strong>Dernière mise à jour de cette page :</strong> 20 juillet 2025<br />
                Cette page est régulièrement mise à jour pour refléter nos pratiques actuelles 
                et l'évolution de la réglementation RGPD.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
