'use client';

import { motion } from 'framer-motion';
import { FileText, Users, Shield, AlertTriangle, Scale, Clock, Globe, CheckCircle } from 'lucide-react';
import MainLayout from '@/components/MainLayout';

export default function TermsPage() {
  const sections = [
    {
      icon: Users,
      title: "Acceptation des conditions",
      content: [
        "En accédant à nos services, vous acceptez d&apos;être lié par ces conditions d&apos;utilisation",
        "Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser nos services",
        "Nous nous réservons le droit de modifier ces conditions à tout moment",
        "Les modifications prendront effet dès leur publication sur cette page"
      ]
    },
    {
      icon: Globe,
      title: "Description des services",
      content: [
        "IndoFrench fournit des services de traduction entre l&apos;indonésien et le français",
        "Nos services incluent la traduction de textes, documents et contenus multimédias",
        "Nous proposons des solutions pour particuliers et entreprises",
        "Certains services peuvent nécessiter un abonnement ou des frais supplémentaires"
      ]
    },
    {
      icon: CheckCircle,
      title: "Inscription et compte utilisateur",
      content: [
        "Vous devez fournir des informations exactes et complètes lors de l&apos;inscription",
        "Vous êtes responsable de maintenir la confidentialité de vos identifiants",
        "Un seul compte par personne ou entité est autorisé",
        "Nous nous réservons le droit de suspendre ou supprimer les comptes en violation"
      ]
    },
    {
      icon: FileText,
      title: "Utilisation du contenu",
      content: [
        "Vous conservez tous vos droits sur le contenu que vous soumettez pour traduction",
        "Vous nous accordez une licence limitée pour traiter votre contenu",
        "Vous garantissez avoir les droits nécessaires sur le contenu soumis",
        "Le contenu ne doit pas violer les droits de tiers ou les lois en vigueur"
      ]
    },
    {
      icon: Shield,
      title: "Confidentialité et sécurité",
      content: [
        "Nous nous engageons à protéger la confidentialité de vos documents",
        "Vos contenus sont supprimés automatiquement après traitement",
        "Accès restreint aux traductions par notre personnel autorisé uniquement",
        "Chiffrement de bout en bout pour tous les transferts de données"
      ]
    },
    {
      icon: Scale,
      title: "Limitation de responsabilité",
      content: [
        "Nos services sont fournis &#39;en l&#39;état&#39; sans garantie de disponibilité absolue",
        "Nous ne garantissons pas la perfection absolue des traductions",
        "Notre responsabilité est limitée au montant payé pour le service concerné",
        "Nous ne sommes pas responsables des dommages indirects ou consécutifs"
      ]
    },
    {
      icon: Clock,
      title: "Délais et livraison",
      content: [
        "Les délais indiqués sont estimatifs et peuvent varier selon la complexité",
        "En cas de retard, nous nous efforcerons de vous informer rapidement",
        "Les délais d&apos;urgence sont disponibles moyennant supplément",
        "Force majeure peut entraîner des retards indépendants de notre volonté"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Utilisations interdites",
      content: [
        "Contenu illégal, diffamatoire, obscène ou violant les droits d&apos;autrui",
        "Tentatives de piratage, hacking ou contournement de nos systèmes de sécurité",
        "Utilisation commerciale non autorisée de nos services gratuits",
        "Soumission de contenus malveillants (virus, malware, etc.)"
      ]
    }
  ];

  const pricingInfo = [
    {
      title: "Services gratuits",
      description: "Limités en volume et fonctionnalités, destinés à l&apos;évaluation",
      details: ["5 traductions par mois", "Formats de base uniquement", "Support par email"]
    },
    {
      title: "Abonnements payants", 
      description: "Accès complet avec support prioritaire et fonctionnalités avancées",
      details: ["Traductions illimitées", "Tous formats supportés", "Support téléphonique"]
    },
    {
      title: "Services sur mesure",
      description: "Solutions personnalisées pour les entreprises et projets spécifiques",
      details: ["Tarification sur devis", "Account manager dédié", "SLA personnalisé"]
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
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Conditions d&apos;Utilisation
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Les règles et conditions qui régissent l&apos;utilisation de nos services 
                de traduction IndoFrench.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4" />
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Préambule</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Les présentes conditions générales d&apos;utilisation (CGU) régissent l&apos;accès et 
                  l&apos;utilisation des services proposés par IndoFrench SAS, société de traduction 
                  spécialisée dans la paire linguistique indonésien-français.
                </p>
                <p className="mb-4">
                  Ces conditions s&apos;appliquent à tous les utilisateurs de nos services, qu&apos;ils 
                  soient particuliers ou professionnels, et quel que soit le mode d&apos;accès 
                  (site web, applications mobiles, API).
                </p>
                <p>
                  L&apos;utilisation de nos services implique l&apos;acceptation pleine et entière de 
                  ces conditions. Nous vous invitons à les lire attentivement.
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

        {/* Pricing Information */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tarification et Facturation
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Informations importantes concernant nos différents plans et modalités de facturation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingInfo.map((plan, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{plan.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <ul className="space-y-2">
                    {plan.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Notice */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Informations Légales</h2>
              <div className="grid md:grid-cols-2 gap-8 text-center">
                <div>
                  <h4 className="font-semibold mb-3">Société</h4>
                  <div className="text-blue-100 space-y-1">
                    <p>IndoFrench SAS</p>
                    <p>Capital social : 100 000 €</p>
                    <p>RCS Paris : 123 456 789</p>
                    <p>SIRET : 123 456 789 00012</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Contact</h4>
                  <div className="text-blue-100 space-y-1">
                    <p>123 Rue de la Traduction</p>
                    <p>75001 Paris, France</p>
                    <p>legal@indofrench.com</p>
                    <p>+33 1 23 45 67 89</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-blue-400 text-center">
                <p className="text-blue-100 text-sm">
                  Droit applicable : Droit français - Juridiction compétente : Tribunaux de Paris
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-gray-50 rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Questions sur nos conditions ?
              </h3>
              <p className="text-gray-600 mb-6">
                Notre équipe juridique est à votre disposition pour répondre à 
                toutes vos questions concernant ces conditions d&apos;utilisation.
              </p>
              <a
                href="mailto:legal@indofrench.com"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Scale className="w-5 h-5" />
                <span>Contacter notre service juridique</span>
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
