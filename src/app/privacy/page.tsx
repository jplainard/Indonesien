'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Users, Globe, FileText, AlertCircle } from 'lucide-react';
import MainLayout from '@/components/MainLayout';

export default function PrivacyPage() {
  const sections = [
    {
      icon: Eye,
      title: "Collecte des données",
      content: [
        "Nous collectons uniquement les données nécessaires au fonctionnement de nos services de traduction.",
        "Informations d&apos;inscription : nom, email, préférences linguistiques",
        "Données de navigation : pages visitées, temps de session, préférences d&apos;interface",
        "Contenu soumis pour traduction (temporairement stocké pour le traitement)"
      ]
    },
    {
      icon: Database,
      title: "Utilisation des données",
      content: [
        "Fourniture des services de traduction demandés",
        "Amélioration continue de la qualité de nos traductions",
        "Communication relative à votre compte et nos services",
        "Analyses statistiques anonymisées pour optimiser notre plateforme"
      ]
    },
    {
      icon: Lock,
      title: "Protection et sécurité",
      content: [
        "Chiffrement SSL/TLS pour toutes les communications",
        "Stockage sécurisé avec chiffrement AES-256",
        "Accès restreint aux données par notre personnel autorisé",
        "Suppression automatique des textes traduits après traitement"
      ]
    },
    {
      icon: Users,
      title: "Partage des données",
      content: [
        "Nous ne vendons jamais vos données personnelles à des tiers",
        "Partage limité avec nos partenaires de confiance pour la fourniture du service",
        "Divulgation possible si exigée par la loi ou pour protéger nos droits",
        "Vos textes de traduction restent strictement confidentiels"
      ]
    },
    {
      icon: Globe,
      title: "Transferts internationaux",
      content: [
        "Vos données peuvent être traitées en France et en Indonésie",
        "Nous respectons les standards de protection RGPD",
        "Accords de transfert conformes aux réglementations en vigueur",
        "Niveau de protection équivalent garanti dans tous nos centres"
      ]
    },
    {
      icon: FileText,
      title: "Vos droits",
      content: [
        "Droit d&apos;accès : consultez les données que nous détenons sur vous",
        "Droit de rectification : corrigez les informations inexactes",
        "Droit à l&apos;effacement : demandez la suppression de vos données",
        "Droit à la portabilité : récupérez vos données dans un format standard",
        "Droit d&apos;opposition : refusez certains traitements de vos données"
      ]
    }
  ];

  const contactInfo = [
    {
      title: "Délégué à la Protection des Données",
      email: "dpo@indofrench.com",
      description: "Pour toute question relative à la protection de vos données"
    },
    {
      title: "Service Client",
      email: "privacy@indofrench.com", 
      description: "Pour exercer vos droits ou obtenir des informations"
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
                Politique de Confidentialité
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Votre vie privée est notre priorité. Découvrez comment nous protégeons 
                et utilisons vos données personnelles.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <div className="flex items-center justify-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Dernière mise à jour : 20 juillet 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Introduction</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Chez IndoFrench, nous nous engageons à protéger votre vie privée et à être 
                  transparents sur la façon dont nous collectons, utilisons et protégeons vos 
                  informations personnelles.
                </p>
                <p className="mb-4">
                  Cette politique de confidentialité s'applique à tous nos services de traduction, 
                  notre site web, nos applications mobiles et nos API. Elle explique quelles 
                  données nous collectons, pourquoi nous les collectons, comment nous les utilisons 
                  et quels sont vos droits.
                </p>
                <p>
                  En utilisant nos services, vous acceptez les pratiques décrites dans cette 
                  politique. Si vous avez des questions, n'hésitez pas à nous contacter.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Sections */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          {section.title}
                        </h3>
                        <ul className="space-y-3">
                          {section.content.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Nous contacter</h2>
              <p className="text-blue-100 mb-8">
                Pour toute question concernant cette politique de confidentialité ou 
                l'exercice de vos droits, contactez-nous :
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="text-center">
                    <h4 className="font-semibold mb-2">{contact.title}</h4>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-blue-200 hover:text-white transition-colors text-lg"
                    >
                      {contact.email}
                    </a>
                    <p className="text-blue-100 text-sm mt-2">{contact.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-blue-400">
                <p className="text-blue-100 text-sm">
                  <strong>Adresse postale :</strong> IndoFrench SAS, 123 rue de la Traduction, 75001 Paris, France
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cookies Notice */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Information sur les cookies</h3>
                  <p className="text-yellow-700 text-sm">
                    Notre site utilise des cookies pour améliorer votre expérience. En continuant 
                    à naviguer, vous acceptez notre utilisation des cookies conformément à cette 
                    politique de confidentialité.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
