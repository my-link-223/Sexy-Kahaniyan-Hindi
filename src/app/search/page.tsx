import { stories } from '@/lib/data';
import { StoryCard } from '@/components/story-card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Suspense } from 'react';

function SearchResults({ query }: { query: string }) {
  const decodedQuery = decodeURIComponent(query || '');

  const results = stories.filter(story =>
    story.title.toLowerCase().includes(decodedQuery.toLowerCase()) ||
    story.content.toLowerCase().includes(decodedQuery.toLowerCase()) ||
    story.tags.some(tag => tag.toLowerCase().includes(decodedQuery.toLowerCase()))
  );

  return (
    <>
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Search Results
        </h1>
        {decodedQuery && (
            <p className="text-muted-foreground mt-2">
                Found {results.length} stories for &quot;{decodedQuery}&quot;
            </p>
        )}
      </header>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {results.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No stories found matching your search. Try another keyword.
          </p>
        </div>
      )}
    </>
  );
}


export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container">
            <Suspense fallback={<div>Loading...</div>}>
                <SearchResults query={searchParams.q} />
            </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}