export interface Location {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  lat: number;
  lng: number;
  type: 'attraction' | 'restaurant' | 'cafe' | 'park' | 'museum' | 'shop' | 'landmark';
}

export interface Adventure {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  theme: string;
  duration: number; // in hours
  distance: number; // in miles
  neighborhood: string;
  city: string;
  locations: Location[];
  narrative: string;
  transportModes: ('walking' | 'public' | 'driving')[];
  difficulty: 'easy' | 'moderate' | 'challenging';
  createdAt: string;
}

export type AdventurePreference = {
  duration: [number, number]; // min and max hours
  interests: string[];
  transportModes: ('walking' | 'public' | 'driving')[];
  theme?: string;
  startLocation?: { lat: number; lng: number } | null;
};