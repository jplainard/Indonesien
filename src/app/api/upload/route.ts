import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import * as pdfjsLib from 'pdfjs-dist';
import jwt from 'jsonwebtoken';

// Retrait du runtime edge pour supporter Prisma
// export const runtime = 'edge';

const JWT_SECRET = (process.env.JWT_SECRET || 'fallback_secret_key') as string;

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

    // Sauvegarde en base de données
    let savedTranslationId = null;
    try {
      // Tentative de récupération de l'utilisateur (désactivé temporairement)
      // Pour l'instant, on sauvegarde sans utilisateur
      // TODO: Réactiver l'authentification plus tard
      const userId = null;

      // Sauvegarde de la traduction
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
      
    } catch (err) {
      console.error('❌ Erreur lors de la sauvegarde:', err);
      // Continue même si la sauvegarde échoue
    }

    // Réponse
    return NextResponse.json({
      originalText,
      translatedText,
      translatedFile: translatedText,  // Ajout pour téléchargement frontend
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
