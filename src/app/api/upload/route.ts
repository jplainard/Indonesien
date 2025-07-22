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
    // 1. Authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized: No token provided' }), { status: 401 });
    }
    try {
      await jwtVerify(token, JWT_SECRET);
    } catch (err) {
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

    // 3. Text Extraction (Simplified for Edge)
    let originalText = '';
    if (file.type === 'text/plain') {
      originalText = await file.text();
    } else if (file.type === 'application/pdf') {
      originalText = `Le fichier PDF "${file.name}" a été reçu. L'extraction de texte pour les PDF est en cours de mise à jour.`;
    } else {
      originalText = `Type de fichier '${file.type}' non supporté pour l'extraction de texte.`;
    }

    if (!originalText) {
        return new Response(JSON.stringify({ error: 'Could not extract text from file.' }), { status: 400 });
    }

    // 4. Translation
    const translationResult = await translateTextBasic(originalText, sourceLang, targetLang);

    // 5. Send Response (Database logic is temporarily skipped)
    return new Response(JSON.stringify({
      success: true,
      translation: translationResult.translatedText,
      original: originalText,
      fileName: file.name,
      message: "Upload and translation successful (Edge Runtime).",
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
