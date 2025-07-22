import { type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export const runtime = 'edge';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_key_for_edge'
);

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
    // 1. Authentication
    const token = request.cookies.get('auth-token')?.value;
    console.log('Token reçu:', token ? `un token de ${token.length} caractères` : 'aucun');

    if (!token) {
      console.log('Erreur: Aucun token fourni.');
      return new Response(JSON.stringify({ error: 'Unauthorized: No token provided' }), { status: 401 });
    }

    try {
      console.log('Tentative de vérification du token...');
      await jwtVerify(token, JWT_SECRET);
      console.log('Token vérifié avec succès.');
    } catch (err) {
      console.error('Erreur de vérification du token:', err);
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid token' }), { status: 401 });
    }

    // 2. File Handling
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const sourceLang = formData.get('sourceLang') as string || 'id';
    const targetLang = formData.get('targetLang') as string || 'fr';

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

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
      } catch (err) {
        originalText = `[Erreur extraction PDF: ${err instanceof Error ? err.message : 'inconnue'}]`;
      }
    } else {
      originalText = `Type de fichier '${file.type}' non supporté pour l'extraction de texte.`;
    }

    if (!originalText) {
        return new Response(JSON.stringify({ error: 'Could not extract text from file.' }), { status: 400 });
    }

    // 4. Translation
    const translationResult = await translateTextBasic(originalText, sourceLang, targetLang);

    // 5. Save to database via internal REST API (Edge-compatible)
    let saveResult = null;
    try {
      const saveRes = await fetch(`/api/save-translation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: token,
          fileName: file.name,
          fileSize: file.size,
          sourceText: originalText,
          sourceLang,
          targetText: translationResult.translatedText,
          targetLang,
          quality: 85,
          translationType: 'auto',
          isPublic: false,
        })
      });
      saveResult = await saveRes.json();
    } catch (saveErr) {
      saveResult = { error: saveErr instanceof Error ? saveErr.message : 'Erreur inconnue' };
    }

    // 6. Send Response
    return new Response(JSON.stringify({
      success: true,
      translation: translationResult.translatedText,
      original: originalText,
      fileName: file.name,
      saveResult,
      message: "Upload, extraction, traduction et sauvegarde terminés (Edge Runtime).",
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
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
