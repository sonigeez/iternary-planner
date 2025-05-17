"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Adventure } from '@/types/adventure';
import { Award, MapPin, Clock, Calendar, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PassportViewProps {
  completedAdventures: Adventure[];
  statistics: {
    totalDistance: number;
    totalTime: number;
    locationsVisited: number;
    citiesExplored: number;
    adventuresCompleted: number;
  };
  achievements: {
    id: string;
    name: string;
    description: string;
    icon: string;
    dateEarned: string;
  }[];
  cities: {
    name: string;
    adventuresCompleted: number;
    totalAdventures: number;
  }[];
}

export default function PassportView({ completedAdventures, statistics, achievements, cities }: PassportViewProps) {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="passport">
        <TabsList className="mb-8">
          <TabsTrigger value="passport">My Passport</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="passport" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cities.map((city) => (
              <Card key={city.name} className="group hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                  <CardTitle>{city.name}</CardTitle>
                  <CardDescription>
                    {city.adventuresCompleted} of {city.totalAdventures} adventures completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={(city.adventuresCompleted / city.totalAdventures) * 100} className="h-2" />
                  
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {Array.from({ length: city.totalAdventures }).map((_, i) => (
                      <div 
                        key={i}
                        className={`aspect-square rounded-lg flex items-center justify-center ${
                          i < city.adventuresCompleted 
                            ? 'bg-primary/10 border-primary/30 border' 
                            : 'bg-muted border-dashed border'
                        }`}
                      >
                        {i < city.adventuresCompleted ? (
                          <Award className="h-6 w-6 text-primary" />
                        ) : (
                          <div className="h-6 w-6 rounded-full border-2 border-dashed border-muted-foreground/30" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mt-12 mb-6">Recent Adventures</h2>
          
          <div className="space-y-4">
            {completedAdventures.slice(0, 3).map((adventure) => (
              <Card key={adventure.id} className="overflow-hidden">
                <div className="md:flex">
                  <div 
                    className="h-40 md:w-1/3 bg-cover bg-center"
                    style={{ backgroundImage: `url(${adventure.imageUrl})` }}
                  />
                  <div className="md:w-2/3 flex flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle>{adventure.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {adventure.neighborhood}, {adventure.city}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{adventure.duration} hours</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Completed on {new Date().toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {adventure.locations.slice(0, 3).map((location) => (
                          <div 
                            key={location.id} 
                            className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-background"
                            style={{ backgroundImage: `url(${location.imageUrl})` }}
                            title={location.name}
                          />
                        ))}
                        {adventure.locations.length > 3 && (
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                            +{adventure.locations.length - 3}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="overflow-hidden group">
                <CardHeader className="bg-muted pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{achievement.name}</CardTitle>
                    <div className="text-2xl">{achievement.icon}</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                  <p className="text-xs text-muted-foreground">Earned on {new Date(achievement.dateEarned).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
            
            {/* Locked achievements */}
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={`locked-${i}`} className="overflow-hidden opacity-60">
                <CardHeader className="bg-muted pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">???</CardTitle>
                    <div className="text-2xl">🔒</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-3">Complete more adventures to unlock</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardDescription>Total Distance</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{statistics.totalDistance}</span>
                  <span className="text-muted-foreground ml-1">miles</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardDescription>Adventures</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{statistics.adventuresCompleted}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardDescription>Time Spent</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{statistics.totalTime}</span>
                  <span className="text-muted-foreground ml-1">hours</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardDescription>Locations</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{statistics.locationsVisited}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardDescription>Cities</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{statistics.citiesExplored}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Exploration Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60 bg-muted rounded-md flex items-center justify-center">
                <span className="text-muted-foreground">Exploration chart will appear here</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Monthly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Activity chart will appear here</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Favorite Themes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Theme chart will appear here</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}