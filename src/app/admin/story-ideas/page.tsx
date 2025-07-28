import { StoryIdeasClient } from './_components/story-ideas-client';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function StoryIdeasPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto p-4 md:p-8">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold font-headline text-primary">AI-Powered Content Ideas</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Generate new story titles, meta descriptions, and keywords based on trending topics and user interests. Perfect for populating your content calendar and boosting SEO.
            </p>
          </header>
          <StoryIdeasClient />
        </div>
      </main>
      <Footer />
    </div>
  );
}
