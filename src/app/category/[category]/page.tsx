import { stories, categories } from '@/lib/data';
import { notFound } from 'next/navigation';
import { StoryCard } from '@/components/story-card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = decodeURIComponent(params.category);
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const storiesInCategory = stories.filter((s) => s.category === category.title);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container">
          <header className="mb-8 md:mb-12">
            <Button variant="outline" size="sm" asChild className="mb-4">
              <Link href="/#categories"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Categories</Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary text-center">
              {category.title}
            </h1>
            <p className="text-muted-foreground text-center mt-2">
              Showing {storiesInCategory.length} stories in this category.
            </p>
          </header>

          {storiesInCategory.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {storiesInCategory.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No stories found in this category yet. Please check back later!
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// This function can be uncommented if you want to statically generate category pages at build time.
// export async function generateStaticParams() {
//   return categories.map((category) => ({
//     category: category.slug,
//   }));
// }
