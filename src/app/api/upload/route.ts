import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
// PDF.js importé dynamiquement si besoin
// Authentification JWT importée dynamiquement si besoin

// Retrait du runtime edge pour supporter Prisma
// export const runtime = 'edge';

// const JWT_SECRET = (process.env.JWT_SECRET || 'fallback_secret_key') as string;

export async function POST(request: NextRequest) {
  try {
    // Authentification Bearer token (header ou cookie)
    let token = request.cookies.get('auth-token')?.value;
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }
    // Vérification du token
    const { default: jwt } = await import('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

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
      } catch (_err: unknown) {
        // Extraction PDF échouée
        const errorMsg = (_err as Error)?.message || String(_err);
        console.error('Erreur extraction PDF:', errorMsg);
        return NextResponse.json({ error: 'PDF extraction failed' }, { status: 500 });
      }
    }

    // Traduction (mock)
    const translatedText = originalText ? `${originalText} [${sourceLang}->${targetLang}]` : '';

    // Sauvegarde en base de données
    let savedTranslationId: number | null = null;
    // Tentative de récupération de l'utilisateur (désactivé temporairement)
    // Pour l'instant, on sauvegarde sans utilisateur
    // TODO: Réactiver l'authentification plus tard
    const userId = null;
    try {
      const savedTranslation = await prisma.translation.create({
        data: {
          sourceText: originalText,
          sourceLang,
          targetText: translatedText,
          targetLang,
          fileName: file.name,
          fileSize: file.size,
          translationType: 'auto',
          quality: 85, // Score fixe pour les traductions automatiques
          processingTime: 1.5, // Temps fictif
          segmentsCount: Math.ceil(originalText.length / 100),
          method: file.type === 'application/pdf' ? 'pdf-extraction' : 'text-direct',
          userId: userId, // null si pas authentifié
        }
      });
      savedTranslationId = savedTranslation.id;
      console.log('✅ Traduction sauvegardée avec ID:', savedTranslationId);
    } catch (_err: unknown) {
      console.error('❌ Erreur lors de la sauvegarde:', _err);
      // Continue même si la sauvegarde échoue
    }

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
