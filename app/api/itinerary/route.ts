import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod';

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

interface ItineraryInput {
  duration: number;
  interests: string[];
  location: string;
  transportModes: string[];
}

export async function POST(request: Request) {
  try {
    const input: ItineraryInput = await request.json();
    
    // Initialize OpenAI client with server-side API key
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    
    const prompt = `Create a detailed itinerary for a ${input.duration} hour adventure in ${input.location}. 
      The person is interested in: ${input.interests.join(', ')}. 
      They will be using these transport modes: ${input.transportModes.join(', ')}.
      Keep the itinerary detailed and include all the locations and activities.
      Include real, up-to-date information about locations, opening hours, and local attractions.`;

    const response = await openai.responses.parse({
      model: "gpt-4.1",
      tools: [{ type: "web_search_preview", search_context_size: "high" }],
      input: [
        {
          role: "system",
          content: "You are a helpful assistant that creates detailed travel itineraries. Use web search to find accurate and up-to-date information about locations, attractions, and local details."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      text: {
        format: zodTextFormat(ItinerarySchema, "itinerary")
      }
    });

    // Check for refusals
    const output = response.output[0];
    if (output.type === 'message' && output.content[0].type === 'refusal') {
      return NextResponse.json(
        { error: `Request refused: ${output.content[0].refusal}` },
        { status: 400 }
      );
    }

    // Check for null response
    if (!response.output_parsed) {
      return NextResponse.json(
        { error: 'Failed to generate itinerary' },
        { status: 500 }
      );
    }

    return NextResponse.json(response.output_parsed);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary' },
      { status: 500 }
    );
  }
} 