import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// const JWT_SECRET = new TextEncoder().encode(
//   process.env.JWT_SECRET || 'fallback_secret_key_for_edge'
// );

// Basic translation function (Edge compatible)
async function translateTextBasic(text: string, sourceLang: string, targetLang: string) {
  const basicTranslations: Record<string, Record<string, string>> = {
    'id-fr': {
      'halo': 'bonjour', 'selamat pagi': 'bon matin', 'terima kasih': 'merci', 'dokumen': 'document', 'file': 'fichier',
    },
    'fr-id': {
      'bonjour': 'halo', 'bon matin': 'selamat pagi', 'merci': 'terima kasih', 'document': 'dokumen', 'fichier': 'file',
    }
  };
  const langPair = `${sourceLang}-${targetLang}`;
  const dictionary = basicTranslations[langPair] || {};
  let translatedText = text.toLowerCase();
  Object.entries(dictionary).forEach(([source, target]) => {
    const regex = new RegExp(`\\b${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    translatedText = translatedText.replace(regex, target);
  });
  if (translatedText === text.toLowerCase()) {
    translatedText = `[Traduction simple Edge] ${text}`;
  }
  return { translatedText };
}

export async function POST(request: NextRequest) {
  try {
    console.log('Début du traitement de la requête POST /api/upload');
    console.log('Vérification de la variable d\'environnement JWT_SECRET...');
    if (!process.env.JWT_SECRET) {
      console.warn('Attention: La variable d\'environnement JWT_SECRET n\'est pas définie. Utilisation d\'une clé de secours.');
    } else {
      console.log('La variable d\'environnement JWT_SECRET est définie.');
    }
    
    // Test simple pour vérifier que la route fonctionne
    return NextResponse.json({ 
      message: 'Route /api/upload POST fonctionne',
      timestamp: new Date().toISOString()
    }, { status: 200 });
    
    // Code d'authentification temporairement commenté pour tester
    /*
    // 1. Authentication
    const token = request.cookies.get('auth-token')?.value;
    console.log('Token reçu:', token ? `un token de ${token.length} caractères` : 'aucun');

    if (!token) {
      console.log('Erreur: Aucun token fourni.');
      return new Response(JSON.stringify({ error: 'Unauthorized: No token provided' }), { status: 401 });
    }
    */

    /*
    try {
      console.log('Tentative de vérification du token...');
      await jwtVerify(token, JWT_SECRET);
      console.log('Token vérifié avec succès.');
    } catch (err) {
      console.error('Erreur de vérification du token:', err);
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid token' }), { status: 401 });
    }
    */

    // 2. File Handling
    const formData = await request.formData();
    const fileEntry = formData.get('file');
    const sourceLang = (formData.get('sourceLang') as string) || 'id';
    const targetLang = (formData.get('targetLang') as string) || 'fr';

    if (!(fileEntry instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    const file = fileEntry as File;

    // 3. Text Extraction (Edge-compatible, PDF support)
    let originalText = '';
    if (file.type === 'text/plain') {
      originalText = await file.text();
    } else if (file.type === 'application/pdf') {
      try {
        // Extraction PDF basique avec PDF.js (Edge-compatible)
        // PDF.js doit être importé dynamiquement et utilisé côté Edge
        const pdfjsLib = await import('pdfjs-dist/build/pdf');
        const pdfData = new Uint8Array(await file.arrayBuffer());
        const loadingTask = pdfjsLib.getDocument({ data: pdfData });
        const pdf = await loadingTask.promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += (content.items as Array<{ str: string }>).map((item) => item.str).join(' ') + '\n';
        }
        originalText = text.trim() || `[PDF reçu, mais aucun texte extrait]`;
      } catch (err: unknown) {
        // Extraction PDF échouée
        const errorMsg = (err as Error)?.message || String(err);
        console.error('Erreur extraction PDF:', errorMsg);
        return NextResponse.json({ error: 'PDF extraction failed' }, { status: 500 });
      }
    }

    // Traduction (mock)
    const translatedText = originalText ? `${originalText} [${sourceLang}->${targetLang}]` : '';

    // Réponse
    return NextResponse.json({
      originalText,
      translatedText,
      sourceLang,
      targetLang,
    });

  } catch (error) {
    console.error('❌ Erreur dans /api/upload (Edge):', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({
      error: "Erreur lors du traitement du fichier",
      details: errorMessage,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
