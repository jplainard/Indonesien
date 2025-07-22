import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
  try {
    // Vérification de l'authentification
    let token = request.cookies.get('auth-token')?.value;
    
    // Si pas de token dans les cookies, chercher dans l'en-tête Authorization
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Décoder le token pour récupérer l'userId
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string | number; email: string };
    const userId = typeof decoded.userId === 'string' ? parseInt(decoded.userId, 10) : decoded.userId;

    // Récupérer les traductions de l'utilisateur
    const translations = await prisma.translation.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        sourceText: true,
        targetText: true,
        sourceLang: true,
        targetLang: true,
        quality: true,
        translationType: true,
        createdAt: true
      }
    });

    // Calculer les statistiques
    const totalCount = translations.length;
    const averageQuality = translations.length > 0 
      ? Math.round(translations
          .filter(t => t.quality !== null)
          .reduce((sum, t) => sum + (t.quality || 0), 0) / 
          translations.filter(t => t.quality !== null).length || 0)
      : 0;

    return NextResponse.json({
      translations,
      totalCount,
      averageQuality
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des traductions:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
