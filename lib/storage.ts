import { Adventure, AdventurePreference, Location } from '@/types/adventure';
import { mockAdventures } from '@/data/mockData';
import { generateItinerary } from './gemini';
import { 
  geocodeAddress, 
  generateLocationMapUrl, 
  generatePlacePhotoUrl,
  generateStreetViewImageUrl,
  fetchPlacePhoto
} from './maps';

// Get all adventures
export const getAdventures = (): Adventure[] => {
  try {
    if (typeof window === 'undefined') {
      return mockAdventures;
    }
    
    const adventures = localStorage.getItem('adventures');
    if (!adventures) {
      localStorage.setItem('adventures', JSON.stringify(mockAdventures));
      return mockAdventures;
    }
    return JSON.parse(adventures);
  } catch (error) {
    console.error('Error accessing adventures:', error);
    return mockAdventures;
  }
};

// Save adventures
const saveAdventures = (adventures: Adventure[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adventures', JSON.stringify(adventures));
  }
};

// Get adventure by ID
export const getAdventureById = (id: string): Adventure | undefined => {
  const adventures = getAdventures();
  return adventures.find(adv => adv.id === id);
};

// Update adventure locations order
export const updateAdventureLocations = (
  adventureId: string, 
  newLocations: Location[]
): Adventure | null => {
  try {
    const adventures = getAdventures();
    const adventureIndex = adventures.findIndex(adv => adv.id === adventureId);
    
    if (adventureIndex === -1) {
      console.error(`Adventure with ID ${adventureId} not found`);
      return null;
    }
    
    // Update the locations array
    adventures[adventureIndex] = {
      ...adventures[adventureIndex],
      locations: newLocations
    };
    
    // Save updated adventures
    saveAdventures(adventures);
    
    return adventures[adventureIndex];
  } catch (error) {
    console.error('Error updating adventure locations:', error);
    return null;
  }
};

// Generate a unique ID
const generateUniqueId = (prefix: string): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 10);
  console.log(`Generating unique ID: ${prefix}_${timestamp}_${randomStr}`);
  return `${prefix}_${timestamp}_${randomStr}`;
};

// Get an image URL for a location
const getLocationImageUrl = async (
  locationName: string,
  coords: google.maps.LatLngLiteral,
  city: string
): Promise<string> => {
  // Build full location name to improve search results
  const fullLocationName = `${locationName}, ${city}`;
  console.log(`Getting photo for location: ${fullLocationName}`);
  
  // Try in this order: 
  // 1. Direct Place Photo API (more reliable and works both client/server)
  // 2. Places JS API (client-side only)
  // 3. Street View API
  // 4. Static Map API
  
  try {
    // 1. First try to get a real photo using direct Place Photo API
    const photoUrl = await fetchPlacePhoto(fullLocationName);
    if (photoUrl && !photoUrl.includes('pexels')) {
      console.log(`Found Places API photo for ${locationName}`);
      return photoUrl;
    }
    
    // 2. If client-side, try JS API as well
    if (typeof window !== 'undefined') {
      const jsApiPhotoUrl = await generatePlacePhotoUrl(fullLocationName);
      if (jsApiPhotoUrl && !jsApiPhotoUrl.includes('pexels')) {
        console.log(`Found JS Places API photo for ${locationName}`);
        return jsApiPhotoUrl;
      }
    }
    
    // 3. If no Place photo found, try Street View
    console.log(`No Places API photo found, trying Street View for ${locationName}`);
    const streetViewUrl = generateStreetViewImageUrl(coords);
    
    // 4. As last resort, fall back to static map
    console.log(`Falling back to map for ${locationName}`);
    return streetViewUrl;
  } catch (error) {
    console.error(`Error getting image for ${locationName}:`, error);
    return generateLocationMapUrl({ lat: coords.lat, lng: coords.lng, name: locationName });
  }
};

// Create a new adventure
export const createAdventure = async (preferences: AdventurePreference): Promise<Adventure> => {
  console.log('Starting adventure creation with preferences:', preferences);

  if (!preferences.startLocation) {
    console.error('Start location is missing');
    throw new Error('Start location is required');
  }

  try {
    console.log('Getting location details from Google Maps...');
    // Get location details using Google Maps Geocoding
    const geocoder = new google.maps.Geocoder();
    const locationDetails = await new Promise<google.maps.GeocoderResult>((resolve, reject) => {
      geocoder.geocode({ location: preferences.startLocation }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          console.log('Location details retrieved successfully');
          resolve(results[0]);
        } else {
          console.error('Geocoding failed:', status);
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });

    // Extract city and neighborhood
    const addressComponents = locationDetails.address_components;
    const city = addressComponents?.find(c => c.types.includes('locality'))?.long_name || 'Unknown City';
    const neighborhood = addressComponents?.find(c => c.types.includes('neighborhood'))?.long_name || 
                        addressComponents?.find(c => c.types.includes('sublocality'))?.long_name || 
                        'Custom Location';

    console.log('Location details extracted:', { city, neighborhood });

    // Generate adventure content using OpenAI
    console.log('Generating itinerary...');
    const itinerary = await generateItinerary({
      duration: preferences.duration[0],
      interests: preferences.interests,
      location: `${neighborhood}, ${city}`,
      transportModes: preferences.transportModes
    });

    console.log('Itinerary generated successfully:', itinerary);

    // Create locations with unique IDs
    console.log('Creating locations...');
    const locations = await Promise.all(itinerary.locations.map(async (loc, index) => {
      console.log(`Processing location ${index + 1}:`, loc.name);
      
      const coords = await geocodeAddress(loc.name + ', ' + city).catch((error) => {
        console.warn(`Failed to geocode location "${loc.name}". Using approximate coordinates.`, error);
        return {
          lat: preferences.startLocation!.lat + (Math.random() - 0.5) * 0.01,
          lng: preferences.startLocation!.lng + (Math.random() - 0.5) * 0.01
        };
      });

      // Get a real image for this location
      const imageUrl = await getLocationImageUrl(loc.name, coords, city);

      return {
        id: generateUniqueId('loc'),
        name: loc.name,
        description: loc.description,
        imageUrl,
        address: loc.address || 'Address pending',
        lat: coords.lat,
        lng: coords.lng,
        type: 'attraction' as const
      };
    }));

    console.log('Locations created successfully:', locations);

    // Create new adventure with unique ID
    const adventureId = generateUniqueId('adv');
    console.log('Generated adventure ID:', adventureId);

    // Get an image for the adventure itself - try with the neighborhood name
    const adventureImageUrl = await getLocationImageUrl(
      `${neighborhood}`, 
      preferences.startLocation,
      city
    );

    const newAdventure: Adventure = {
      id: adventureId,
      title: itinerary.title,
      description: itinerary.description,
      imageUrl: adventureImageUrl,
      theme: preferences.theme || 'Explorer',
      duration: preferences.duration[0],
      distance: parseFloat(itinerary.route.description.match(/\d+(\.\d+)?/)?.[0] || '2.5'),
      neighborhood,
      city,
      locations,
      narrative: itinerary.route.description,
      transportModes: preferences.transportModes,
      difficulty: 'moderate',
      createdAt: new Date().toISOString()
    };

    console.log('New adventure created:', newAdventure);

    // Save to localStorage
    const adventures = getAdventures();
    adventures.push(newAdventure);
    saveAdventures(adventures);
    console.log('Adventure saved successfully');

    return newAdventure;
  } catch (error) {
    console.error('Error creating adventure:', error);
    throw new Error('Failed to create adventure. Please try again.');
  }
};