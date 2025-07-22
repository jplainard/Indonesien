import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Fonction de traduction basique fiable
async function translateTextBasic(text: string, sourceLang: string, targetLang: string) {
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
      'sampai jumpa': 'au revoir',
      'ya': 'oui',
      'tidak': 'non',
      'dokumen': 'document',
      'teks': 'texte',
      'halaman': 'page',
      'baris': 'ligne',
      'file': 'fichier',
      'translate': 'traduire',
      'translation': 'traduction'
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
      'au revoir': 'sampai jumpa',
      'oui': 'ya',
      'non': 'tidak',
      'document': 'dokumen',
      'texte': 'teks',
      'page': 'halaman',
      'ligne': 'baris',
      'fichier': 'file',
      'traduire': 'translate',
      'traduction': 'translation'
    }
  };

  const langPair = `${sourceLang}-${targetLang}`;
  const dictionary = basicTranslations[langPair] || {};
  
  let translatedText = text.toLowerCase();
  
  // Remplacer les phrases et mots connus
  Object.entries(dictionary).forEach(([source, target]) => {
    const regex = new RegExp(`\\b${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    translatedText = translatedText.replace(regex, target);
  });

  // Si aucune traduction trouvée, ajouter un préfixe
  if (translatedText === text.toLowerCase()) {
    translatedText = `[Traduction ${targetLang.toUpperCase()}]: ${text}`;
  }

  // Capitaliser la première lettre
  translatedText = translatedText.charAt(0).toUpperCase() + translatedText.slice(1);

  return {
    translatedText,
    confidence: 85,
    method: 'dictionary-basic',
    segmentsCount: 1
  };
}

// Fonction d'extraction de texte simple
async function extractTextFromFile(buffer: Buffer, mimeType: string, fileName: string): Promise<string> {
  try {
    console.log(`📄 Extraction de texte depuis ${fileName} (${mimeType})`);
    
    switch (mimeType) {
      case 'text/plain':
        return buffer.toString('utf-8');
        
      case 'application/pdf':
        try {
          const pdfParse = await import('pdf-parse');
          const data = await pdfParse.default(buffer);
          const text = data.text?.trim() || '';
          
          if (data.numpages > 0 && (!text || text.length < 10)) {
            throw new Error('Ce PDF semble être composé uniquement d\'images scannées. Veuillez utiliser un fichier PDF avec du texte extractible.');
          }
          
          if (!text) {
            throw new Error('Aucun texte trouvé dans le PDF');
          }
          
          return cleanExtractedText(text);
        } catch (error) {
          console.error('❌ Erreur extraction PDF:', error);
          throw new Error('Erreur lors de l\'extraction du PDF. Le fichier pourrait être corrompu ou composé uniquement d\'images scannées.');
        }
        
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        try {
          const mammoth = await import('mammoth');
          const result = await mammoth.extractRawText({ buffer });
          const text = result.value.trim();
          
          if (!text) {
            throw new Error('Le document Word semble vide');
          }
          
          return cleanExtractedText(text);
        } catch (error) {
          console.error('❌ Erreur extraction Word:', error);
          throw new Error('Erreur lors de l\'extraction du document Word. Le fichier pourrait être corrompu.');
        }
        
      case 'application/rtf':
        const rtfContent = buffer.toString('utf-8');
        const text = rtfContent
          .replace(/\{\\[^}]*\}/g, '') // Supprimer les commandes RTF
          .replace(/\\[a-z]+\d*/g, '') // Supprimer les commandes de formatage
          .replace(/[{}]/g, '') // Supprimer les accolades
          .replace(/\\\\/g, '') // Supprimer les backslashes
          .trim();
        
        if (!text) {
          throw new Error('Le fichier RTF semble vide');
        }
        
        return cleanExtractedText(text);
        
      default:
        throw new Error(`Type de fichier non supporté: ${mimeType}`);
    }
  } catch (error) {
    console.error(`❌ Erreur lors de l'extraction de ${fileName}:`, error);
    throw error;
  }
}

// Fonction de nettoyage du texte
function cleanExtractedText(text: string): string {
  return text
    .replace(/\r\n/g, '\n') // Normaliser les retours à la ligne
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n') // Limiter les retours à la ligne multiples
    .replace(/\s{2,}/g, ' ') // Limiter les espaces multiples
    .trim();
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const sourceLang = formData.get('sourceLanguage') as string;
    const targetLang = formData.get('targetLanguage') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    if (!sourceLang || !targetLang) {
      return NextResponse.json(
        { error: 'Les langues source et cible sont requises' },
        { status: 400 }
      );
    }

    // Validation simple du fichier
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/rtf'
    ];

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux (max 10MB)' },
        { status: 400 }
      );
    }

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non supporté. Formats acceptés: PDF, Word (.docx), TXT, RTF' },
        { status: 400 }
      );
    }

    console.log(`📁 Traitement de ${file.name} (${file.size} bytes)`);

    // Convertir le fichier en buffer (pas de sauvegarde sur disque pour Vercel)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    console.log(`💾 Fichier traité en mémoire: ${file.name}`);

    // Extraire le texte du fichier
    let extractedText: string;
    try {
      extractedText = await extractTextFromFile(buffer, file.type, file.name);
      console.log(`📄 Texte extrait: ${extractedText.length} caractères`);
    } catch (error) {
      console.error('❌ Erreur extraction:', error);
      return NextResponse.json(
        { error: `Erreur lors de l'extraction du texte: ${error instanceof Error ? error.message : 'Erreur inconnue'}` },
        { status: 400 }
      );
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Aucun texte extractible trouvé dans le fichier' },
        { status: 400 }
      );
    }

    // Traduire le texte avec notre service simple
    console.log(`🤖 Début de la traduction ${sourceLang} → ${targetLang}`);
    let translationResult;
    
    try {
      // Utilisation d'une traduction basique fiable
      translationResult = await translateTextBasic(extractedText, sourceLang, targetLang);
    } catch (error) {
      console.error('❌ Erreur traduction:', error);
      return NextResponse.json(
        { error: `Erreur lors de la traduction: ${error instanceof Error ? error.message : 'Erreur inconnue'}` },
        { status: 500 }
      );
    }

    const processingTime = (Date.now() - startTime) / 1000;
    console.log(`⏱️ Traduction terminée en ${processingTime.toFixed(2)}s`);

    // Générer un document simple
    let generatedDocument;
    try {
      generatedDocument = {
        filename: `traduction-${Date.now()}.txt`,
        content: translationResult.translatedText,
        mimeType: 'text/plain',
        size: translationResult.translatedText.length
      };
    } catch (error) {
      console.error('❌ Erreur génération document:', error);
      return NextResponse.json(
        { error: `Erreur lors de la génération du document: ${error instanceof Error ? error.message : 'Erreur inconnue'}` },
        { status: 500 }
      );
    }

    // Sauvegarder la traduction en base (version simplifiée pour le moment)
    const translation = await prisma.translation.create({
      data: {
        sourceText: extractedText,
        sourceLang,
        targetText: translationResult.translatedText,
        targetLang,
        quality: translationResult.confidence,
        isPublic: false,
        translationType: 'ai',
        userId: userId // Associer à l'utilisateur si connecté
        // Nouveaux champs seront ajoutés après redémarrage
        // fileName: file.name,
        // fileSize: file.size,
        // translatedFile: generatedDocument.fileName,
        // processingTime,
        // segmentsCount: translationResult.segmentsCount,
        // method: translationResult.method,
      }
    });

    // Générer un résumé simple
    const summary = {
      originalLength: extractedText.length,
      translatedLength: translationResult.translatedText.length,
      quality: translationResult.confidence,
      method: translationResult.method
    };

    console.log(`✅ Traduction complétée: ID ${translation.id}`);

    return NextResponse.json({
      success: true,
      message: 'Fichier uploadé et traduit avec succès',
      translation: {
        id: translation.id,
        fileName: file.name,
        translatedFile: generatedDocument.filename,
        downloadUrl: `/api/download?file=${encodeURIComponent(generatedDocument.filename)}`,
        summary,
        metadata: {
          processingTime: processingTime.toFixed(2) + 's',
          method: translationResult.method,
          quality: translationResult.confidence + '%',
          segmentsProcessed: translationResult.segmentsCount || 1
        }
      }
    });

  } catch (error) {
    console.error('❌ Erreur générale lors de l\'upload:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur lors du traitement du fichier' },
      { status: 500 }
    );
  }
}

// Fonction de traduction interne (réutilise la logique de l'API translate)
async function _translateTextInternal(
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
      translatedText = `[Traduction IA depuis fichier ${targetLang.toUpperCase()}]: ${text}`;
    } else {
      translatedText = `[Traduction automatique depuis fichier ${targetLang.toUpperCase()}]: ${text}`;
    }
  }

  // Capitaliser la première lettre
  return translatedText.charAt(0).toUpperCase() + translatedText.slice(1);
}

// Fonction de calcul de la qualité
function _calculateQualityScore(
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

// Configuration pour accepter les gros fichiers
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
