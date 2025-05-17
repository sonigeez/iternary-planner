"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Bell, Globe, User, Settings, Shield, LogOut } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Profile</h1>
        <p className="text-lg text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <CardTitle>Jane Doe</CardTitle>
                <CardDescription>Urban Explorer</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Adventures</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Achievements</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Member Since</span>
                  <span className="font-medium">Jan 2025</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardFooter>
          </Card>
          
          <div className="hidden md:block">
            <nav className="flex flex-col space-y-1 mt-6">
              <Button variant="ghost" className="justify-start">
                <User className="mr-2 h-4 w-4" />
                Account
              </Button>
              <Button variant="ghost" className="justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="justify-start">
                <Globe className="mr-2 h-4 w-4" />
                Preferences
              </Button>
              <Button variant="ghost" className="justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Privacy
              </Button>
              <Button variant="ghost" className="justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Advanced
              </Button>
            </nav>
          </div>
        </div>
        
        <div className="md:w-3/4">
          <Tabs defaultValue="account">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio" 
                      rows={4} 
                      className="w-full p-2 rounded-md border resize-none bg-background"
                      defaultValue="Urban explorer passionate about discovering hidden gems and local history."
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage when and how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Adventures</p>
                        <p className="text-sm text-muted-foreground">Get notified when new adventures are available in your area</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Achievement Unlocks</p>
                        <p className="text-sm text-muted-foreground">Receive notifications when you earn new achievements</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Scheduled Adventures</p>
                        <p className="text-sm text-muted-foreground">Reminders for adventures you've scheduled</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Newsletter</p>
                        <p className="text-sm text-muted-foreground">Weekly digest of new features and popular adventures</p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Adventure Preferences</CardTitle>
                  <CardDescription>Customize your adventure experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Preferred Transportation Modes</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {['Walking', 'Public Transit', 'Car/Rideshare', 'Cycling', 'Scooter'].map((mode) => (
                          <div key={mode} className="flex items-center space-x-2">
                            <input type="checkbox" id={mode} className="rounded text-primary" defaultChecked={['Walking', 'Public Transit'].includes(mode)} />
                            <label htmlFor={mode} className="text-sm">{mode}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Label className="mb-2 block">Favorite Adventure Themes</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {['Historical', 'Culinary', 'Art & Culture', 'Nature', 'Architecture', 'Hidden Gems', 'Photography', 'Shopping'].map((theme) => (
                          <div key={theme} className="flex items-center space-x-2">
                            <input type="checkbox" id={theme} className="rounded text-primary" defaultChecked={['Historical', 'Art & Culture', 'Hidden Gems'].includes(theme)} />
                            <label htmlFor={theme} className="text-sm">{theme}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Label htmlFor="max-distance" className="mb-2 block">Default Maximum Distance (miles)</Label>
                      <Input id="max-distance" type="number" defaultValue="5" min="1" max="20" className="max-w-xs" />
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Label htmlFor="default-duration" className="mb-2 block">Default Adventure Duration (hours)</Label>
                      <Input id="default-duration" type="number" defaultValue="3" min="1" max="8" step="0.5" className="max-w-xs" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Manage your data and privacy preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Location Tracking</p>
                        <p className="text-sm text-muted-foreground">Allow the app to track your location during adventures</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Share Passport Publicly</p>
                        <p className="text-sm text-muted-foreground">Allow others to view your adventure passport</p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Personal Data Usage</p>
                        <p className="text-sm text-muted-foreground">Use your adventure history to improve recommendations</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Analytics</p>
                        <p className="text-sm text-muted-foreground">Allow anonymous usage data collection to improve the service</p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="destructive">Delete Account</Button>
                  <Button>Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}