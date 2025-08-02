import { stories } from '@/lib/data';
import { StoryCard } from '@/components/story-card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Suspense } from 'react';
import { getTransliteratedQuery } from './actions';
import { AdBanner } from '@/components/ad-banner';

async function SearchResults({ query }: { query: string }) {
  const decodedQuery = decodeURIComponent(query || '');

  let searchTerms = [decodedQuery];

  if (decodedQuery) {
    try {
      const transliterationResult = await getTransliteratedQuery({ query: decodedQuery });
      if (transliterationResult && transliterationResult.hindiQueries) {
        searchTerms = [...new Set([...searchTerms, ...transliterationResult.hindiQueries])];
      }
    } catch(e) {
      console.error("Could not get transliterated query", e)
    }
  }
  
  const lowerCaseSearchTerms = searchTerms.map(t => t.toLowerCase()).filter(Boolean);

  const results = lowerCaseSearchTerms.length > 0 ? stories.filter(story => {
    const storyTitleLower = story.title.toLowerCase();
    const storyContentLower = story.content.toLowerCase();
    const storyTagsLower = story.tags.map(t => t.toLowerCase());

    return lowerCaseSearchTerms.some(term => 
        storyTitleLower.includes(term) ||
        storyContentLower.includes(term) ||
        storyTagsLower.some(tag => tag.includes(term))
    )
  }) : [];
  
  const uniqueResults = results.filter((story, index, self) =>
    index === self.findIndex((s) => (
      s.id === story.id
    ))
  )

  return (
    <>
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Search Results
        </h1>
        {decodedQuery && (
            <p className="text-muted-foreground mt-2">
                Found {uniqueResults.length} stories for &quot;{decodedQuery}&quot;
            </p>
        )}
      </header>

      {uniqueResults.length > 0 ? (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {uniqueResults.map((story) => (
                <StoryCard key={story.id} story={story} />
            ))}
            </div>
            <AdBanner />
        </>
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
            <Suspense fallback={<div className="text-center">Loading...</div>}>
                <SearchResults query={searchParams.q} />
            </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
