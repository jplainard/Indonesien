import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// GET - Récupérer tous les utilisateurs (admin seulement)
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
        translations: {
          select: {
            id: true,
            createdAt: true,
            quality: true
          }
        },
        _count: {
          select: {
            translations: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transformer les données pour la sécurité
    const safeUsers = users.map((user: {
      id: number;
      name: string | null;
      email: string;
      avatar?: string | null;
      emailVerified?: Date | null;
      role: { name: string };
      createdAt: Date;
      updatedAt: Date;
      lastLoginAt?: Date | null;
      translations: Array<{ id: number; createdAt: Date; quality: number | null }>;
      _count: { translations: number };
    }) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      stats: {
        totalTranslations: user._count.translations,
        averageQuality: user.translations.length > 0 
          ? Math.round(user.translations.reduce((acc: number, t) => acc + (t.quality || 0), 0) / user.translations.length)
          : 0,
        lastActivity: user.translations.length > 0 
          ? user.translations[0].createdAt 
          : user.createdAt
      }
    }));

    return NextResponse.json(safeUsers);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST - Créer un nouvel utilisateur
export async function POST(request: Request) {
  try {
    const { email, password, name, roleId } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Un utilisateur avec cet email existe déjà' },
        { status: 409 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        roleId: roleId || 1 // Rôle par défaut
      },
      include: {
        role: true
      }
    });

    // Retourner sans le mot de passe
    const { password: _, ...safeUser } = user;
    
    return NextResponse.json(safeUser, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
