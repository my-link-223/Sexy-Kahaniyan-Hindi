import { stories } from '@/lib/data';
import { StoryCard } from '@/components/story-card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function AllStoriesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container">
          <header className="mb-8 md:mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
              All Stories
            </h1>
            <p className="text-muted-foreground mt-2">
              Browse our entire collection of stories.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
