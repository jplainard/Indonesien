import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Début du test de l\'API upload...');
    
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

    // Test simple d'extraction de texte
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    let extractedText = '';
    
    if (file.type === 'text/plain') {
      extractedText = buffer.toString('utf-8');
      console.log(`📄 Texte extrait: ${extractedText.substring(0, 100)}...`);
    } else if (file.type === 'application/pdf') {
      try {
        // Test d'import de pdf-parse
        const pdfParse = await import('pdf-parse');
        console.log('✅ pdf-parse importé avec succès');
        
        const data = await pdfParse.default(buffer);
        extractedText = data.text?.trim() || '';
        console.log(`📄 PDF analysé: ${data.numpages} pages, ${extractedText.length} caractères`);
      } catch (error) {
        console.error('❌ Erreur avec pdf-parse:', error);
        return NextResponse.json(
          { error: `Erreur PDF: ${error instanceof Error ? error.message : 'Erreur inconnue'}` },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: `Type de fichier non supporté en mode diagnostic: ${file.type}` },
        { status: 400 }
      );
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Aucun texte extractible trouvé' },
        { status: 400 }
      );
    }

    // Traduction simple basique pour le test
    const translations: Record<string, string> = {
      'selamat pagi': 'bon matin',
      'halo': 'bonjour',
      'terima kasih': 'merci',
      'test': 'test',
      'hello': 'bonjour'
    };

    let translatedText = extractedText.toLowerCase();
    for (const [source, target] of Object.entries(translations)) {
      translatedText = translatedText.replace(new RegExp(source, 'gi'), target);
    }

    // Si pas de traduction trouvée, ajouter un préfixe
    if (translatedText === extractedText.toLowerCase()) {
      translatedText = `[Traduction ${targetLang.toUpperCase()}]: ${extractedText}`;
    }

    const result = {
      success: true,
      original: {
        text: extractedText,
        length: extractedText.length,
        language: sourceLang
      },
      translated: {
        text: translatedText,
        length: translatedText.length,
        language: targetLang
      },
      file: {
        name: file.name,
        type: file.type,
        size: file.size
      }
    };

    console.log('✅ Test de diagnostic terminé avec succès');
    return NextResponse.json(result);

  } catch (error) {
    console.error('❌ Erreur dans l\'API upload (diagnostic):', error);
    return NextResponse.json(
      { 
        error: 'Erreur interne du serveur',
        details: error instanceof Error ? error.message : 'Erreur inconnue',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
