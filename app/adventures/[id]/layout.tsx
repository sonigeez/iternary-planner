import { getAdventures } from '@/lib/storage';

export function generateStaticParams() {
  console.log('Generating static params for adventures');
  
  try {
    const storedAdventures = getAdventures();
    
    // Filter out any invalid IDs and ensure they're strings
    const uniqueAdventures = Array.from(
      new Set(storedAdventures.map(adv => adv.id))
    ).filter(Boolean)
     .map(id => ({ id: id.toString() }));
    
    console.log(`Generated ${uniqueAdventures.length} static params`);
    return uniqueAdventures;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default function AdventureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 