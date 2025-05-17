import { z } from 'zod';

interface ItineraryInput {
  duration: number;
  interests: string[];
  location: string;
  transportModes: string[];
}

// Zod schema for Location
const LocationSchema = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string().optional()
});

// Zod schema for Itinerary
const ItinerarySchema = z.object({
  title: z.string(),
  description: z.string(),
  locations: z.array(LocationSchema),
  route: z.object({
    description: z.string()
  })
});

// TypeScript types derived from Zod schemas
type Location = z.infer<typeof LocationSchema>;
type Itinerary = z.infer<typeof ItinerarySchema>;

export async function generateItinerary(input: ItineraryInput): Promise<Itinerary> {
  try {
    const response = await fetch('/api/itinerary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate itinerary');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw error;
  }
}