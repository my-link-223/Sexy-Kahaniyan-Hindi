import Link from "next/link";
import { BookHeart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/20">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <BookHeart className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">Sexy Kahaniyan Hindi</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4 md:mb-0">
            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
          <Link href="/admin/dashboard">
            <p>&copy; {new Date().getFullYear()} Sexy Kahaniyan Hindi. All rights reserved.</p>
          </Link>
          <p className="mt-2">This website contains adult material and is intended for individuals 18 years of age or older.</p>
        </div>
      </div>
    </footer>
  );
}
