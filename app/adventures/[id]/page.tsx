'use client';

import { useState, useEffect } from 'react';
import AdventureDetail from '@/components/adventures/AdventureDetail';
import { getAdventures } from '@/lib/storage';
import { notFound } from 'next/navigation';
import { Adventure } from '@/types/adventure';

export default function AdventurePage({ params }: { params: { id: string } }) {
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(`Loading adventure with id: ${params.id}`);
    
    // Validate the ID parameter
    if (!params.id) {
      console.log('No adventure ID provided');
      setError(true);
      setLoading(false);
      return;
    }

    // Get adventures from local storage
    const storedAdventures = getAdventures();
    const foundAdventure = storedAdventures.find(adv => adv.id === params.id);
    
    if (!foundAdventure) {
      console.log(`Adventure ${params.id} not found in local storage`);
      setError(true);
      setLoading(false);
      return;
    }

    console.log(`Found adventure: ${foundAdventure.title}`);
    setAdventure(foundAdventure);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <div className="container py-8">Loading adventure...</div>;
  }

  if (error || !adventure) {
    return notFound();
  }

  return (
    <div className="container py-8">
      <AdventureDetail adventure={adventure} />
    </div>
  );
}