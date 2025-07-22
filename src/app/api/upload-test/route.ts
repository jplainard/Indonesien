import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET() {
  return NextResponse.json({
    message: "API Upload Test - GET fonctionne",
    timestamp: new Date().toISOString(),
    status: "OK"
  });
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    let hasFormData = false;
    let message = "API Upload Test - POST reçu avec succès";

    if (contentType && contentType.includes('multipart/form-data')) {
      hasFormData = true;
      message = "API Upload Test - POST avec multipart/form-data reçu";
      // On ne tente pas de parser le corps pour l'instant.
      // On veut juste confirmer que ce type de requête arrive.
    }
    
    return NextResponse.json({
      message: message,
      timestamp: new Date().toISOString(),
      status: "OK",
      hasFormData: hasFormData,
      headers: {
        'content-type': contentType,
        'content-length': request.headers.get('content-length'),
      }
    });
  } catch (error) {
    console.error('❌ Erreur dans l\'API upload-test:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({
      error: "Erreur lors du traitement de la requête POST",
      details: errorMessage
    }, { status: 500 });
  }
}
