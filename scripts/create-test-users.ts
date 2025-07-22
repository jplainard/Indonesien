import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createTestUsers() {
  const testUsers = [
    {
      email: 'admin@indofrench.com',
      password: await bcrypt.hash('admin123', 12),
      name: 'Administrateur Principal',
      roleId: 5 // admin
    },
    {
      email: 'moderateur@indofrench.com',
      password: await bcrypt.hash('mod123', 12),
      name: 'Modérateur Chef',
      roleId: 4 // moderateur
    },
    {
      email: 'traducteur@indofrench.com',
      password: await bcrypt.hash('trad123', 12),
      name: 'Marie Dubois',
      roleId: 3 // traducteur
    },
    {
      email: 'premium@indofrench.com',
      password: await bcrypt.hash('premium123', 12),
      name: 'Client Premium',
      roleId: 2 // premium
    },
    {
      email: 'utilisateur@indofrench.com',
      password: await bcrypt.hash('user123', 12),
      name: 'Utilisateur Standard',
      roleId: 1 // utilisateur
    }
  ];

  try {
    console.log('🚀 Création des utilisateurs de test...');
    
    for (const user of testUsers) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email }
      });

      if (!existingUser) {
        await prisma.user.create({
          data: user
        });
        console.log(`✅ Utilisateur "${user.name}" créé`);
      } else {
        console.log(`⚠️  Utilisateur "${user.name}" existe déjà`);
      }
    }

    // Créer quelques traductions de test
    const users = await prisma.user.findMany();
    
    for (const user of users.slice(0, 3)) {
      for (let i = 0; i < Math.floor(Math.random() * 10) + 1; i++) {
        await prisma.translation.create({
          data: {
            sourceText: `Texte source ${i + 1} pour ${user.name}`,
            sourceLang: 'id',
            targetText: `Texte traduit ${i + 1} pour ${user.name}`,
            targetLang: 'fr',
            quality: Math.floor(Math.random() * 20) + 80, // 80-100%
            userId: user.id,
            translationType: ['auto', 'ai', 'human'][Math.floor(Math.random() * 3)]
          }
        });
      }
    }

    console.log('🎉 Utilisateurs et traductions de test créés avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la création des utilisateurs de test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exporter pour utilisation directe
if (require.main === module) {
  createTestUsers();
}

export default createTestUsers;
