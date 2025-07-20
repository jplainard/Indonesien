import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
  try {
    // Récupérer le token depuis les cookies
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string; exp: number };
    // Statistiques personnelles
    const [
      totalTranslations,
      inProgress,
      averageQuality
    ] = await Promise.all([
      prisma.translation.count({ where: { userId: decoded.userId } }),
      prisma.translation.count({ where: { userId: decoded.userId, targetText: '' } }),
      prisma.translation.aggregate({
        _avg: { quality: true },
        where: { userId: decoded.userId, quality: { not: null } }
      })
    ]);
    return NextResponse.json({
      totalTranslations,
      inProgress,
      averageQuality: Math.round(averageQuality._avg.quality || 0)
    });
  } catch (error) {
    console.error('Erreur stats utilisateur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
