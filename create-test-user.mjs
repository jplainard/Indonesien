#!/usr/bin/env node

// Script pour créer un utilisateur de test simple
import { PrismaClient } from './src/generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createSimpleTestUser() {
  try {
    console.log('🔍 Vérification de l\'existence d\'utilisateurs...');
    
    // Vérifier les rôles existants
    const roles = await prisma.role.findMany();
    console.log('📋 Rôles disponibles:', roles);
    
    if (roles.length === 0) {
      console.log('⚠️ Aucun rôle trouvé, création du rôle utilisateur...');
      await prisma.role.create({
        data: {
          id: 1,
          name: 'utilisateur',
          permissions: JSON.stringify(['read'])
        }
      });
    }
    
    // Créer un utilisateur de test simple
    const testEmail = 'test@test.com';
    const testPassword = 'test123';
    
    const existingUser = await prisma.user.findUnique({
      where: { email: testEmail }
    });
    
    if (existingUser) {
      console.log('✅ Utilisateur de test existe déjà:', testEmail);
    } else {
      console.log('👤 Création de l\'utilisateur de test...');
      const hashedPassword = await bcrypt.hash(testPassword, 12);
      
      await prisma.user.create({
        data: {
          email: testEmail,
          password: hashedPassword,
          name: 'Utilisateur Test',
          roleId: 1,
          status: 'active'
        }
      });
      
      console.log('✅ Utilisateur de test créé:', testEmail);
      console.log('🔑 Mot de passe:', testPassword);
    }
    
    // Lister tous les utilisateurs
    const users = await prisma.user.findMany({
      include: { role: true }
    });
    
    console.log('👥 Utilisateurs existants:');
    users.forEach(user => {
      console.log(`  - ${user.email} (${user.role.name}) - ${user.status}`);
    });
    
  } catch (error) {
    console.error('💥 Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSimpleTestUser();
