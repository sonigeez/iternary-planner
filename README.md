# Project Setup

## Environment Variables

To set up your environment variables:

1. Create a `.env` file in the root of the project with the following variables:

```
# API Keys - Server-side only
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
OPENAI_API_KEY=your-openai-api-key

# No client-side environment variables with API keys
# DO NOT USE NEXT_PUBLIC_ prefix for API keys
```

2. Replace `your-google-maps-api-key` and `your-openai-api-key` with your actual API keys.

## API Security

All API calls have been moved to server-side endpoints to prevent exposing API keys to clients. The following endpoints have been created:

- `/api/itinerary` - Handles OpenAI calls for generating itineraries
- `/api/maps` - Handles geocoding and place photo operations
- `/api/maps/streetview` - Serves Street View images
- `/api/maps/staticmap` - Serves Static Map images

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application. 