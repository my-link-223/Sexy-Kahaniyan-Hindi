import Link from 'next/link';
import { BookHeart, Menu, Search } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { SearchInput } from './search-input';
import { Suspense } from 'react';

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/stories", label: "All Stories" },
    { href: "/categories", label: "Categories" },
    { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookHeart className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">Sexy Kahaniyan Hindi</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
                 <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                 </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Suspense fallback={null}>
            <SearchInput />
          </Suspense>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <Link href="/" className="mr-6 flex items-center space-x-2 p-4">
                    <BookHeart className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-lg">Sexy Kahaniyan Hindi</span>
                </Link>
              <div className="p-4">
                <nav className="flex flex-col space-y-4">
                {navLinks.map(link => (
                  <SheetClose asChild key={link.href}>
                    <Link href={link.href} className="text-lg transition-colors hover:text-primary">
                        {link.label}
                    </Link>
                  </SheetClose>
                ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
