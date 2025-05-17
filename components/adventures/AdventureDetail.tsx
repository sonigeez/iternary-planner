"use client";

import { useState, useEffect } from 'react';
import { Clock, MapPin, Route, Calendar, Navigation, Bookmark, Share2, GripVertical } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Adventure } from '@/types/adventure';
import GoogleMap from '@/components/maps/GoogleMap';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { updateAdventureLocations } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

interface AdventureDetailProps {
  adventure: Adventure;
}

interface SortableLocationItemProps {
  location: Adventure['locations'][0];
  index: number;
}

function SortableLocationItem({ location, index }: SortableLocationItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: location.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <Card key={location.id} ref={setNodeRef} style={style} className={`mb-4 ${isDragging ? 'border-primary shadow-lg' : ''}`}>
      <div className="md:flex">
        <img 
          className="h-40 md:w-1/3 bg-cover bg-center"
          src={location.imageUrl} alt={location.name} 
        />
        <div className="md:w-2/3 relative">
          <div 
            className="absolute right-4 top-4 p-1.5 cursor-grab hover:bg-muted rounded-full" 
            {...attributes} 
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>{location.name}</CardTitle>
              {/* <Badge variant="outline">{index + 1}</Badge> */}
            </div>
            <CardDescription className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {location.address}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {location.description}
            </p>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

export default function AdventureDetail({ adventure }: AdventureDetailProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [locations, setLocations] = useState(adventure.locations);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();
  
  // Update locations when adventure prop changes
  useEffect(() => {
    setLocations(adventure.locations);
    setHasChanges(false);
  }, [adventure.locations]);
  
  // Create route points from locations
  const routePoints = locations.map(loc => ({
    lat: loc.lat,
    lng: loc.lng
  }));
  
  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  // Handle reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setLocations(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        // Create a new array with the reordered items
        const newItems = [...items];
        const [removedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removedItem);
        
        // Set flag that we have unsaved changes
        setHasChanges(true);
        
        return newItems;
      });
    }
  };
  
  // Save reordered locations
  const handleSaveOrder = async () => {
    setIsSaving(true);
    
    try {
      const updatedAdventure = updateAdventureLocations(adventure.id, locations);
      
      if (updatedAdventure) {
        setHasChanges(false);
        toast({
          title: "Itinerary updated",
          description: "Your customized route has been saved.",
          duration: 3000,
        });
      } else {
        throw new Error("Failed to update itinerary");
      }
    } catch (error) {
      console.error("Error saving itinerary:", error);
      toast({
        title: "Error",
        description: "Could not save your changes. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div 
        className="relative h-60 md:h-80 w-full bg-cover bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${adventure.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex justify-between items-end">
            <div>
              <Badge className="mb-3">{adventure.theme}</Badge>
              <h1 className="text-3xl font-bold text-white mb-2">{adventure.title}</h1>
              <div className="flex items-center text-white/90 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{adventure.neighborhood}, {adventure.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="story">Narrative</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Adventure Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <Clock className="h-5 w-5 mb-1 text-muted-foreground" />
                      <span className="text-sm font-medium">{adventure.duration} hours</span>
                      <span className="text-xs text-muted-foreground">Duration</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <Route className="h-5 w-5 mb-1 text-muted-foreground" />
                      <span className="text-sm font-medium">{adventure.distance} miles</span>
                      <span className="text-xs text-muted-foreground">Distance</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <Navigation className="h-5 w-5 mb-1 text-muted-foreground" />
                      <span className="text-sm font-medium capitalize">{adventure.difficulty}</span>
                      <span className="text-xs text-muted-foreground">Difficulty</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">About This Adventure</h3>
                    <p className="text-muted-foreground">
                      {adventure.description}
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Transportation</h3>
                    <div className="flex gap-2">
                      {adventure.transportModes.includes('walking') && (
                        <Badge variant="outline">Walking</Badge>
                      )}
                      {adventure.transportModes.includes('public') && (
                        <Badge variant="outline">Public Transit</Badge>
                      )}
                      {adventure.transportModes.includes('driving') && (
                        <Badge variant="outline">Car/Rideshare</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Journey Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <GoogleMap 
                    center={routePoints[0]}
                    markers={routePoints}
                    route={routePoints}
                    zoom={13}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="story" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{adventure.title}: The Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {adventure.narrative}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="locations" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Your Itinerary</h3>
                <div className="text-sm text-muted-foreground flex items-center">
                  <GripVertical className="h-4 w-4 mr-1" />
                  <span>Drag locations to reorder</span>
                </div>
              </div>
              
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext 
                  items={locations.map(location => location.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {locations.map((location, index) => (
                    <SortableLocationItem 
                      key={location.id} 
                      location={location} 
                      index={index} 
                    />
                  ))}
                </SortableContext>
              </DndContext>
              
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <Button 
                    className="w-full" 
                    onClick={handleSaveOrder} 
                    disabled={!hasChanges || isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Itinerary Order'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="map" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Map</CardTitle>
                  <CardDescription>Follow your adventure route</CardDescription>
                </CardHeader>
                <CardContent>
                  <GoogleMap 
                    center={routePoints[0]}
                    markers={routePoints}
                    route={routePoints}
                    zoom={14}
                    className="h-[600px] w-full rounded-lg"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Begin Adventure</CardTitle>
              <CardDescription>Ready to start exploring?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button className="w-full" size="lg">
                Start Now
              </Button>
              
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule for Later
              </Button>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">What to Expect</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="bg-primary/20 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <span>Step-by-step navigation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/20 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <span>Location-triggered narrative content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/20 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <span>Passport stamps for each location visited</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/20 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                    <span>Adventure completion achievement</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}