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
        // Méthode 1: Tentative d'extraction simple avec PDF.js
        const pdfjsLib = await import('pdfjs-dist/build/pdf');
        
        // Configuration pour Edge Runtime
        if (typeof pdfjsLib.GlobalWorkerOptions !== 'undefined') {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
        }
        
        const pdfData = new Uint8Array(await file.arrayBuffer());
        const loadingTask = pdfjsLib.getDocument({ 
          data: pdfData,
          useSystemFonts: true,
          disableFontFace: true
        });
        
        const pdf = await loadingTask.promise;
        let text = '';
        
        // Extraction page par page avec gestion d'erreur
        for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) { // Limiter à 10 pages max
          try {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = (content.items as Array<{ str: string }>)
              .map((item) => item.str)
              .join(' ');
            text += pageText + '\n';
          } catch (pageErr) {
            console.warn(`[PDF] Erreur page ${i}:`, pageErr);
            text += `[Page ${i}: extraction échouée]\n`;
          }
        }
        
        originalText = text.trim();
        
        if (!originalText || originalText.length < 10) {
          // PDF probablement scanné ou protégé
          throw new Error('PDF appears to be scanned or protected');
        }
        
        console.log(`✅ [API Upload] PDF extrait: ${originalText.length} caractères`);
        
      } catch (_err: unknown) {
        // Extraction PDF échouée - retourner une erreur explicite avec solutions
        const errorMsg = (_err as Error)?.message || String(_err);
        console.error('[PDF extraction] Échec extraction:', errorMsg);
        
        return NextResponse.json({
          error: 'PDF extraction failed',
          errorType: 'pdf_extraction_failed',
          details: `Ce PDF ne peut pas être lu automatiquement.\n\n🔍 Causes possibles :\n• PDF scanné (image)\n• PDF protégé par mot de passe\n• PDF corrompu\n• Fonts non supportées\n\n✅ Solutions :\n1. Convertir le PDF en texte avec un OCR en ligne\n2. Copier-coller le texte manuellement\n3. Utiliser un fichier texte (.txt) à la place`,
          solutions: [
            {
              title: "OCR en ligne",
              description: "Convertir le PDF en texte automatiquement",
              url: "https://www.onlineocr.net/fr/",
              action: "Uploader votre PDF sur ce site pour extraire le texte"
            },
            {
              title: "Copier-coller manuel",
              description: "Ouvrir le PDF et copier le texte",
              url: null,
              action: "Ouvrir le PDF dans un lecteur et copier le texte dans l'outil de traduction texte"
            },
            {
              title: "Conversion en .txt",
              description: "Sauvegarder le contenu en fichier texte",
              url: null,
              action: "Copier le texte du PDF et le sauvegarder en fichier .txt"
            }
          ]
        }, { status: 422 });
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
