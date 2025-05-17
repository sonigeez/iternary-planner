'use client';

import Link from 'next/link';
import { User, Menu, Map, Compass, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/theme/ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Compass className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Micro-Adventure</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/adventures" className="text-muted-foreground hover:text-foreground transition-colors">
            Discover
          </Link>
          <Link href="/create" className="text-muted-foreground hover:text-foreground transition-colors">
            Create
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 top-16 z-50 bg-background md:hidden transition-transform duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="container flex flex-col py-8 space-y-6">
          <Link 
            href="/adventures" 
            className="text-lg font-medium py-2 border-b"
            onClick={() => setIsMenuOpen(false)}
          >
            Discover
          </Link>
          <Link 
            href="/create" 
            className="text-lg font-medium py-2 border-b"
            onClick={() => setIsMenuOpen(false)}
          >
            Create
          </Link>
          <Link 
            href="/passport" 
            className="text-lg font-medium py-2 border-b"
            onClick={() => setIsMenuOpen(false)}
          >
            Passport
          </Link>
          <Link 
            href="/profile" 
            className="text-lg font-medium py-2 border-b"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
}