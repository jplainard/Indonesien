"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Clock, 
  Star, 
  Calendar,
  Languages,
  Search,
  ChevronDown
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import MainLayout from '../../components/MainLayout';

interface Translation {
  id: number;
  sourceText: string;
  targetText: string;
  sourceLang: string;
  targetLang: string;
  quality: number | null;
  translationType: string;
  createdAt: string;
}

interface UserTranslations {
  translations: Translation[];
  totalCount: number;
  averageQuality: number;
}

export default function MesTraductionsPage() {
  const [data, setData] = useState<UserTranslations | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTranslation, setSelectedTranslation] = useState<Translation | null>(null);
  const [filter, setFilter] = useState<string>('all'); // all, ai, human
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'quality'>('date');
  const router = useRouter();

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch('/api/my-translations');
        const result = await response.json();

        if (response.ok) {
          setData(result);
        } else if (response.status === 401) {
          router.push('/auth');
        }
      } catch (_error) {
        router.push('/auth');
      } finally {
        setLoading(false);
      }
    };
    fetchTranslations();
  }, [router]);

  const getLanguageName = (code: string) => {
    const languages: Record<string, string> = {
      'id': 'Indonésien',
      'fr': 'Français',
      'en': 'Anglais'
    };
    return languages[code] || code.toUpperCase();
  };

  const getTranslationTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'ai': 'IA',
      'human': 'Humaine',
      'auto': 'Automatique'
    };
    return types[type] || type;
  };

  const filteredTranslations = data?.translations?.filter(t => {
    const matchesFilter = filter === 'all' || t.translationType === filter;
    const matchesSearch = searchTerm === '' || 
      t.sourceText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.targetText.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return (b.quality || 0) - (a.quality || 0);
    }
  }) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de vos traductions...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <MainLayout 
      title={
        <span className="inline-flex items-center gap-2 text-2xl font-extrabold bg-gradient-to-r from-purple-700 via-blue-600 to-green-500 bg-clip-text text-transparent drop-shadow-sm">
          <Clock className="w-7 h-7" /> 
          Mes traductions
        </span>
      }
      description={
        <span className="text-base text-gray-700 font-medium">
          Retrouvez l&apos;historique de toutes vos traductions ({data.totalCount} au total)
        </span>
      }
    >
      <div className="space-y-6">
        {/* Statistiques en en-tête */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 rounded-lg p-3">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total traductions</p>
                <p className="text-2xl font-bold text-gray-900">{data.totalCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 rounded-lg p-3">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Qualité moyenne</p>
                <p className="text-2xl font-bold text-gray-900">{data.averageQuality}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 rounded-lg p-3">
                <Languages className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Langues utilisées</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Array.from(new Set(data.translations.map(t => `${t.sourceLang}-${t.targetLang}`))).length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filtres et recherche */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher dans vos traductions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtre par type */}
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les types</option>
                <option value="ai">IA</option>
                <option value="human">Humaine</option>
                <option value="auto">Automatique</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Tri */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'quality')}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Plus récent</option>
                <option value="quality">Meilleure qualité</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Liste des traductions */}
        <div className="space-y-4">
          {filteredTranslations.length === 0 ? (
            <motion.div
              className="bg-white rounded-xl p-12 shadow-sm border text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm || filter !== 'all' ? 'Aucun résultat' : 'Aucune traduction'}
              </h3>
              <p className="text-gray-600">
                {searchTerm || filter !== 'all' 
                  ? 'Essayez de modifier vos filtres de recherche.'
                  : 'Commencez à traduire pour voir votre historique ici.'
                }
              </p>
            </motion.div>
          ) : (
            filteredTranslations.map((translation, index) => (
              <motion.div
                key={translation.id}
                className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                onClick={() => setSelectedTranslation(translation)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {getLanguageName(translation.sourceLang)} → {getLanguageName(translation.targetLang)}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {getTranslationTypeLabel(translation.translationType)}
                      </span>
                      {translation.quality && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {translation.quality}%
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-900 font-medium mb-2 line-clamp-2">
                      {translation.sourceText.substring(0, 150)}
                      {translation.sourceText.length > 150 && '...'}
                    </p>
                    
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {translation.targetText.substring(0, 150)}
                      {translation.targetText.length > 150 && '...'}
                    </p>
                  </div>
                  
                  <div className="ml-4 text-right">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(translation.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      {new Date(translation.createdAt).toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Modal de détail */}
        {selectedTranslation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Détail de la traduction</h2>
                  <button
                    onClick={() => setSelectedTranslation(null)}
                    className="text-gray-500 hover:text-gray-700 p-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Texte source ({getLanguageName(selectedTranslation.sourceLang)})</h3>
                    <div className="bg-gray-50 rounded-lg p-4 border">
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedTranslation.sourceText}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Traduction ({getLanguageName(selectedTranslation.targetLang)})</h3>
                    <div className="bg-blue-50 rounded-lg p-4 border">
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedTranslation.targetText}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Type de traduction</p>
                    <p className="font-medium">{getTranslationTypeLabel(selectedTranslation.translationType)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Qualité</p>
                    <p className="font-medium">{selectedTranslation.quality || '—'}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">
                      {new Date(selectedTranslation.createdAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
