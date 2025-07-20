'use client';

import { motion } from 'framer-motion';
import { Building, Users, Phone, Mail, MapPin, FileText, Scale, Globe } from 'lucide-react';
import MainLayout from '@/components/MainLayout';

export default function LegalPage() {
  const companyInfo = {
    name: "IndoFrench SAS",
    address: "123 Rue de la Traduction, 75001 Paris, France",
    capital: "100 000 €",
    rcs: "RCS Paris 123 456 789",
    siret: "123 456 789 00012",
    tva: "FR12345678912",
    phone: "+33 1 23 45 67 89",
    email: "legal@indofrench.com"
  };

  const directors = [
    {
      name: "Marie Dubois",
      role: "Directrice Générale",
      qualification: "Master en Traduction, 15 ans d'expérience"
    },
    {
      name: "Ahmad Wijaya", 
      role: "Directeur Technique",
      qualification: "Ingénieur Informatique, Expert en IA linguistique"
    },
    {
      name: "Sophie Martin",
      role: "Directrice Juridique",
      qualification: "Avocat au Barreau de Paris, Droit des sociétés"
    }
  ];

  const licenses = [
    {
      title: "Licence de Traduction Professionnelle",
      authority: "Ministère de la Culture - France",
      number: "LTP-2023-001245",
      validity: "Valide jusqu'au 31/12/2025"
    },
    {
      title: "Certification ISO 17100",
      authority: "Organisme de certification AFNOR",
      number: "ISO17100-FR-2024-089",
      validity: "Valide jusqu'au 15/06/2027"
    },
    {
      title: "Agrément Traduction Assermentée",
      authority: "Cour d'Appel de Paris",
      number: "TAP-2024-156",
      validity: "Valide jusqu'au 01/09/2026"
    }
  ];

  const compliance = [
    {
      icon: Scale,
      title: "Conformité RGPD",
      description: "Respect total du Règlement Général sur la Protection des Données",
      details: [
        "Délégué à la Protection des Données nommé",
        "Registre des traitements tenu à jour",
        "Audit de conformité annuel réalisé",
        "Formation RGPD du personnel effectuée"
      ]
    },
    {
      icon: FileText,
      title: "Obligations légales",
      description: "Respect de toutes les réglementations applicables",
      details: [
        "Déclaration CNIL effectuée",
        "Respect du Code de la consommation",
        "Conformité aux lois sur la traduction",
        "Respect des normes professionnelles"
      ]
    },
    {
      icon: Globe,
      title: "Normes internationales",
      description: "Certification selon les standards internationaux",
      details: [
        "Norme ISO 17100 pour les services de traduction",
        "Norme ISO 9001 pour la qualité",
        "Respect des standards européens",
        "Certification sécurité informatique"
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
                  <Building className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Mentions Légales
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Informations légales et réglementaires sur la société IndoFrench 
                et nos services de traduction.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Information */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="w-6 h-6 mr-3 text-blue-600" />
                Informations sur la Société
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Identification</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start space-x-3">
                      <span className="font-medium w-20">Nom :</span>
                      <span>{companyInfo.name}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="font-medium w-20">Capital :</span>
                      <span>{companyInfo.capital}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="font-medium w-20">RCS :</span>
                      <span>{companyInfo.rcs}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="font-medium w-20">SIRET :</span>
                      <span>{companyInfo.siret}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="font-medium w-20">TVA :</span>
                      <span>{companyInfo.tva}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{companyInfo.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <a href={`tel:${companyInfo.phone}`} className="hover:text-blue-600 transition-colors">
                        {companyInfo.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <a href={`mailto:${companyInfo.email}`} className="hover:text-blue-600 transition-colors">
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Management Team */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3 text-blue-600" />
                Direction et Administration
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {directors.map((director, index) => (
                  <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{director.name}</h4>
                    <p className="text-blue-600 font-medium mb-2">{director.role}</p>
                    <p className="text-gray-600 text-sm">{director.qualification}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Licenses and Certifications */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                Licences et Certifications
              </h2>
              
              <div className="space-y-6">
                {licenses.map((license, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">{license.title}</h4>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Valide
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Autorité :</span>
                        <p>{license.authority}</p>
                      </div>
                      <div>
                        <span className="font-medium">Numéro :</span>
                        <p>{license.number}</p>
                      </div>
                      <div>
                        <span className="font-medium">Validité :</span>
                        <p>{license.validity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Compliance */}
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
                Conformité et Réglementations
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Notre engagement pour le respect des normes les plus strictes 
                en matière de qualité et de conformité légale.
              </p>
            </motion.div>

            <div className="space-y-8">
              {compliance.map((item, index) => {
                const Icon = item.icon;
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
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <ul className="grid md:grid-cols-2 gap-3">
                          {item.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600 text-sm">{detail}</span>
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

        {/* Professional Insurance */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Assurance Professionnelle</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Responsabilité Civile Professionnelle</h4>
                  <div className="text-blue-100 space-y-2 text-sm">
                    <p><strong>Assureur :</strong> AXA France</p>
                    <p><strong>Police :</strong> RCP-2024-789456123</p>
                    <p><strong>Montant :</strong> 2 000 000 € par sinistre</p>
                    <p><strong>Validité :</strong> 01/01/2024 - 31/12/2024</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Protection Juridique</h4>
                  <div className="text-blue-100 space-y-2 text-sm">
                    <p><strong>Assureur :</strong> Allianz Protection Juridique</p>
                    <p><strong>Police :</strong> PJ-2024-456789</p>
                    <p><strong>Montant :</strong> 300 000 € par litige</p>
                    <p><strong>Validité :</strong> 01/01/2024 - 31/12/2024</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Legal Disclaimer */}
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
                Informations Juridiques Complémentaires
              </h3>
              <div className="text-gray-600 space-y-4 text-sm">
                <p>
                  <strong>Droit applicable :</strong> Toutes les relations entre IndoFrench et ses clients 
                  sont soumises au droit français.
                </p>
                <p>
                  <strong>Juridiction compétente :</strong> En cas de litige, les tribunaux de Paris 
                  seront seuls compétents.
                </p>
                <p>
                  <strong>Hébergement :</strong> Ce site est hébergé par OVH SAS, 2 rue Kellermann, 
                  59100 Roubaix, France.
                </p>
                <p>
                  <strong>Développement :</strong> Site développé en interne par l'équipe technique IndoFrench.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
