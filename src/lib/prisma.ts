// Helper Prisma pour IndoFrench
import { PrismaClient } from '../generated/prisma/index.js'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

export default prisma

// Types utiles
export type {
  User,
  Role,
  Translation,
  Session,
  Prisma,
} from '../generated/prisma/index.js'
