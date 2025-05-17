import { Adventure, Location } from '@/types/adventure';

const mockLocations: Location[] = [
  {
    id: 'loc1',
    name: 'Heritage Coffee House',
    description: 'A historic coffee shop in a renovated 1920s building with vintage décor and locally roasted beans.',
    imageUrl: 'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    address: '123 Main St',
    lat: 47.6062,
    lng: -122.3321,
    type: 'cafe'
  },
  {
    id: 'loc2',
    name: 'Urban Art Alley',
    description: 'A hidden alleyway featuring rotating street art murals by local artists.',
    imageUrl: 'https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    address: '456 Pine St',
    lat: 47.6152,
    lng: -122.3411,
    type: 'attraction'
  },
  {
    id: 'loc3',
    name: 'Waterfront Park',
    description: 'A scenic urban park with views of the bay and city skyline.',
    imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    address: '789 Harbor Dr',
    lat: 47.6102,
    lng: -122.3426,
    type: 'park'
  },
  {
    id: 'loc4',
    name: 'Historical Society Museum',
    description: 'A small museum showcasing the city\'s growth through artifacts and photographs.',
    imageUrl: 'https://images.pexels.com/photos/2372978/pexels-photo-2372978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    address: '101 History Lane',
    lat: 47.6092,
    lng: -122.3350,
    type: 'museum'
  },
  {
    id: 'loc5',
    name: 'Craft Bakery',
    description: 'A family-owned bakery specializing in artisanal bread and pastries using century-old recipes.',
    imageUrl: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    address: '222 Flour St',
    lat: 47.6142,
    lng: -122.3450,
    type: 'shop'
  },
  {
    id: 'loc6',
    name: 'Skyline Viewpoint',
    description: 'A hidden lookout point offering panoramic views of the city skyline.',
    imageUrl: 'https://images.pexels.com/photos/1434580/pexels-photo-1434580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    address: '333 Hilltop Rd',
    lat: 47.6202,
    lng: -122.3480,
    type: 'landmark'
  },
  {
    id: 'loc7',
    name: 'Fusion Taco Shop',
    description: 'A beloved local eatery combining traditional Mexican flavors with global cuisines.',
    imageUrl: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    address: '444 Spice Blvd',
    lat: 47.6172,
    lng: -122.3410,
    type: 'restaurant'
  },
  {
    id: 'loc8',
    name: 'Old Town Bookstore',
    description: 'A charming independent bookstore in a historic building with rare and used books.',
    imageUrl: 'https://images.pexels.com/photos/5400162/pexels-photo-5400162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    address: '555 Literary Lane',
    lat: 47.6082,
    lng: -122.3390,
    type: 'shop'
  }
];

export const mockAdventures: Adventure[] = [
  {
    id: 'adv1',
    title: 'Hidden Histories Walking Tour',
    description: 'Discover the forgotten stories and hidden historical landmarks of downtown as you stroll through winding streets and secret passageways.',
    imageUrl: 'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    theme: 'Historical',
    duration: 2.5,
    distance: 1.8,
    neighborhood: 'Downtown',
    city: 'Seattle',
    locations: [mockLocations[0], mockLocations[3], mockLocations[7]],
    narrative: 'Step back in time and uncover the hidden stories of Downtown Seattle. Begin at Heritage Coffee House, housed in a building that survived the Great Fire of 1889...',
    transportModes: ['walking'],
    difficulty: 'easy',
    createdAt: '2025-03-15T14:30:00Z'
  },
  {
    id: 'adv2',
    title: 'Urban Art & Culinary Experience',
    description: 'Explore vibrant street art while sampling diverse local cuisine in this cultural feast for the senses.',
    imageUrl: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    theme: 'Art & Culture',
    duration: 3,
    distance: 2.2,
    neighborhood: 'Capitol Hill',
    city: 'Seattle',
    locations: [mockLocations[1], mockLocations[4], mockLocations[6]],
    narrative: 'Immerse yourself in the creative energy of Capitol Hill, where art and cuisine collide. Begin at Urban Art Alley where local artists...',
    transportModes: ['walking', 'public'],
    difficulty: 'moderate',
    createdAt: '2025-03-18T10:15:00Z'
  },
  {
    id: 'adv3',
    title: 'Waterfront Wonders',
    description: 'Experience the natural beauty and urban development along the city\'s scenic waterfront in this relaxing journey.',
    imageUrl: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    theme: 'Nature',
    duration: 2,
    distance: 1.5,
    neighborhood: 'Waterfront',
    city: 'Seattle',
    locations: [mockLocations[2], mockLocations[5]],
    narrative: 'Discover the evolving relationship between Seattle and its waterfront. Begin at Waterfront Park where you can observe how...',
    transportModes: ['walking'],
    difficulty: 'easy',
    createdAt: '2025-03-20T12:45:00Z'
  },
  {
    id: 'adv4',
    title: 'Architectural Time Travel',
    description: 'Journey through different architectural eras, from Victorian treasures to modern masterpieces, in this design-focused adventure.',
    imageUrl: 'https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    theme: 'Architecture',
    duration: 4,
    distance: 3.5,
    neighborhood: 'Pioneer Square',
    city: 'Seattle',
    locations: [mockLocations[3], mockLocations[7], mockLocations[0], mockLocations[5]],
    narrative: 'Experience the evolution of Seattle through its buildings. Begin at the Historical Society Museum where you\'ll learn about...',
    transportModes: ['walking', 'public'],
    difficulty: 'moderate',
    createdAt: '2025-03-22T09:30:00Z'
  },
  {
    id: 'adv5',
    title: 'Local Flavors Food Tour',
    description: 'Savor the diverse culinary landscape of the city through its most beloved local eateries and hidden food gems.',
    imageUrl: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    theme: 'Culinary',
    duration: 3.5,
    distance: 2.0,
    neighborhood: 'Ballard',
    city: 'Seattle',
    locations: [mockLocations[4], mockLocations[6], mockLocations[0]],
    narrative: 'Embark on a culinary journey through Seattle\'s diverse food scene. Start at Craft Bakery where the aromas of freshly baked bread...',
    transportModes: ['walking', 'driving'],
    difficulty: 'easy',
    createdAt: '2025-03-25T11:20:00Z'
  },
  {
    id: 'adv6',
    title: 'Secret Gardens & Green Spaces',
    description: 'Discover peaceful urban oases and hidden green gems tucked away amidst the bustling cityscape.',
    imageUrl: 'https://images.pexels.com/photos/76969/cold-front-warm-front-hurricane-felix-76969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    theme: 'Nature',
    duration: 2.5,
    distance: 2.2,
    neighborhood: 'Queen Anne',
    city: 'Seattle',
    locations: [mockLocations[2], mockLocations[5], mockLocations[4]],
    narrative: 'Escape the urban environment without leaving the city. Begin at Waterfront Park where the interplay of nature and city...',
    transportModes: ['walking', 'public'],
    difficulty: 'moderate',
    createdAt: '2025-03-28T15:10:00Z'
  }
];