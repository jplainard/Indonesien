import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
// PDF.js importé dynamiquement si besoin
// Authentification JWT importée dynamiquement si besoin

// Retrait du runtime edge pour supporter Prisma
// export const runtime = 'edge';

// const JWT_SECRET = (process.env.JWT_SECRET || 'fallback_secret_key') as string;

export async function POST(request: NextRequest) {
  console.log('🔍 [API Upload] Début de la requête');
  
  try {
    // Authentification Bearer token (header ou cookie) - OBLIGATOIRE
    let token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    if (!token) {
      console.log('❌ [API Upload] Aucun token fourni');
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }
    
    // Vérification du token et récupération de l'userId
    let userId = null;
    try {
      const { default: jwt } = await import('jsonwebtoken');
      const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      userId = decoded.userId;
      console.log('✅ [API Upload] Token valide, userId:', userId);
    } catch (_err) {
      console.log('❌ [API Upload] Token invalide');
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    // 2. File Handling
    console.log('📁 [API Upload] Traitement du fichier');
    const formData = await request.formData();
    const fileEntry = formData.get('file');
    const sourceLang = (formData.get('sourceLang') as string) || 'id';
    const targetLang = (formData.get('targetLang') as string) || 'fr';

    if (!(fileEntry instanceof File)) {
      console.log('❌ [API Upload] Aucun fichier fourni');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    const file = fileEntry as File;
    console.log(`📄 [API Upload] Fichier reçu: ${file.name}, type: ${file.type}, taille: ${file.size}`);

    // 3. Text Extraction (Edge-compatible, PDF support)
    let originalText = '';
    if (file.type === 'text/plain') {
      console.log('📝 [API Upload] Extraction texte plain');
      originalText = await file.text();
    } else if (file.type === 'application/pdf') {
      console.log('📊 [API Upload] Extraction PDF');
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
        console.log(`✅ [API Upload] PDF extrait: ${originalText.length} caractères`);
      } catch (_err: unknown) {
        // Extraction PDF échouée
        const errorMsg = (_err as Error)?.message || String(_err);
        const ocrUrl = 'https://www.onlineocr.net/';
        console.error('[PDF extraction] Impossible d\'extraire le texte :', errorMsg);
        console.info(`[PDF extraction] Conseils utilisateur : Utiliser un OCR (${ocrUrl}), copier-coller le texte, ou uploader un fichier texte.`);
        return NextResponse.json({
          error: 'PDF extraction failed',
          details: `Impossible d'extraire le texte du PDF.\n\nCe document semble être une image scannée ou protégé par mot de passe.\n\n👉 Pour traduire ce type de fichier :\n1. Utilisez un outil OCR (ex: ${ocrUrl}) pour convertir le PDF en texte.\n2. Ou copiez-collez le texte dans l'outil de traduction.\n3. Ou uploadez directement un fichier texte (.txt).`,
          suggestion: 'Préférez les PDF créés numériquement ou Word (.docx) pour une extraction optimale.',
          ocrUrl
        }, { status: 500 });
      }
    } else {
      console.log(`❌ [API Upload] Type de fichier non supporté: ${file.type}`);
      return NextResponse.json({ 
        error: 'Unsupported file type',
        details: `Le type de fichier "${file.type}" n'est pas supporté. Formats acceptés: PDF (.pdf) et Texte (.txt)`
      }, { status: 400 });
    }

    console.log(`📝 [API Upload] Texte extrait: ${originalText.length} caractères`);

    // Traduction (mock)
    const translatedText = originalText ? `${originalText} [${sourceLang}->${targetLang}]` : '';
    console.log(`🔄 [API Upload] Traduction générée: ${translatedText.length} caractères`);

    // Sauvegarde en base de données
    let savedTranslationId: number | null = null;
    // L'userId est déjà défini en haut du fichier selon l'authentification
    try {
      console.log('💾 [API Upload] Sauvegarde en base de données');
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

    // Retourner la réponse de succès
    console.log('🎉 [API Upload] Succès, retour de la réponse');
    return NextResponse.json({
      success: true,
      message: 'Fichier traduit avec succès',
      translationId: savedTranslationId,
      original: {
        filename: file.name,
        text: originalText,
        length: originalText.length
      },
      translated: {
        text: translatedText,
        length: translatedText.length
      },
      metadata: {
        method: file.type === 'application/pdf' ? 'pdf-extraction' : 'text-direct',
        userId: userId
      }
    });

  } catch (error) {
    console.error('❌ Erreur dans /api/upload:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      error: "Erreur lors du traitement du fichier",
      details: errorMessage,
    }, {
      status: 500,
    });
  }
}
