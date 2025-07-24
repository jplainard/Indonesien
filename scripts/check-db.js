const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('🔍 Diagnostic de la base de données...');
    
    // Vérifier les rôles existants
    const existingRoles = await prisma.role.findMany();
    console.log('\n📋 Rôles existants :');
    existingRoles.forEach(role => {
      console.log(`  - ID: ${role.id}, Nom: ${role.name}, Description: ${role.description}`);
    });
    
    // Vérifier les utilisateurs existants
    const userCount = await prisma.user.count();
    console.log(`\n👥 Nombre d'utilisateurs : ${userCount}`);
    
    if (userCount > 0) {
      const users = await prisma.user.findMany({
        include: { role: true }
      });
      console.log('\n👤 Utilisateurs :');
      users.forEach(user => {
        console.log(`  - ${user.name} (${user.email}) - Rôle: ${user.role?.name || 'Non défini'}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
