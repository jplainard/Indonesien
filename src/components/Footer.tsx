'use client';

import { motion } from 'framer-motion';
import { 
  Languages, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const footerLinks = {
    company: [
      { label: 'À propos', href: '/about' },
      { label: 'Notre équipe', href: '/about#team' },
      { label: 'Carrières', href: '/careers' },
      { label: 'Actualités', href: '/news' }
    ],
    services: [
      { label: 'Traduction', href: '/translate' },
      { label: 'Tarifs', href: '/pricing' },
      { label: 'API', href: '/docs/api' },
      { label: 'Entreprises', href: '/enterprise' }
    ],
    support: [
      { label: 'Centre d\'aide', href: '/help' },
      { label: 'Contact', href: '/contact' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Statut système', href: '/status' }
    ],
    legal: [
      { label: 'Confidentialité', href: '/privacy' },
      { label: 'Conditions', href: '/terms' },
      { label: 'Mentions légales', href: '/legal' },
      { label: 'RGPD', href: '/gdpr' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/indofrench', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/indofrench', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/indofrench', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/indofrench', label: 'Instagram' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'contact@indofrench.com', href: 'mailto:contact@indofrench.com' },
    { icon: Phone, text: '+33 1 23 45 67 89', href: 'tel:+33123456789' },
    { icon: MapPin, text: '123 Rue de la Traduction, 75001 Paris', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Restez informé de nos nouveautés
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Recevez nos dernières actualités, conseils de traduction et 
              offres spéciales directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <motion.button
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                S'abonner
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="/" className="flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Languages className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold">IndoFrench</span>
                </Link>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Votre partenaire de confiance pour la traduction professionnelle 
                  entre l'indonésien et le français. Qualité, rapidité et 
                  confidentialité garanties.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  {contactInfo.map((contact, index) => {
                    const Icon = contact.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3 text-gray-400">
                        <Icon className="w-4 h-4" />
                        {contact.href !== '#' ? (
                          <a 
                            href={contact.href} 
                            className="hover:text-white transition-colors"
                          >
                            {contact.text}
                          </a>
                        ) : (
                          <span>{contact.text}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], sectionIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-6 capitalize">
                  {category === 'company' ? 'Entreprise' :
                   category === 'services' ? 'Services' :
                   category === 'support' ? 'Support' :
                   'Légal'}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors flex items-center group"
                      >
                        {link.label}
                        {link.href.startsWith('http') && (
                          <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} IndoFrench. Tous droits réservés.
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-2 text-gray-400">
              <Languages className="w-4 h-4" />
              <select className="bg-transparent text-gray-400 text-sm focus:outline-none hover:text-white transition-colors">
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
              </select>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
