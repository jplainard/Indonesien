const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUsers() {
  try {
    console.log('🚀 Création des utilisateurs de test...');

    // Vérifier si l'utilisateur admin existe déjà
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@test.com' }
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      const admin = await prisma.user.create({
        data: {
          email: 'admin@test.com',
          password: hashedPassword,
          name: 'Admin Test',
          roleId: 1, // admin
          status: 'active'
        }
      });
      console.log('✅ Utilisateur admin créé:', admin.email);
    } else {
      console.log('⚠️ Utilisateur admin existe déjà');
    }

    // Créer un utilisateur normal
    const existingUser = await prisma.user.findUnique({
      where: { email: 'user@test.com' }
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('user123', 12);
      const user = await prisma.user.create({
        data: {
          email: 'user@test.com',
          password: hashedPassword,
          name: 'Utilisateur Test',
          roleId: 2, // utilisateur
          status: 'active'
        }
      });
      console.log('✅ Utilisateur normal créé:', user.email);
    } else {
      console.log('⚠️ Utilisateur normal existe déjà');
    }

    console.log('\n📝 Informations de connexion:');
    console.log('Admin: admin@test.com / admin123');
    console.log('User: user@test.com / user123');
    console.log('\n🌐 Accédez au dashboard: http://localhost:3000/dashboard');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUsers();
