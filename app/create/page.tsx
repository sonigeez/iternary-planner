"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, Route, Map, ArrowRight, Compass } from 'lucide-react';
import { AdventurePreference } from '@/types/adventure';
import { useRouter } from 'next/navigation';
import GoogleMap from '@/components/maps/GoogleMap';
import { geocodeAddress } from '@/lib/maps';
import { createAdventure } from '@/lib/storage';
import { toast } from 'sonner';

const interestOptions = [
  { value: 'food', label: 'Food & Drink', icon: '🍽️' },
  { value: 'history', label: 'History', icon: '🏛️' },
  { value: 'art', label: 'Art & Culture', icon: '🎨' },
  { value: 'nature', label: 'Nature', icon: '🌳' },
  { value: 'architecture', label: 'Architecture', icon: '🏙️' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'music', label: 'Music', icon: '🎵' },
  { value: 'hidden-gems', label: 'Hidden Gems', icon: '💎' },
] as const;

const transportOptions = [
  { value: 'walking', label: 'Walking Only', icon: '👟' },
  { value: 'public', label: 'Public Transit', icon: '🚆' },
  { value: 'driving', label: 'Car/Rideshare', icon: '🚗' },
] as const;

const themeOptions = [
  { 
    value: 'explorer',
    label: 'Urban Explorer',
    description: 'Discover hidden gems and local secrets as an intrepid urban explorer.'
  },
  {
    value: 'historian',
    label: 'Time Traveler',
    description: 'Journey through history, uncovering stories from the past in modern settings.'
  },
  {
    value: 'foodie',
    label: 'Culinary Adventure',
    description: 'Experience the city through its flavors, aromas, and culinary traditions.'
  },
  {
    value: 'photographer',
    label: 'Visual Journey',
    description: 'Capture stunning views and unique perspectives of urban landscapes.'
  }
] as const;

type TransportMode = typeof transportOptions[number]['value'];

export default function CreatePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState<AdventurePreference>({
    duration: [2, 3],
    interests: [],
    transportModes: ['walking'],
    theme: undefined,
    startLocation: null,
  });
  const [address, setAddress] = useState('');
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
    lat: 47.6062,
    lng: -122.3321
  });
  const [mapError, setMapError] = useState<string | null>(null);

  const handleNextStep = async () => {
    console.log('Moving to next step. Current step:', currentStep);
    
    if (currentStep === 2 && !preferences.startLocation) {
      console.warn('No start location selected');
      setMapError('Please select a starting location');
      return;
    }
    setMapError(null);
    setCurrentStep(currentStep + 1);
    console.log('Moved to step:', currentStep + 1);
  };

  const handlePrevStep = () => {
    console.log('Moving to previous step');
    setMapError(null);
    setCurrentStep(currentStep - 1);
  };

  const handleInterestToggle = (interest: string) => {
    console.log('Toggling interest:', interest);
    setPreferences(prev => {
      if (prev.interests.includes(interest)) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleTransportToggle = (mode: TransportMode) => {
    console.log('Toggling transport mode:', mode);
    setPreferences(prev => {
      const currentModes = prev.transportModes as TransportMode[];
      if (currentModes.includes(mode)) {
        if (currentModes.length === 1) return prev;
        return { ...prev, transportModes: currentModes.filter(m => m !== mode) };
      } else {
        return { ...prev, transportModes: [...currentModes, mode] };
      }
    });
  };

  const handleThemeSelect = (theme: string) => {
    console.log('Selecting theme:', theme);
    setPreferences(prev => ({ ...prev, theme }));
  };

  const handleDurationChange = (value: number[]) => {
    console.log('Changing duration:', value);
    setPreferences(prev => ({ ...prev, duration: [value[0], value[0] + 1] }));
  };

  const handleAddressSearch = async () => {
    console.log('Searching for address:', address);
    try {
      setMapError(null);
      
      // Validate address input
      if (!address.trim()) {
        console.warn('Empty address input');
        setMapError('Please enter an address');
        return;
      }

      // Check if Google Maps API is available
      if (typeof google === 'undefined') {
        console.error('Google Maps API not loaded');
        setMapError('Google Maps is not loaded. Please check your API key configuration.');
        return;
      }

      // Attempt to geocode the address
      const location = await geocodeAddress(address);
      console.log('Address geocoded successfully:', location);
      
      if (!location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
        console.error('Invalid location data received');
        setMapError('Invalid location data received');
        return;
      }

      setMapCenter(location);
      setPreferences(prev => ({ ...prev, startLocation: location }));
      
    } catch (error: any) {
      console.error('Geocoding error:', error);
      
      // Handle specific error cases
      if (error.message.includes('ZERO_RESULTS')) {
        setMapError('No results found for this address. Please try a different address.');
      } else if (error.message.includes('INVALID_REQUEST')) {
        setMapError('Invalid address format. Please enter a valid address.');
      } else if (error.message.includes('API_KEY')) {
        setMapError('Map service is temporarily unavailable. Please try again later.');
      } else {
        setMapError('Could not find the specified address. Please try again.');
      }
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    console.log('Map clicked:', event.latLng?.toJSON());
    if (event.latLng) {
      const location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      setMapCenter(location);
      setPreferences(prev => ({ ...prev, startLocation: location }));
      setMapError(null);
    }
  };

  const handleCreateAdventure = async () => {
    console.log('Starting adventure creation...');
    console.log('Current preferences:', preferences);

    if (!preferences.startLocation) {
      console.error('No start location selected');
      setMapError('Please select a starting location');
      return;
    }

    if (!preferences.theme) {
      console.error('No theme selected');
      toast.error('Please select an adventure theme');
      return;
    }

    setLoading(true);
    try {
      console.log('Creating adventure...');
      // Create a new adventure and save it to local storage
      const newAdventure = await createAdventure(preferences);
      
      if (!newAdventure || !newAdventure.id) {
        throw new Error('Failed to create adventure: Invalid adventure data');
      }
      
      console.log('Adventure created successfully:', newAdventure);
      console.log('Redirecting to:', `/adventures/${newAdventure.id}`);
      
      // Redirect to the new adventure using the generated ID
      router.push(`/adventures/${newAdventure.id}`);
      toast.success('Adventure created successfully!');
    } catch (error: any) {
      console.error('Error creating adventure:', error);
      toast.error(error.message || 'Failed to create adventure. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Create Your Adventure</h1>
        <p className="text-lg text-muted-foreground">
          Tell us a bit about what you're looking for, and we'll craft a unique experience just for you.
        </p>
      </div>

      <div className="relative mb-12">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
        <div className="relative flex justify-between max-w-md mx-auto">
          {[1, 2, 3].map((step) => (
            <div 
              key={step} 
              className={`rounded-full h-10 w-10 flex items-center justify-center relative z-10 ${
                step === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : step < currentStep
                  ? 'bg-primary/80 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      <Card className="border shadow-sm w-full">
        {currentStep === 1 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Time & Interests
              </CardTitle>
              <CardDescription>
                How much time do you have and what are you interested in?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">How much time do you have?</h3>
                <div className="px-4">
                  <Slider 
                    defaultValue={[2]} 
                    max={8} 
                    step={0.5} 
                    onValueChange={handleDurationChange} 
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-muted-foreground">1 hour</span>
                    <span className="text-sm text-muted-foreground">4 hours</span>
                    <span className="text-sm text-muted-foreground">8 hours</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-lg font-medium">
                    {preferences.duration[0]} hours
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">What are you interested in?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest.value}
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg text-center transition-all ${
                        preferences.interests.includes(interest.value)
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-background hover:bg-muted'
                      }`}
                      onClick={() => handleInterestToggle(interest.value)}
                    >
                      <span className="text-2xl mb-1">{interest.icon}</span>
                      <span className="text-sm">{interest.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNextStep} disabled={preferences.interests.length === 0}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        )}

        {currentStep === 2 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5" />
                Transportation & Location
              </CardTitle>
              <CardDescription>
                How would you like to get around and where are you starting?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Transportation modes</h3>
                <div className="grid grid-cols-3 gap-3">
                  {transportOptions.map((transport) => (
                    <button
                      key={transport.value}
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg text-center transition-all ${
                        preferences.transportModes.includes(transport.value)
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-background hover:bg-muted'
                      }`}
                      onClick={() => handleTransportToggle(transport.value)}
                      disabled={preferences.transportModes.length === 1 && preferences.transportModes.includes(transport.value)}
                    >
                      <span className="text-2xl mb-1">{transport.icon}</span>
                      <span className="text-sm">{transport.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Starting location</h3>
                <div className="flex items-center space-x-2 relative">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Enter an address or click on the map"
                      className="pl-10"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddressSearch()}
                    />
                  </div>
                  <Button variant="outline" size="icon" onClick={handleAddressSearch}>
                    <Map className="h-4 w-4" />
                  </Button>
                </div>
                {mapError && (
                  <p className="text-sm text-destructive mt-2">{mapError}</p>
                )}
                <div className="mt-4 h-80 rounded-lg overflow-hidden border">
                  <GoogleMap
                    center={mapCenter}
                    zoom={14}
                    markers={preferences.startLocation ? [preferences.startLocation] : []}
                    onMapClick={handleMapClick}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>Back</Button>
              <Button onClick={handleNextStep}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        )}

        {currentStep === 3 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="h-5 w-5" />
                Adventure Theme
              </CardTitle>
              <CardDescription>
                Choose a theme for your adventure narrative
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {themeOptions.map((theme) => (
                  <button
                    key={theme.value}
                    className={`flex items-start p-4 border rounded-lg transition-all text-left ${
                      preferences.theme === theme.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-background hover:bg-muted'
                    }`}
                    onClick={() => handleThemeSelect(theme.value)}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{theme.label}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{theme.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>Back</Button>
              <Button onClick={handleCreateAdventure} disabled={loading}>
                {loading ? 'Creating...' : 'Create Adventure'}
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}