# Travel Planner

## Overview

This is a travel planner app that allows you to create and share travel itineraries. It uses the Google Maps API and GPT API to generate itineraries and locations.


Tech Stack:
- Next.js
- Tailwind CSS
- Shadcn UI
- Lucide
- Google Maps API
- GPT API
- Bolt.new and Cursor for development

# Project Setup

## Environment Variables

To set up your environment variables:

1. Create a `.env` file in the root of the project with the following variables:

```
# API Keys - Server-side only
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
OPENAI_API_KEY=your-openai-api-key
```

2. Replace `your-google-maps-api-key` and `your-openai-api-key` with your actual API keys.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application. 