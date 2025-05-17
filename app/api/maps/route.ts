import { NextResponse } from 'next/server';
import { Client, PlaceInputType } from '@googlemaps/google-maps-services-js';

const mapsClient = new Client({});

export async function POST(request: Request) {
  try {
    const { operation, params } = await request.json();
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'Google Maps API key is not configured' },
        { status: 500 }
      );
    }

    switch (operation) {
      case 'geocode': {
        const { address } = params;
        const response = await mapsClient.geocode({
          params: {
            address,
            key: API_KEY
          }
        });

        if (response.data.results && response.data.results.length > 0) {
          const location = response.data.results[0].geometry.location;
          return NextResponse.json({
            lat: location.lat,
            lng: location.lng
          });
        } else {
          return NextResponse.json(
            { error: 'Location not found' },
            { status: 404 }
          );
        }
      }

      case 'placePhoto': {
        const { placeName } = params;
        
        // First, search for the place to get its ID
        const findPlaceResponse = await mapsClient.findPlaceFromText({
          params: {
            input: placeName,
            inputtype: PlaceInputType.textQuery,
            fields: ['photos', 'place_id', 'name'],
            key: API_KEY
          }
        });

        const candidates = findPlaceResponse.data.candidates;
        if (!candidates || candidates.length === 0 || !candidates[0].photos || candidates[0].photos.length === 0) {
          return NextResponse.json({ url: null });
        }

        const photoReference = candidates[0].photos[0].photo_reference;
        const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoReference}&key=${API_KEY}`;
        
        return NextResponse.json({ url });
      }

      case 'streetView': {
        const { lat, lng } = params;
        const url = `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${lat},${lng}&key=${API_KEY}`;
        return NextResponse.json({ url });
      }

      case 'staticMap': {
        const { lat, lng, name } = params;
        const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x400&markers=color:red%7C${lat},${lng}&key=${API_KEY}`;
        return NextResponse.json({ url });
      }

      default:
        return NextResponse.json(
          { error: 'Unknown operation' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in Maps API:', error);
    return NextResponse.json(
      { error: 'Failed to process maps request' },
      { status: 500 }
    );
  }
} 