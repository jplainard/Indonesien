import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, fileName, original, translation, sourceLang, targetLang } = body;

    // Enregistrement en base
    const saved = await prisma.translation.create({
      data: {
        userId,
        fileName,
        fileSize: body.fileSize,
        sourceText: original,
        sourceLang,
        targetText: translation,
        targetLang,
        quality: 85,
        translationType: 'auto',
        isPublic: false,
        createdAt: new Date(),
      }
    });

    return NextResponse.json({ success: true, id: saved.id });
  } catch (error) {
    console.error('❌ Erreur save-translation:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Erreur inconnue' }, { status: 500 });
  }
}
