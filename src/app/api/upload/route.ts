import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
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

    // Validation de la taille (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux (max 10MB)' },
        { status: 400 }
      );
    }

    // Validation des types de fichiers
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/rtf'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non supporté' },
        { status: 400 }
      );
    }

    // Créer le répertoire uploads s'il n'existe pas
    const uploadDir = join(process.cwd(), 'uploads');
    
    // Générer un nom de fichier unique
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = join(uploadDir, fileName);

    // Convertir le fichier en buffer et l'écrire
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    try {
      await writeFile(filePath, buffer);
    } catch (_error) {
      // Si le répertoire n'existe pas, le créer
      const fs = await import('fs');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        await writeFile(filePath, buffer);
      } else {
        throw _error;
      }
    }

    // Extraire le texte du fichier selon son type
    let extractedText = '';
    
    if (file.type === 'text/plain') {
      extractedText = buffer.toString('utf-8');
    } else if (file.type === 'application/pdf') {
      // Pour l'instant, on simule l'extraction de texte PDF
      extractedText = 'Texte extrait du PDF (fonctionnalité à implémenter)';
    } else {
      // Pour les fichiers Word, etc.
      extractedText = 'Texte extrait du document (fonctionnalité à implémenter)';
    }

    // Simuler la traduction (à remplacer par un vrai service de traduction)
    const translatedText = await simulateTranslation(extractedText, sourceLang, targetLang);

    // Sauvegarder la traduction en base
    const translation = await prisma.translation.create({
      data: {
        sourceText: extractedText,
        sourceLang,
        targetText: translatedText,
        targetLang,
        quality: 85, // Score simulé
        isPublic: false,
        translationType: 'ai',
        // userId sera ajouté quand on aura l'authentification
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Fichier uploadé et traduit avec succès',
      translation: {
        id: translation.id,
        sourceText: translation.sourceText.substring(0, 200) + '...', // Aperçu
        targetText: translation.targetText.substring(0, 200) + '...', // Aperçu
        sourceLang: translation.sourceLang,
        targetLang: translation.targetLang,
        quality: translation.quality,
        createdAt: translation.createdAt
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// Fonction de simulation de traduction
async function simulateTranslation(text: string, sourceLang: string, targetLang: string): Promise<string> {
  // Pour l'instant, on simule la traduction
  // Dans un vrai projet, on utiliserait Google Translate, DeepL, ou un autre service
  
  const translations: Record<string, string> = {
    'id-fr': 'Traduction française simulée du texte indonésien',
    'fr-id': 'Terjemahan Indonesia simulasi dari teks Prancis',
  };
  
  const key = `${sourceLang}-${targetLang}`;
  return translations[key] || `Traduction ${targetLang} simulée: ${text}`;
}

// Configuration pour accepter les gros fichiers
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
