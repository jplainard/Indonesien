import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  console.log('🔑 API Login - Début de la requête');
  
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('📧 Email reçu:', email);
    console.log('🔒 Password présent:', !!password);

    // Validation des données
    if (!email || !password) {
      console.log('❌ Validation échouée: données manquantes');
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe
    console.log('🔍 Recherche utilisateur dans la base...');
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true }
    });

    console.log('👤 Utilisateur trouvé:', !!user);
    if (user) {
      console.log('👤 Utilisateur info:', { id: user.id, name: user.name, email: user.email });
    }

    if (!user) {
      console.log('❌ Utilisateur non trouvé');
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    console.log('🔐 Vérification du mot de passe...');
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('🔐 Mot de passe valide:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('❌ Mot de passe incorrect');
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Mettre à jour la dernière connexion
    console.log('📅 Mise à jour de la dernière connexion...');
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    // Générer le token JWT
    console.log('🎫 Génération du token JWT...');
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
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt
    };

    console.log('📤 Envoi de la réponse de succès');

    // Créer la réponse avec le cookie httpOnly
    const response = NextResponse.json({
      success: true,
      message: 'Connexion réussie',
      user: userData
    });

    // Définir le cookie JWT (httpOnly pour la sécurité)
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 jours
    });

    console.log('✅ Login réussi pour:', user.email);
    return response;

  } catch (error) {
    console.error('💥 Erreur lors de la connexion:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
