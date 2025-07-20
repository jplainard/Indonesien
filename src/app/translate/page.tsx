'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, ArrowLeftRight, Copy, Download, History } from 'lucide-react';
import Link from 'next/link';

interface Translation {
  id: number;
  sourceText: string;
  targetText: string;
  sourceLang: string;
  targetLang: string;
  quality: number;
  translationType: string;
  createdAt: string;
}

export default function TranslatePage() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('id');
  const [targetLang, setTargetLang] = useState('fr');
  const [translationType, setTranslationType] = useState('ai');
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState<number | null>(null);
  const [recentTranslations, setRecentTranslations] = useState<Translation[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLang,
          targetLang,
          translationType
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTranslatedText(data.translation.targetText);
        setQuality(data.translation.quality);
        loadRecentTranslations(); // Rafraîchir l'historique
      } else {
        alert(`Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Erreur lors de la traduction:', error);
      alert('Erreur lors de la traduction');
    } finally {
      setLoading(false);
    }
  };

  const loadRecentTranslations = async () => {
    try {
      const response = await fetch('/api/translate?limit=5');
      const data = await response.json();
      if (response.ok) {
        setRecentTranslations(data.translations);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique:', error);
    }
  };

  const swapLanguages = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    
    // Échanger aussi les textes
    const tempText = sourceText;
    setSourceText(translatedText);
    setTranslatedText(tempText);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Vous pourriez ajouter une notification toast ici
  };

  const downloadTranslation = () => {
    if (!translatedText) return;
    
    const content = `Traduction ${sourceLang.toUpperCase()} → ${targetLang.toUpperCase()}\\n\\nTexte original:\\n${sourceText}\\n\\nTexte traduit:\\n${translatedText}\\n\\nQualité: ${quality}%\\nType: ${translationType}\\nDate: ${new Date().toLocaleString('fr-FR')}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `traduction-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadTranslation = (translation: Translation) => {
    setSourceText(translation.sourceText);
    setTranslatedText(translation.targetText);
    setSourceLang(translation.sourceLang);
    setTargetLang(translation.targetLang);
    setQuality(translation.quality);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                IndoFrench
              </Link>
              <span className="ml-3 text-sm text-gray-500">Traduction Instantanée</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/upload"
                className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                Traduire des fichiers
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Language Selection */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Languages className="w-5 h-5" />
              Configuration de traduction
            </h2>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <History className="w-4 h-4" />
              Historique
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Langue source
              </label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="id">🇮🇩 Indonésien</option>
                <option value="fr">🇫🇷 Français</option>
              </select>
            </div>
            
            <div className="flex-shrink-0 mt-6">
              <button
                onClick={swapLanguages}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-100 rounded-full"
                title="Inverser les langues"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Langue cible
              </label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="fr">🇫🇷 Français</option>
                <option value="id">🇮🇩 Indonésien</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de traduction
              </label>
              <select
                value={translationType}
                onChange={(e) => setTranslationType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ai">🤖 Intelligence Artificielle</option>
                <option value="auto">⚡ Automatique</option>
                <option value="human">👤 Simulation Humaine</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Historique des traductions */}
        {showHistory && (
          <motion.div
            className="bg-white rounded-lg shadow-sm border p-6 mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h3 className="text-lg font-semibold mb-4">Traductions récentes</h3>
            {recentTranslations.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Aucune traduction récente</p>
            ) : (
              <div className="space-y-3">
                {recentTranslations.map((translation) => (
                  <div
                    key={translation.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => loadTranslation(translation)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm text-gray-600">
                        {translation.sourceLang.toUpperCase()} → {translation.targetLang.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(translation.createdAt).toLocaleString('fr-FR')}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-800 mb-1">
                        {translation.sourceText.substring(0, 100)}
                        {translation.sourceText.length > 100 && '...'}
                      </div>
                      <div className="text-gray-600">
                        {translation.targetText.substring(0, 100)}
                        {translation.targetText.length > 100 && '...'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={loadRecentTranslations}
              className="mt-4 w-full py-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              Actualiser l'historique
            </button>
          </motion.div>
        )}

        {/* Translation Interface */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Source Text */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">
                Texte source ({sourceLang.toUpperCase()})
              </h3>
            </div>
            <div className="p-4">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Entrez votre texte à traduire..."
                className="w-full h-48 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={5000}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {sourceText.length}/5000 caractères
                </span>
                <button
                  onClick={handleTranslate}
                  disabled={!sourceText.trim() || loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Traduction...' : 'Traduire'}
                </button>
              </div>
            </div>
          </div>

          {/* Translated Text */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">
                  Texte traduit ({targetLang.toUpperCase()})
                </h3>
                {quality && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Qualité:</span>
                    <span className={`text-sm font-semibold ${
                      quality >= 90 ? 'text-green-600' :
                      quality >= 75 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {quality}%
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <div className="w-full h-48 p-3 border border-gray-300 rounded-md bg-gray-50">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="h-full overflow-y-auto whitespace-pre-wrap">
                    {translatedText || 'La traduction apparaîtra ici...'}
                  </div>
                )}
              </div>
              <div className="flex justify-end items-center mt-2 space-x-2">
                <button
                  onClick={() => copyToClipboard(translatedText)}
                  disabled={!translatedText}
                  className="p-2 text-gray-600 hover:text-gray-800 disabled:text-gray-300 transition-colors"
                  title="Copier la traduction"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={downloadTranslation}
                  disabled={!translatedText}
                  className="p-2 text-gray-600 hover:text-gray-800 disabled:text-gray-300 transition-colors"
                  title="Télécharger la traduction"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Translation Buttons */}
        <motion.div
          className="mt-8 bg-white rounded-lg shadow-sm border p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4">Phrases courantes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { id: 'halo', fr: 'Bonjour' },
              { id: 'terima kasih', fr: 'Merci' },
              { id: 'apa kabar', fr: 'Comment allez-vous ?' },
              { id: 'nama saya', fr: 'Je m\'appelle' },
              { id: 'sampai jumpa', fr: 'Au revoir' },
              { id: 'selamat pagi', fr: 'Bon matin' }
            ].map((phrase) => (
              <button
                key={phrase.id}
                onClick={() => {
                  setSourceText(sourceLang === 'id' ? phrase.id : phrase.fr);
                  setSourceLang(sourceLang === 'id' ? 'id' : 'fr');
                  setTargetLang(targetLang === 'fr' ? 'fr' : 'id');
                }}
                className="p-3 text-left border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="text-sm font-medium">
                  {sourceLang === 'id' ? phrase.id : phrase.fr}
                </div>
                <div className="text-xs text-gray-500">
                  → {sourceLang === 'id' ? phrase.fr : phrase.id}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
