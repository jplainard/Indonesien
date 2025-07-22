import { type NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(_request: NextRequest) {
  return new Response(
    JSON.stringify({
      message: "API Upload Test - GET fonctionne",
      timestamp: new Date().toISOString(),
      status: "OK"
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return new Response(
        JSON.stringify({ error: 'Content-Type must be multipart/form-data' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file found in form data' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const fileBuffer = await file.arrayBuffer();

    return new Response(
      JSON.stringify({
        message: `Edge API - Fichier '${file.name}' reçu avec succès.`,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        bufferSize: fileBuffer.byteLength,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ Erreur dans l\'API upload-test:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return new Response(
      JSON.stringify({
        error: "Erreur lors du traitement de la requête POST",
        details: errorMessage,
        errorStack: error instanceof Error ? error.stack : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
