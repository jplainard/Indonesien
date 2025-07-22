import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // Use the Edge runtime

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let message = "Edge API - POST received";
    if (contentType.includes('multipart/form-data')) {
      message = "Edge API - multipart/form-data POST received";
    }
    
    return new Response(
      JSON.stringify({
        message: message,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ Error in Edge upload-test API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({
        error: "POST Error",
        details: errorMessage
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Edge API - GET works",
  });
}
