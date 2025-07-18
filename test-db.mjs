// Test de connexion Prisma pour IndoFrench - Version Améliorée
import { PrismaClient } from './src/generated/prisma/index.js'

const prisma = new PrismaClient()

async function testDatabase() {
  console.log('🔗 Test de connexion à la base de données IndoFrench (Version Améliorée)...\n')
  
  try {
    // Test des nouvelles colonnes
    const roles = await prisma.role.findMany({
      include: { _count: { select: { users: true } } }
    })
    console.log('📝 Rôles avec compteurs:')
    roles.forEach(role => {
      console.log(`  - ${role.name}: ${role._count.users} utilisateur(s)`)
    })
    
    // Test des utilisateurs avec nouvelles colonnes
    const users = await prisma.user.findMany({
      include: { 
        role: true,
        _count: { select: { translations: true } }
      }
    })
    console.log('\n👥 Utilisateurs détaillés:')
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.email})`)
      console.log(`    Rôle: ${user.role.name}`)
      console.log(`    Traductions: ${user._count.translations}`)
      console.log(`    Email vérifié: ${user.emailVerified ? 'Oui' : 'Non'}`)
    })
    
    // Test des traductions avec nouvelles colonnes
    const translations = await prisma.translation.findMany({
      include: { user: true },
      take: 3,
      orderBy: { createdAt: 'desc' }
    })
    console.log('\n🔄 Traductions avec détails:')
    translations.forEach(t => {
      console.log(`  - "${t.sourceText.substring(0, 30)}..." (${t.sourceLang}) → "${t.targetText.substring(0, 30)}..." (${t.targetLang})`)
      console.log(`    Type: ${t.translationType} | Public: ${t.isPublic ? 'Oui' : 'Non'} | Qualité: ${t.quality || 'N/A'}`)
      console.log(`    Par: ${t.user?.name || 'Anonyme'}`)
    })
    
    // Statistiques avancées
    const stats = await Promise.all([
      prisma.user.count(),
      prisma.translation.count(),
      prisma.role.count(),
      prisma.session.count(),
      prisma.translation.count({ where: { isPublic: true } }),
      prisma.translation.count({ where: { translationType: 'auto' } }),
    ])
    
    console.log('\n📊 Statistiques détaillées:')
    console.log(`  - Utilisateurs: ${stats[0]}`)
    console.log(`  - Traductions totales: ${stats[1]}`)
    console.log(`  - Rôles: ${stats[2]}`)
    console.log(`  - Sessions actives: ${stats[3]}`)
    console.log(`  - Traductions publiques: ${stats[4]}`)
    console.log(`  - Traductions automatiques: ${stats[5]}`)
    
    console.log('\n✅ Base de données IndoFrench améliorée et opérationnelle !')
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()
