'use client';

import { Adventure } from '@/types/adventure';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin } from 'lucide-react';

interface AdventureCardProps {
  adventure: Adventure;
}

export default function AdventureCard({ adventure }: AdventureCardProps) {
  // Ensure we have a valid ID before creating the link
  const adventureLink = adventure?.id ? `/adventures/${adventure.id}` : '/adventures';

  return (
    <Link href={adventureLink}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{adventure.title}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {adventure.locations[0].name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{adventure.duration} hours</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {adventure.theme}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {adventure.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}