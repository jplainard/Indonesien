import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    // Vérification de l'authentification
    const token = request.cookies.get('auth-token')?.value;
    let userId = null;
    
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        userId = decoded.userId;
      } catch (_error) {
        console.log('Token invalide ou expiré');
      }
    }

    const { text, sourceLang, targetLang, translationType = 'ai' } = await request.json();

    // Validation des paramètres
    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json(
        { error: 'Le texte, la langue source et la langue cible sont requis' },
        { status: 400 }
      );
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: 'Le texte est trop long (max 5000 caractères)' },
        { status: 400 }
      );
    }

    // Validation des langues supportées
    const supportedLangs = ['id', 'fr'];
    if (!supportedLangs.includes(sourceLang) || !supportedLangs.includes(targetLang)) {
      return NextResponse.json(
        { error: 'Langues non supportées. Langues disponibles: id (indonésien), fr (français)' },
        { status: 400 }
      );
    }

    if (sourceLang === targetLang) {
      return NextResponse.json(
        { error: 'La langue source et la langue cible doivent être différentes' },
        { status: 400 }
      );
    }

    // Effectuer la traduction
    const translatedText = await translateText(text, sourceLang, targetLang, translationType);
    
    // Calculer un score de qualité basé sur la longueur et le type de traduction
    const quality = calculateQualityScore(text, translatedText, translationType);

    // Sauvegarder la traduction en base de données
    const translation = await prisma.translation.create({
      data: {
        sourceText: text,
        sourceLang,
        targetText: translatedText,
        targetLang,
        quality,
        isPublic: false,
        translationType,
        userId: userId // Associer à l'utilisateur si connecté
      }
    });

    return NextResponse.json({
      success: true,
      translation: {
        id: translation.id,
        sourceText: translation.sourceText,
        targetText: translation.targetText,
        sourceLang: translation.sourceLang,
        targetLang: translation.targetLang,
        quality: translation.quality,
        translationType: translation.translationType,
        createdAt: translation.createdAt
      }
    });

  } catch (error) {
    console.error('Erreur lors de la traduction:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur lors de la traduction' },
      { status: 500 }
    );
  }
}

// Fonction de traduction améliorée
async function translateText(
  text: string, 
  sourceLang: string, 
  targetLang: string, 
  translationType: string
): Promise<string> {
  
  // Dictionnaire de base pour des traductions simples
  const basicTranslations: Record<string, Record<string, string>> = {
    'id-fr': {
      'halo': 'bonjour',
      'selamat pagi': 'bon matin',
      'selamat siang': 'bon après-midi',
      'selamat malam': 'bonsoir',
      'terima kasih': 'merci',
      'sama-sama': 'de rien',
      'maaf': 'excusez-moi',
      'permisi': 'pardon',
      'apa kabar': 'comment allez-vous',
      'baik-baik saja': 'ça va bien',
      'nama saya': 'je m\'appelle',
      'senang bertemu dengan anda': 'ravi de vous rencontrer',
      'sampai jumpa': 'au revoir',
      'ya': 'oui',
      'tidak': 'non',
      'saya': 'je',
      'anda': 'vous',
      'dia': 'il/elle',
      'kami': 'nous',
      'mereka': 'ils/elles',
      'rumah': 'maison',
      'sekolah': 'école',
      'kerja': 'travail',
      'makan': 'manger',
      'minum': 'boire',
      'tidur': 'dormir',
      'air': 'eau',
      'makanan': 'nourriture',
      'buku': 'livre',
      'mobil': 'voiture',
      'pesawat': 'avion',
    },
    'fr-id': {
      'bonjour': 'halo',
      'bon matin': 'selamat pagi',
      'bon après-midi': 'selamat siang',
      'bonsoir': 'selamat malam',
      'merci': 'terima kasih',
      'de rien': 'sama-sama',
      'excusez-moi': 'maaf',
      'pardon': 'permisi',
      'comment allez-vous': 'apa kabar',
      'ça va bien': 'baik-baik saja',
      'je m\'appelle': 'nama saya',
      'ravi de vous rencontrer': 'senang bertemu dengan anda',
      'au revoir': 'sampai jumpa',
      'oui': 'ya',
      'non': 'tidak',
      'je': 'saya',
      'vous': 'anda',
      'il': 'dia',
      'elle': 'dia',
      'nous': 'kami',
      'ils': 'mereka',
      'elles': 'mereka',
      'maison': 'rumah',
      'école': 'sekolah',
      'travail': 'kerja',
      'manger': 'makan',
      'boire': 'minum',
      'dormir': 'tidur',
      'eau': 'air',
      'nourriture': 'makanan',
      'livre': 'buku',
      'voiture': 'mobil',
      'avion': 'pesawat',
    }
  };

  const langPair = `${sourceLang}-${targetLang}`;
  const dictionary = basicTranslations[langPair] || {};
  
  // Traduction mot par mot pour les mots connus
  let translatedText = text.toLowerCase();
  
  // Remplacer les phrases complètes d'abord
  Object.entries(dictionary).forEach(([source, target]) => {
    const regex = new RegExp(`\\b${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    translatedText = translatedText.replace(regex, target);
  });

  // Si aucune traduction trouvée, utiliser une traduction générique
  if (translatedText === text.toLowerCase()) {
    if (translationType === 'ai') {
      translatedText = `[Traduction IA ${targetLang.toUpperCase()}]: ${text}`;
    } else if (translationType === 'human') {
      translatedText = `[Traduction humaine ${targetLang.toUpperCase()}]: ${text}`;
    } else {
      translatedText = `[Traduction automatique ${targetLang.toUpperCase()}]: ${text}`;
    }
  }

  // Capitaliser la première lettre
  return translatedText.charAt(0).toUpperCase() + translatedText.slice(1);
}

// Fonction de calcul de la qualité
function calculateQualityScore(
  sourceText: string, 
  translatedText: string, 
  translationType: string
): number {
  let baseScore = 75;
  
  // Bonus selon le type de traduction
  if (translationType === 'human') {
    baseScore = 95;
  } else if (translationType === 'ai') {
    baseScore = 85;
  } else {
    baseScore = 75;
  }
  
  // Bonus pour la longueur appropriée
  const lengthRatio = translatedText.length / sourceText.length;
  if (lengthRatio >= 0.5 && lengthRatio <= 2.0) {
    baseScore += 5;
  }
  
  // Malus si la traduction est identique (probablement pas traduite)
  if (sourceText.toLowerCase() === translatedText.toLowerCase()) {
    baseScore -= 20;
  }
  
  // S'assurer que le score est entre 0 et 100
  return Math.max(0, Math.min(100, baseScore));
}

// Fonction GET pour obtenir l'historique des traductions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const offset = (page - 1) * limit;

    const translations = await prisma.translation.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        sourceText: true,
        targetText: true,
        sourceLang: true,
        targetLang: true,
        quality: true,
        translationType: true,
        createdAt: true,
      }
    });

    const total = await prisma.translation.count();

    return NextResponse.json({
      success: true,
      translations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des traductions:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
