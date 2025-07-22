import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { PrismaClient } from '../../../generated/prisma';
import { FileTextExtractor, AITranslationService } from '../../../lib/fileTranslation';
import { DocumentGenerator } from '../../../lib/documentGenerator';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

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

    // Validation du fichier
    const validation = FileTextExtractor.validateFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    console.log(`📁 Traitement de ${file.name} (${file.size} bytes)`);

    // Créer le répertoire uploads s'il n'existe pas
    const uploadDir = join(process.cwd(), 'uploads');
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(uploadDir, fileName);

    // Convertir le fichier en buffer et l'écrire
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    try {
      await writeFile(filePath, buffer);
    } catch (_error) {
      const fs = await import('fs');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        await writeFile(filePath, buffer);
      } else {
        throw _error;
      }
    }

    console.log(`💾 Fichier sauvegardé: ${fileName}`);

    // Extraire le texte du fichier
    let extractedText: string;
    try {
      extractedText = await FileTextExtractor.extractText(buffer, file.type, file.name);
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

    // Traduire le texte avec l'IA
    console.log(`🤖 Début de la traduction ${sourceLang} → ${targetLang}`);
    let translationResult;
    
    try {
      if (extractedText.length > 1000) {
        // Texte long : traduction par segments
        translationResult = await AITranslationService.translateLongText(
          extractedText, 
          sourceLang, 
          targetLang
        );
      } else {
        // Texte court : traduction directe
        const result = await AITranslationService.translateWithAI(
          extractedText, 
          sourceLang, 
          targetLang
        );
        translationResult = {
          ...result,
          segmentsCount: 1
        };
      }
    } catch (error) {
      console.error('❌ Erreur traduction:', error);
      return NextResponse.json(
        { error: `Erreur lors de la traduction: ${error instanceof Error ? error.message : 'Erreur inconnue'}` },
        { status: 500 }
      );
    }

    const processingTime = (Date.now() - startTime) / 1000;
    console.log(`⏱️ Traduction terminée en ${processingTime.toFixed(2)}s`);

    // Générer le document traduit
    let generatedDocument;
    try {
      generatedDocument = await DocumentGenerator.generateTranslatedDocument(
        file.name,
        translationResult.translatedText,
        sourceLang,
        targetLang,
        {
          quality: translationResult.confidence,
          method: translationResult.method,
          originalLength: extractedText.length,
          translatedLength: translationResult.translatedText.length,
          processingTime,
          segmentsCount: translationResult.segmentsCount
        }
      );
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

    // Générer le résumé pour la réponse
    const summary = DocumentGenerator.generateTranslationSummary(
      extractedText,
      translationResult.translatedText,
      {
        quality: translationResult.confidence,
        method: translationResult.method,
        segmentsCount: translationResult.segmentsCount
      }
    );

    console.log(`✅ Traduction complétée: ID ${translation.id}`);

    return NextResponse.json({
      success: true,
      message: 'Fichier uploadé et traduit avec succès',
      translation: {
        id: translation.id,
        fileName: file.name,
        translatedFile: generatedDocument.fileName,
        downloadUrl: `/api/download?file=${encodeURIComponent(generatedDocument.fileName)}`,
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
