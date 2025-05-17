import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 z-0" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Discover the extraordinary in your everyday spaces
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Transform your neighborhood into a new adventure with personalized, 
            narrative-driven exploration experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href="/create">
                Start Your Adventure <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/adventures">Explore Examples</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}