import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    // With bodyParser disabled, the function should now execute without timing out.
    // We are not parsing the body yet, just confirming the endpoint is reachable.
    return NextResponse.json({
      message: "API Upload Test - POST request received successfully with bodyParser disabled.",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Error in upload-test API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      error: "POST Error",
      details: errorMessage
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "API Upload Test - GET works",
  });
}
