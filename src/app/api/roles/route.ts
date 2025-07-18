import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Récupérer tous les rôles
export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      include: {
        _count: {
          select: {
            users: true
          }
        }
      },
      orderBy: {
        id: 'asc'
      }
    });

    return NextResponse.json(roles);
  } catch (error) {
    console.error('Erreur lors de la récupération des rôles:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST - Créer un nouveau rôle
export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Le nom du rôle est requis' },
        { status: 400 }
      );
    }

    const role = await prisma.role.create({
      data: {
        name,
        description
      }
    });

    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du rôle:', error);
    if ((error as any).code === 'P2002') {
      return NextResponse.json(
        { error: 'Un rôle avec ce nom existe déjà' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
