import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(
      { 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'IndoFrench API'
      },
      { status: 200 }
    );
  } catch (_error) {
    return NextResponse.json(
      { error: 'Service unavailable' },
      { status: 503 }
    );
  }
}
