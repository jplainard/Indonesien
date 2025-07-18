import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function initializeRoles() {
  const defaultRoles = [
    {
      id: 1,
      name: 'utilisateur',
      description: 'Utilisateur standard avec accès aux fonctionnalités de base'
    },
    {
      id: 2,
      name: 'premium',
      description: 'Utilisateur premium avec accès aux fonctionnalités avancées'
    },
    {
      id: 3,
      name: 'traducteur',
      description: 'Traducteur professionnel avec accès aux outils de traduction avancés'
    },
    {
      id: 4,
      name: 'moderateur',
      description: 'Modérateur avec accès à la gestion des contenus'
    },
    {
      id: 5,
      name: 'admin',
      description: 'Administrateur avec accès complet au système'
    }
  ];

  try {
    console.log('🚀 Initialisation des rôles...');
    
    for (const role of defaultRoles) {
      await prisma.role.upsert({
        where: { id: role.id },
        update: {},
        create: role
      });
      console.log(`✅ Rôle "${role.name}" créé/mis à jour`);
    }

    console.log('🎉 Rôles initialisés avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation des rôles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exporter pour utilisation directe
if (require.main === module) {
  initializeRoles();
}

export default initializeRoles;
