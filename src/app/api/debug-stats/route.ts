import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(_request: NextRequest) {
  try {
    // Statistiques globales
    const totalTranslations = await prisma.translation.count();
    const translationsWithUser = await prisma.translation.count({
      where: { userId: { not: null } }
    });
    const translationsWithoutUser = await prisma.translation.count({
      where: { userId: null }
    });
    
    // Dernières traductions
    const recentTranslations = await prisma.translation.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        userId: true,
        sourceLang: true,
        targetLang: true,
        quality: true,
        createdAt: true,
        user: {
          select: {
            email: true
          }
        }
      }
    });

    return NextResponse.json({
      debug: true,
      totalTranslations,
      translationsWithUser,
      translationsWithoutUser,
      recentTranslations
    });
  } catch (error) {
    console.error('Erreur debug stats:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
