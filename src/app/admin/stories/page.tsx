import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { StoryClient } from './_components/story-client';
import { stories } from '@/lib/data';

export default function ManageStoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="container mx-auto p-4 md:p-8">
          <StoryClient initialData={stories} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
