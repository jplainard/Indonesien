"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Globe, BarChart3, Star, Shield, Clock, ArrowRight } from 'lucide-react';
import MainLayout from '../../components/MainLayout';

interface MarketData {
  totalMarketSize: number; // en milliards USD
  growthRate: number; // pourcentage annuel
  competitionLevel: 'low' | 'medium' | 'high';
  timeToMarket: number; // en mois
  regulatoryComplexity: 'simple' | 'medium' | 'complex';
  localPartnershipNeed: boolean;
  languageBarrier: 'low' | 'medium' | 'high';
  culturalAdaptation: 'minimal' | 'moderate' | 'extensive';
}

const SECTOR_DATA: Record<string, MarketData> = {
  technology: {
    totalMarketSize: 44.2,
    growthRate: 24.5,
    competitionLevel: 'high',
    timeToMarket: 8,
    regulatoryComplexity: 'medium',
    localPartnershipNeed: true,
    languageBarrier: 'medium',
    culturalAdaptation: 'moderate'
  },
  ecommerce: {
    totalMarketSize: 53.2,
    growthRate: 31.2,
    competitionLevel: 'high',
    timeToMarket: 6,
    regulatoryComplexity: 'complex',
    localPartnershipNeed: true,
    languageBarrier: 'high',
    culturalAdaptation: 'extensive'
  },
  finance: {
    totalMarketSize: 124.7,
    growthRate: 18.9,
    competitionLevel: 'medium',
    timeToMarket: 12,
    regulatoryComplexity: 'complex',
    localPartnershipNeed: true,
    languageBarrier: 'high',
    culturalAdaptation: 'extensive'
  },
  manufacturing: {
    totalMarketSize: 267.3,
    growthRate: 8.4,
    competitionLevel: 'medium',
    timeToMarket: 18,
    regulatoryComplexity: 'complex',
    localPartnershipNeed: true,
    languageBarrier: 'medium',
    culturalAdaptation: 'moderate'
  },
  healthcare: {
    totalMarketSize: 42.8,
    growthRate: 15.6,
    competitionLevel: 'medium',
    timeToMarket: 24,
    regulatoryComplexity: 'complex',
    localPartnershipNeed: true,
    languageBarrier: 'high',
    culturalAdaptation: 'extensive'
  },
  education: {
    totalMarketSize: 12.4,
    growthRate: 22.1,
    competitionLevel: 'low',
    timeToMarket: 9,
    regulatoryComplexity: 'medium',
    localPartnershipNeed: false,
    languageBarrier: 'high',
    culturalAdaptation: 'extensive'
  },
  logistics: {
    totalMarketSize: 89.1,
    growthRate: 12.3,
    competitionLevel: 'medium',
    timeToMarket: 15,
    regulatoryComplexity: 'complex',
    localPartnershipNeed: true,
    languageBarrier: 'medium',
    culturalAdaptation: 'moderate'
  },
  food: {
    totalMarketSize: 156.8,
    growthRate: 7.2,
    competitionLevel: 'high',
    timeToMarket: 12,
    regulatoryComplexity: 'complex',
    localPartnershipNeed: true,
    languageBarrier: 'high',
    culturalAdaptation: 'extensive'
  },
  tourism: {
    totalMarketSize: 68.9,
    growthRate: 25.7,
    competitionLevel: 'medium',
    timeToMarket: 6,
    regulatoryComplexity: 'medium',
    localPartnershipNeed: false,
    languageBarrier: 'high',
    culturalAdaptation: 'extensive'
  },
  energy: {
    totalMarketSize: 98.5,
    growthRate: 14.8,
    competitionLevel: 'low',
    timeToMarket: 36,
    regulatoryComplexity: 'complex',
    localPartnershipNeed: true,
    languageBarrier: 'medium',
    culturalAdaptation: 'moderate'
  }
};

export default function MarketCalculator() {
  const [formData, setFormData] = useState({
    company: '',
    sector: '',
    currentRevenue: '',
    targetMarket: '',
    timeframe: '12'
  });
  
  const [analysis, setAnalysis] = useState<{
    marketSize: number;
    growthRate: number;
    potentialRevenue: number;
    competitionLevel: string;
    timeToMarket: number;
    translationNeed: { pages: number; documents: number; budget: number; level: string };
    culturalAdaptation: string;
    roi: number;
    marketAccessibility: { score: number; level: string };
    recommendedStrategy: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateAnalysis = () => {
    if (!formData.sector || !formData.currentRevenue) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const marketData = SECTOR_DATA[formData.sector];
      const currentRev = parseFloat(formData.currentRevenue) || 0;
      
      // Calculs basés sur les données réelles du marché indonésien
      const marketPenetrationRate = Math.min(15, currentRev / 10000); // 15% max
      const potentialRevenue = (marketData.totalMarketSize * 1000000000 * marketPenetrationRate) / 100;
      
      // Calcul ROI basé sur plusieurs facteurs
      const competitionMultiplier = marketData.competitionLevel === 'low' ? 1.5 : marketData.competitionLevel === 'medium' ? 1.0 : 0.7;
      const growthMultiplier = marketData.growthRate / 100 + 1;
      const roi = Math.round((potentialRevenue / (currentRev * 0.3)) * competitionMultiplier * growthMultiplier * 100) / 100;
      
      // Besoins de traduction basés sur le secteur
      const getTranslationNeeds = (sector: string, revenue: number) => {
        const baseFactor = revenue > 1000000 ? 1.5 : revenue > 100000 ? 1.0 : 0.7;
        const sectors = {
          technology: { pages: 120, docs: 25, budget: 15000, level: 'technique' },
          ecommerce: { pages: 200, docs: 40, budget: 25000, level: 'marketing' },
          finance: { pages: 300, docs: 60, budget: 45000, level: 'juridique' },
          manufacturing: { pages: 150, docs: 35, budget: 18000, level: 'technique' },
          healthcare: { pages: 250, docs: 50, budget: 35000, level: 'médical' },
          education: { pages: 180, docs: 30, budget: 20000, level: 'pédagogique' },
          logistics: { pages: 100, docs: 20, budget: 12000, level: 'opérationnel' },
          food: { pages: 90, docs: 25, budget: 15000, level: 'réglementaire' },
          tourism: { pages: 160, docs: 35, budget: 22000, level: 'marketing' },
          energy: { pages: 220, docs: 45, budget: 30000, level: 'technique' }
        };
        
        const base = sectors[sector as keyof typeof sectors] || sectors.technology;
        return {
          pages: Math.round(base.pages * baseFactor),
          documents: Math.round(base.docs * baseFactor),
          budget: Math.round(base.budget * baseFactor),
          level: base.level
        };
      };

      // Score d'accessibilité du marché
      const getMarketAccessibility = (marketData: MarketData) => {
        let score = 100;
        if (marketData.competitionLevel === 'high') score -= 30;
        else if (marketData.competitionLevel === 'medium') score -= 15;
        if (marketData.regulatoryComplexity === 'complex') score -= 25;
        else if (marketData.regulatoryComplexity === 'medium') score -= 10;
        if (marketData.languageBarrier === 'high') score -= 20;
        else if (marketData.languageBarrier === 'medium') score -= 10;
        
        const level = score >= 80 ? 'Excellent' : score >= 60 ? 'Bon' : score >= 40 ? 'Moyen' : 'Difficile';
        return { score, level };
      };

      // Stratégies recommandées
      const getRecommendedStrategies = (marketData: MarketData) => {
        const strategies = [];
        if (marketData.localPartnershipNeed) strategies.push('Partenariat local');
        if (marketData.culturalAdaptation === 'extensive') strategies.push('Localisation poussée');
        if (marketData.regulatoryComplexity === 'complex') strategies.push('Accompagnement juridique');
        if (marketData.growthRate > 20) strategies.push('Entrée rapide');
        if (marketData.competitionLevel === 'high') strategies.push('Différenciation forte');
        return strategies.length > 0 ? strategies : ['Approche progressive'];
      };

      setAnalysis({
        marketSize: marketData.totalMarketSize,
        growthRate: marketData.growthRate,
        potentialRevenue,
        competitionLevel: marketData.competitionLevel,
        timeToMarket: marketData.timeToMarket,
        translationNeed: getTranslationNeeds(formData.sector, currentRev),
        culturalAdaptation: marketData.culturalAdaptation,
        roi,
        marketAccessibility: getMarketAccessibility(marketData),
        recommendedStrategy: getRecommendedStrategies(marketData)
      });
      
      setIsLoading(false);
    }, 2000);
  };

  const getCompetitionColor = (level: string) => {
    switch(level) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
              🇮🇩 Indonésie : 4ème économie mondiale • 277M consommateurs • +5% croissance PIB
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Calculateur de Potentiel
              <span className="block text-red-600 mt-2">Marché Indonésien</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez en 2 minutes le potentiel réel de votre expansion en Indonésie
              et les besoins de traduction/localisation pour y accéder.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Calculator className="w-6 h-6 mr-3 text-blue-600" />
                Informations sur votre entreprise
              </h2>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de votre entreprise
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: MonEntreprise SAS"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secteur d'activité
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez votre secteur</option>
                    <option value="technology">Technologie & IT</option>
                    <option value="ecommerce">E-commerce & Retail</option>
                    <option value="finance">Services financiers</option>
                    <option value="manufacturing">Industrie & Manufacturing</option>
                    <option value="healthcare">Santé & Pharmaceutique</option>
                    <option value="education">Éducation & Formation</option>
                    <option value="logistics">Logistique & Transport</option>
                    <option value="food">Agroalimentaire</option>
                    <option value="tourism">Tourisme & Hôtellerie</option>
                    <option value="energy">Énergie & Environnement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chiffre d'affaires annuel actuel (€)
                  </label>
                  <select
                    value={formData.currentRevenue}
                    onChange={(e) => setFormData({ ...formData, currentRevenue: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez votre CA</option>
                    <option value="50000">Moins de 100K€</option>
                    <option value="250000">100K€ - 500K€</option>
                    <option value="750000">500K€ - 1M€</option>
                    <option value="2500000">1M€ - 5M€</option>
                    <option value="7500000">5M€ - 10M€</option>
                    <option value="25000000">10M€ - 50M€</option>
                    <option value="75000000">Plus de 50M€</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marché cible en Indonésie
                  </label>
                  <select
                    value={formData.targetMarket}
                    onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez votre cible</option>
                    <option value="jakarta">Jakarta (métropole)</option>
                    <option value="major_cities">Grandes villes (Surabaya, Bandung, Medan)</option>
                    <option value="java">Île de Java</option>
                    <option value="national">National</option>
                    <option value="asean">ASEAN via l'Indonésie</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horizon de lancement souhaité
                  </label>
                  <select
                    value={formData.timeframe}
                    onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="6">Dans 6 mois</option>
                    <option value="12">Dans 1 an</option>
                    <option value="18">Dans 18 mois</option>
                    <option value="24">Dans 2 ans</option>
                    <option value="36">Dans 3 ans</option>
                  </select>
                </div>

                <motion.button
                  type="button"
                  onClick={calculateAnalysis}
                  disabled={!formData.sector || !formData.currentRevenue || isLoading}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Analyse en cours...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-5 h-5" />
                      Analyser mon potentiel
                    </>
                  )}
                </motion.button>

                <div className="text-center">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    <ArrowRight className="w-4 h-4 inline mr-2" />
                    Planifier un entretien stratégique (30min)
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Résultats */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {!analysis ? (
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Prêt pour l'analyse
                  </h3>
                  <p className="text-gray-500">
                    Remplissez le formulaire pour découvrir votre potentiel indonésien
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
                    Votre Analyse Personnalisée
                  </h2>

                  {/* Métriques principales */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        ${analysis.marketSize}Md
                      </div>
                      <div className="text-sm text-gray-600">Taille du marché</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        +{analysis.growthRate}%
                      </div>
                      <div className="text-sm text-gray-600">Croissance annuelle</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {analysis.timeToMarket}m
                      </div>
                      <div className="text-sm text-gray-600">Temps d'entrée</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        x{analysis.roi}
                      </div>
                      <div className="text-sm text-gray-600">ROI estimé</div>
                    </div>
                  </div>

                  {/* Potentiel de revenus */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Potentiel de revenus</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      €{(analysis.potentialRevenue / 1000000).toFixed(1)}M
                    </div>
                    <p className="text-sm text-gray-600">
                      Revenus potentiels à 3 ans avec 15% de pénétration marché
                    </p>
                  </div>

                  {/* Competition et accessibilité */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Concurrence</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCompetitionColor(analysis.competitionLevel)}`}>
                        {analysis.competitionLevel === 'low' ? 'Faible' : 
                         analysis.competitionLevel === 'medium' ? 'Modérée' : 'Élevée'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Accessibilité</h4>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold">{analysis.marketAccessibility.score}/100</div>
                        <div className="text-sm text-gray-600">{analysis.marketAccessibility.level}</div>
                      </div>
                    </div>
                  </div>

                  {/* Besoins de traduction */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Besoins de localisation
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xl font-bold">{analysis.translationNeed.pages}</div>
                        <div className="text-sm text-gray-600">Pages à traduire</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold">{analysis.translationNeed.documents}</div>
                        <div className="text-sm text-gray-600">Documents business</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Budget traduction estimé:</span>
                      <span className="font-bold">€{analysis.translationNeed.budget.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Spécialisation: {analysis.translationNeed.level}
                    </div>
                  </div>

                  {/* Stratégies recommandées */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Stratégies recommandées</h3>
                    <div className="space-y-2">
                      {analysis.recommendedStrategy.map((strategy, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">{strategy}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg text-center">
                    <h3 className="text-lg font-semibold mb-2">Prêt à commencer ?</h3>
                    <p className="text-sm mb-4 opacity-90">
                      Discutons de votre stratégie d'expansion personnalisée
                    </p>
                    <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Réserver un entretien gratuit
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Footer social proof */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-gray-600 mb-4">
              Plus de 147 entreprises nous font confiance pour leur expansion indonésienne.
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>4.9/5 satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>ISO 17100</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Livraison rapide</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
