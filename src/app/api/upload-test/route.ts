import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: "API Upload Test - GET fonctionne",
    timestamp: new Date().toISOString(),
    status: "OK"
  });
}

export async function POST(request: NextRequest) {
  try {
    // Ne pas essayer de lire le corps pour ce test.
    // On veut juste voir si la fonction est déclenchée.
    console.log(`Requête POST reçue sur /api/upload-test à ${new Date().toISOString()}`);
    
    return NextResponse.json({
      message: "API Upload Test - POST reçu avec succès",
      timestamp: new Date().toISOString(),
      status: "OK",
      headers: {
        'content-type': request.headers.get('content-type'),
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
