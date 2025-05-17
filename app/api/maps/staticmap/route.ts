import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const zoom = searchParams.get('zoom') || '15';
  const size = searchParams.get('size') || '600x400';
  const name = searchParams.get('name');
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
    // Build the Static Maps API URL
    let url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}`;
    url += `&zoom=${zoom}`;
    url += `&size=${size}`;
    url += `&maptype=roadmap`;
    url += `&scale=2`; // For higher resolution on retina displays
    url += `&markers=color:red|${lat},${lng}`;
    url += `&key=${API_KEY}`;
    
    // Return a redirect response to the Google Static Maps API
    return NextResponse.redirect(url);
  } catch (error) {
    console.error('Error generating Static Map URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate static map' },
      { status: 500 }
    );
  }
} 