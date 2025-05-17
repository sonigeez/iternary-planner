"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import AdventureCard from '@/components/adventures/AdventureCard';
import { Search, Filter, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Adventure } from '@/types/adventure';
import { getAdventures } from '@/lib/storage';

export default function DiscoverPage() {
  const [adventures, setAdventures] = useState<Adventure[]>([]);

  useEffect(() => {
    // Load adventures from local storage
    const loadedAdventures = getAdventures();
    setAdventures(loadedAdventures);
  }, []);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Adventures</h1>
        <p className="text-lg text-muted-foreground">
          Explore curated adventures or filter to find the perfect experience for you.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine your adventure search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <div className="relative">
                  <Input placeholder="City or neighborhood" />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Duration (hours)</label>
                <Slider defaultValue={[3]} max={8} step={0.5} />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1h</span>
                  <span>4h</span>
                  <span>8h</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Themes</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Historical', 'Culinary', 'Art & Culture', 'Nature', 'Architecture', 'Hidden Gems'].map((theme) => (
                    <div key={theme} className="flex items-center space-x-2">
                      <input type="checkbox" id={theme} className="rounded text-primary" />
                      <label htmlFor={theme} className="text-sm">{theme}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Transportation</label>
                <div className="grid grid-cols-1 gap-2">
                  {['Walking Only', 'Public Transit', 'Car/Taxi'].map((mode) => (
                    <div key={mode} className="flex items-center space-x-2">
                      <input type="checkbox" id={mode} className="rounded text-primary" />
                      <label htmlFor={mode} className="text-sm">{mode}</label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search adventures..." className="max-w-xs" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="text-sm border rounded p-1">
                <option>Popular</option>
                <option>Newest</option>
                <option>Duration (Low to High)</option>
                <option>Duration (High to Low)</option>
              </select>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adventures.map((adventure) => (
                <AdventureCard key={adventure.id} adventure={adventure} />
              ))}
            </TabsContent>
            
            <TabsContent value="popular" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adventures.slice(0, 4).map((adventure) => (
                <AdventureCard key={adventure.id} adventure={adventure} />
              ))}
            </TabsContent>
            
            <TabsContent value="new" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adventures.slice(2, 6).map((adventure) => (
                <AdventureCard key={adventure.id} adventure={adventure} />
              ))}
            </TabsContent>
            
            <TabsContent value="nearby" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adventures.slice(1, 5).map((adventure) => (
                <AdventureCard key={adventure.id} adventure={adventure} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}