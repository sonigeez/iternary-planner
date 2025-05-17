import HeroSection from '@/components/home/HeroSection';
import FeatureSection from '@/components/home/FeatureSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
      <TestimonialSection />
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Micro-Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Create your first adventure now and start collecting passport stamps in your city.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/create">
              Create Your Adventure <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}