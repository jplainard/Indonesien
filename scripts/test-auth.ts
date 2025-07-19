// Test de l'API d'authentification IndoFrench
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function testAuth() {
  try {
    console.log('🔐 Test du système d\'authentification IndoFrench\n');

    // Vérifier la connexion à la base de données
    console.log('📡 Connexion à la base de données...');
    await prisma.$connect();
    console.log('✅ Connexion réussie\n');

    // Créer un utilisateur de test
    console.log('👤 Création d\'un utilisateur de test...');
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@indofrench.com' }
    });

    if (existingUser) {
      console.log('⚠️  Utilisateur de test existe déjà');
      
      // Supprimer l'utilisateur existant
      await prisma.user.delete({
        where: { email: 'test@indofrench.com' }
      });
      console.log('🗑️  Utilisateur existant supprimé');
    }

    // Récupérer ou créer le rôle utilisateur
    let userRole = await prisma.role.findFirst({
      where: { name: 'utilisateur' }
    });

    if (!userRole) {
      userRole = await prisma.role.create({
        data: {
          name: 'utilisateur',
          description: 'Utilisateur standard'
        }
      });
      console.log('📝 Rôle utilisateur créé');
    }

    // Créer l'utilisateur de test
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    const testUser = await prisma.user.create({
      data: {
        email: 'test@indofrench.com',
        password: hashedPassword,
        name: 'Utilisateur Test',
        roleId: userRole.id
      },
      include: {
        role: true
      }
    });

    console.log('✅ Utilisateur de test créé avec succès:');
    console.log(`   Email: ${testUser.email}`);
    console.log(`   Nom: ${testUser.name}`);
    console.log(`   Rôle: ${testUser.role.name}`);
    console.log(`   ID: ${testUser.id}\n`);

    // Test de connexion API
    console.log('🔐 Test de l\'API de connexion...');
    
    const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@indofrench.com',
        password: 'password123'
      }),
    });

    const loginData = await loginResponse.json();
    
    if (loginResponse.ok) {
      console.log('✅ Connexion API réussie');
      console.log(`   Utilisateur: ${loginData.user.name}`);
      console.log(`   Email: ${loginData.user.email}`);
      console.log(`   Rôle: ${loginData.user.role}\n`);
    } else {
      console.log('❌ Erreur de connexion API:', loginData.error);
    }

    console.log('🎉 Test terminé avec succès !');
    console.log('\n📋 Informations de connexion:');
    console.log('   Email: test@indofrench.com');
    console.log('   Mot de passe: password123');
    console.log('   URL: http://localhost:3001/auth');

  } catch (error) {
    console.error('❌ Erreur pendant le test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le test
testAuth();
