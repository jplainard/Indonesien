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
    return NextResponse.json({
      message: "API Upload Test - POST fonctionne",
      timestamp: new Date().toISOString(),
      status: "OK",
      hasFormData: request.headers.get('content-type')?.includes('multipart') || false
    });
  } catch (error) {
    return NextResponse.json({
      error: "Erreur POST",
      details: error instanceof Error ? error.message : 'Inconnue'
    }, { status: 500 });
  }
}
