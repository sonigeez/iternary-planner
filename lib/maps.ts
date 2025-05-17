// Client-side wrappers for the server-side Maps API

// Geocode an address to get coordinates
export async function geocodeAddress(address: string): Promise<google.maps.LatLngLiteral> {
  try {
    const response = await fetch('/api/maps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation: 'geocode',
        params: { address }
      }),
    });

    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
}

// Generate a photo URL for a place
export async function generatePlacePhotoUrl(
  placeName: string,
  defaultImageUrl: string = 'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg'
): Promise<string> {
  try {
    const response = await fetch('/api/maps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation: 'placePhoto',
        params: { placeName }
      }),
    });

    if (!response.ok) {
      return defaultImageUrl;
    }

    const data = await response.json();
    return data.url || defaultImageUrl;
  } catch (error) {
    console.error('Error generating place photo URL:', error);
    return defaultImageUrl;
  }
}

// Generate a Street View image URL
export function generateStreetViewImageUrl(
  location: google.maps.LatLngLiteral,
  size: string = '600x400'
): string {
  try {
    // We're returning a URL that the client can use directly, but 
    // the actual API key is only used on the server side
    return `/api/maps/streetview?lat=${location.lat}&lng=${location.lng}&size=${size}`;
  } catch (error) {
    console.error('Error generating Street View URL:', error);
    return 'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg';
  }
}

// Generate a static map URL for a location
export function generateLocationMapUrl(location: { lat: number; lng: number; name?: string }): string {
  return `/api/maps/staticmap?lat=${location.lat}&lng=${location.lng}&name=${location.name || ''}`;
}

// Fetch a place photo (former direct API call)
export async function fetchPlacePhoto(
  locationName: string,
  defaultImageUrl: string = 'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg'
): Promise<string> {
  return generatePlacePhotoUrl(locationName, defaultImageUrl);
}

// Get directions between points
export async function getDirections(
  origin: google.maps.LatLngLiteral,
  destination: google.maps.LatLngLiteral,
  waypoints: google.maps.LatLngLiteral[] = []
): Promise<google.maps.DirectionsResult> {
  if (typeof window === 'undefined') {
    throw new Error('Directions service requires browser environment');
  }
  
  const directionsService = new google.maps.DirectionsService();
  
  const request: google.maps.DirectionsRequest = {
    origin,
    destination,
    waypoints: waypoints.map(location => ({
      location,
      stopover: true
    })),
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.WALKING
  };

  return new Promise((resolve, reject) => {
    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        resolve(result!);
      } else {
        reject(new Error(`Failed to get directions: ${status}`));
      }
    });
  });
}

// Generate a static map for an adventure with multiple locations
export function generateAdventureMapUrl(
  center: google.maps.LatLngLiteral,
  locations: Array<{ lat: number; lng: number }>
): string {
  // This would need a similar server endpoint as generateLocationMapUrl
  // For now, we'll use a simplified version
  return `/api/maps/staticmap?lat=${center.lat}&lng=${center.lng}&zoom=13&size=600x400`;
}