import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { StoryForm } from '../_components/story-form';
import { categories } from '@/lib/data';

export default function AddStoryPage() {
  const categoryOptions = categories.map(c => ({ value: c.title, label: c.title }));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="container mx-auto p-4 md:p-8">
          <header className="mb-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold font-headline text-primary text-center">Add New Story</h1>
            <p className="text-muted-foreground mt-1 text-center">
              Fill in the details below to add a new story to your collection.
            </p>
          </header>
          <StoryForm 
            categoryOptions={categoryOptions}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
