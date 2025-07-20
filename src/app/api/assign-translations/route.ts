import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    // Vérification de l'authentification
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Décoder le token pour récupérer l'userId
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
    const userId = decoded.userId;

    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // Compter les traductions anonymes
    const anonymousCount = await prisma.translation.count({
      where: { userId: null }
    });

    if (anonymousCount === 0) {
      return NextResponse.json({
        message: 'Aucune traduction anonyme à affecter',
        updatedCount: 0,
        userEmail: user.email
      });
    }

    // Affecter toutes les traductions anonymes à l'utilisateur connecté
    const updateResult = await prisma.translation.updateMany({
      where: { userId: null },
      data: { userId: userId }
    });

    return NextResponse.json({
      message: `${updateResult.count} traductions affectées à ${user.email}`,
      updatedCount: updateResult.count,
      userEmail: user.email,
      userId: userId
    });

  } catch (error) {
    console.error('Erreur lors de l\'affectation des traductions:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
