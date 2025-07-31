import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container">
          <header className="mb-8 md:mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
              All Categories
            </h1>
            <p className="text-muted-foreground mt-2">
              Explore stories from all our categories.
            </p>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.id}>
                <Card className="group overflow-hidden relative text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                  <CardContent className="p-0">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={300}
                      height={400}
                      className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      data-ai-hint={category.aiHint}
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center p-2">
                      <h3 className="font-headline text-xl font-bold text-white">
                        {category.title}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
