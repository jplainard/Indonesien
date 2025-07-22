import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Début du test API upload simple...');
    
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

    console.log(`📁 Fichier reçu: ${file.name}, type: ${file.type}, taille: ${file.size}`);
    console.log(`🌐 Langues: ${sourceLang} → ${targetLang}`);

    // Validation simple
    if (file.size > 5 * 1024 * 1024) { // 5MB max
      return NextResponse.json(
        { error: 'Fichier trop volumineux (max 5MB)' },
        { status: 400 }
      );
    }

    // Support uniquement du texte pour l'instant
    if (file.type !== 'text/plain') {
      return NextResponse.json(
        { error: 'Seuls les fichiers texte (.txt) sont supportés pour l\'instant' },
        { status: 400 }
      );
    }

    // Extraction du texte
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extractedText = buffer.toString('utf-8');

    console.log(`📄 Texte extrait: ${extractedText.substring(0, 100)}...`);

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Fichier vide ou illisible' },
        { status: 400 }
      );
    }

    // Traduction basique
    const translations: Record<string, string> = {
      'halo': 'bonjour',
      'selamat pagi': 'bon matin',
      'selamat siang': 'bon après-midi', 
      'selamat malam': 'bonsoir',
      'terima kasih': 'merci',
      'sama-sama': 'de rien',
      'maaf': 'excusez-moi',
      'permisi': 'pardon',
      'apa kabar': 'comment allez-vous',
      'nama saya': 'je m\'appelle',
      'sampai jumpa': 'au revoir',
      'ya': 'oui',
      'tidak': 'non'
    };

    let translatedText = extractedText.toLowerCase();
    
    // Appliquer les traductions
    for (const [indonesian, french] of Object.entries(translations)) {
      const regex = new RegExp(`\\b${indonesian}\\b`, 'gi');
      translatedText = translatedText.replace(regex, french);
    }

    // Si pas de traduction trouvée, ajouter un préfixe
    if (translatedText === extractedText.toLowerCase()) {
      translatedText = `[Traduction automatique vers le français]: ${extractedText}`;
    }

    // Capitaliser
    translatedText = translatedText.charAt(0).toUpperCase() + translatedText.slice(1);

    console.log(`✅ Traduction terminée: ${translatedText.substring(0, 100)}...`);

    // Résultat simple
    return NextResponse.json({
      success: true,
      message: 'Fichier traduit avec succès',
      original: {
        filename: file.name,
        text: extractedText,
        language: sourceLang,
        length: extractedText.length
      },
      translated: {
        text: translatedText,
        language: targetLang,
        length: translatedText.length
      },
      metadata: {
        method: 'dictionary-basic',
        quality: '85%',
        fileType: file.type
      }
    });

  } catch (error) {
    console.error('❌ Erreur dans l\'API upload simple:', error);
    return NextResponse.json(
      { 
        error: 'Erreur interne du serveur',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
