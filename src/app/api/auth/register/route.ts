import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validation des données
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email invalide' },
        { status: 400 }
      );
    }

    // Validation du mot de passe (minimum 8 caractères)
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 8 caractères' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Un compte avec cet email existe déjà' },
        { status: 409 }
      );
    }

    // Crypter le mot de passe
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Obtenir le rôle par défaut (utilisateur)
    let defaultRole = await prisma.role.findFirst({
      where: { name: 'utilisateur' }
    });

    if (!defaultRole) {
      // Créer le rôle utilisateur s'il n'existe pas
      defaultRole = await prisma.role.create({
        data: {
          name: 'utilisateur',
          description: 'Utilisateur standard'
        }
      });
    }

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        roleId: defaultRole.id,
        status: 'active'
      },
      include: {
        role: true
      }
    });

    // Générer le token JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role.name 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Préparer les données utilisateur (sans le mot de passe)
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.name,
      status: user.status,
      createdAt: user.createdAt
    };

    // Créer la réponse avec le cookie httpOnly
    const response = NextResponse.json({
      success: true,
      message: 'Compte créé avec succès',
      user: userData
    });

    // Définir le cookie JWT
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 jours
    });

    return response;

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
