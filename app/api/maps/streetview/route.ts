import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const size = searchParams.get('size') || '600x400';
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'Google Maps API key is not configured' },
      { status: 500 }
    );
  }

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Missing location parameters' },
      { status: 400 }
    );
  }

  try {
    // Redirect to Google Street View API
    const url = `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${lat},${lng}&fov=80&heading=70&pitch=0&key=${API_KEY}`;
    
    // Return a redirect response
    return NextResponse.redirect(url);
  } catch (error) {
    console.error('Error generating Street View URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate Street View image' },
      { status: 500 }
    );
  }
} 