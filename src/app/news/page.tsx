'use client';

import { motion } from 'framer-motion';
import { 
  Newspaper, 
  Calendar, 
  User, 
  ArrowRight, 
  Tag,
  Clock,
  Eye,
  Heart,
  Share2,
  Search,
  Filter
} from 'lucide-react';
import { useState } from 'react';
import MainLayout from '@/components/MainLayout';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Tout', count: 12 },
    { id: 'company', name: 'Entreprise', count: 4 },
    { id: 'product', name: 'Produits', count: 3 },
    { id: 'technology', name: 'Technologie', count: 2 },
    { id: 'partnerships', name: 'Partenariats', count: 2 },
    { id: 'awards', name: 'Récompenses', count: 1 }
  ];

  const featuredArticle = {
    id: 1,
    title: "IndoFrench lance sa nouvelle IA de traduction révolutionnaire",
    excerpt: "Notre équipe R&D dévoile une intelligence artificielle capable de comprendre les nuances culturelles indonésiennes et françaises pour des traductions d&apos;une précision inégalée.",
    content: "Après 18 mois de recherche et développement, IndoFrench est fier d&apos;annoncer le lancement de TradAI 3.0...",
    author: "Marie Dubois",
    authorRole: "Directrice R&D",
    publishedAt: "2025-07-15",
    readTime: "5 min",
    category: "technology",
    categoryName: "Technologie",
    views: 2547,
    likes: 89,
    image: "/api/placeholder/800/400",
    featured: true
  };

  const articles = [
    {
      id: 2,
      title: "Partenariat stratégique avec l&apos;Université Sorbonne",
      excerpt: "Un accord de recherche pour développer les futures technologies de traduction automatique et former la prochaine génération de linguistes.",
      author: "Ahmad Wijaya",
      authorRole: "Directeur Partenariats",
      publishedAt: "2025-07-12",
      readTime: "3 min",
      category: "partnerships",
      categoryName: "Partenariats",
      views: 1834,
      likes: 67,
      image: "/api/placeholder/400/300"
    },
    {
      id: 3,
      title: "IndoFrench remporte le Prix Innovation 2025",
      excerpt: "Notre plateforme de traduction collaborative a été récompensée au salon TechTranslate 2025 pour son approche innovante.",
      author: "Sophie Martin",
      authorRole: "Directrice Communication",
      publishedAt: "2025-07-10",
      readTime: "4 min",
      category: "awards",
      categoryName: "Récompenses",
      views: 3421,
      likes: 156,
      image: "/api/placeholder/400/300"
    },
    {
      id: 4,
      title: "Expansion en Asie du Sud-Est : Ouverture de Jakarta",
      excerpt: "Inauguration de notre nouveau bureau à Jakarta pour mieux servir nos clients indonésiens et développer notre présence régionale.",
      author: "Rudi Hartono",
      authorRole: "Directeur Régional Asie",
      publishedAt: "2025-07-08",
      readTime: "6 min",
      category: "company",
      categoryName: "Entreprise",
      views: 2156,
      likes: 98,
      image: "/api/placeholder/400/300"
    },
    {
      id: 5,
      title: "Nouvelle fonctionnalité : Traduction vocale temps réel",
      excerpt: "Découvrez notre nouvelle fonctionnalité de traduction vocale qui permet des conversations fluides entre locuteurs indonésiens et français.",
      author: "Lisa Chen",
      authorRole: "Chef Produit",
      publishedAt: "2025-07-05",
      readTime: "4 min",
      category: "product",
      categoryName: "Produits",
      views: 1923,
      likes: 134,
      image: "/api/placeholder/400/300"
    },
    {
      id: 6,
      title: "IndoFrench certifiée ISO 27001 pour la sécurité",
      excerpt: "Obtention de la certification ISO 27001 qui garantit les plus hauts standards de sécurité pour la protection des données clients.",
      author: "Marie Dubois",
      authorRole: "Directrice Générale",
      publishedAt: "2025-07-01",
      readTime: "3 min",
      category: "company",
      categoryName: "Entreprise",
      views: 1567,
      likes: 78,
      image: "/api/placeholder/400/300"
    },
    {
      id: 7,
      title: "Intégration avec Microsoft Office 365",
      excerpt: "Notre add-in pour Office 365 permet maintenant de traduire directement dans Word, Excel et PowerPoint sans quitter l&apos;application.",
      author: "Thomas Dubois",
      authorRole: "Développeur Senior",
      publishedAt: "2025-06-28",
      readTime: "5 min",
      category: "product",
      categoryName: "Produits",
      views: 2890,
      likes: 187,
      image: "/api/placeholder/400/300"
    },
    {
      id: 8,
      title: "Webinaire : L&apos;avenir de la traduction automatique",
      excerpt: "Rejoignez notre webinaire gratuit le 25 juillet pour découvrir les tendances et innovations dans le domaine de la traduction IA.",
      author: "Dr. Pierre Rousseau",
      authorRole: "Chercheur en IA",
      publishedAt: "2025-06-25",
      readTime: "2 min",
      category: "technology",
      categoryName: "Technologie",
      views: 1245,
      likes: 56,
      image: "/api/placeholder/400/300"
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
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
                  <Newspaper className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Actualités IndoFrench
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Découvrez les dernières nouvelles, innovations et événements 
                de l'univers IndoFrench. Restez informé de nos avancées 
                technologiques et de notre croissance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Rechercher dans les actualités..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="relative h-64 md:h-full bg-gradient-to-r from-blue-500 to-purple-600">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        À la Une
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {featuredArticle.categoryName}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm space-x-4">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(featuredArticle.publishedAt)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredArticle.readTime}</span>
                      </span>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredArticle.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{featuredArticle.author}</div>
                        <div className="text-sm text-gray-500">{featuredArticle.authorRole}</div>
                      </div>
                    </div>
                    
                    <motion.button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all inline-flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Lire l'article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.button>
                  </div>
                  
                  <div className="flex items-center space-x-6 mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{featuredArticle.views.toLocaleString()} vues</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{featuredArticle.likes} likes</span>
                    </span>
                    <button className="flex items-center space-x-1 hover:text-gray-700 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Partager</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white bg-opacity-90 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {article.categoryName}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{article.author}</div>
                          <div className="text-xs text-gray-500">{article.authorRole}</div>
                        </div>
                      </div>
                      
                      <motion.button
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.views.toLocaleString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{article.likes}</span>
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
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
                Ne Manquez Aucune Actualité
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Abonnez-vous à notre newsletter pour recevoir toutes nos actualités, 
                nouveautés produits et événements directement dans votre boîte mail.
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
        </section>
      </div>
    </MainLayout>
  );
}
