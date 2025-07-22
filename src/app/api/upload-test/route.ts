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
    let hasFormData = false;
    let message = "API Upload Test - POST reçu avec succès";

    if (contentType && contentType.includes('multipart/form-data')) {
      hasFormData = true;
      message = "API Upload Test - POST avec multipart/form-data reçu";
      
      // In the Edge runtime, we can now try to parse the form data
      const formData = await request.formData();
      const file = formData.get('file');
      if (file) {
        message = `Edge API - Fichier '${(file as File).name}' reçu avec succès.`;
      } else {
        message = "Edge API - multipart/form-data reçu, mais aucun fichier trouvé.";
      }
    }
    
    return new Response(
      JSON.stringify({
        message: message,
        timestamp: new Date().toISOString(),
        status: "OK",
        hasFormData: hasFormData,
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
        details: errorMessage
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
