import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { StoryForm } from '../../_components/story-form';
import { stories, categories } from '@/lib/data';
import { notFound } from 'next/navigation';

type EditStoryPageProps = {
  params: {
    slug: string;
  };
};

export default function EditStoryPage({ params }: EditStoryPageProps) {
  const { slug } = params;
  const story = stories.find((s) => s.slug === slug);
  const categoryOptions = categories.map(c => ({ value: c.title, label: c.title }));

  if (!story) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-muted/40">
        <div className="container mx-auto p-4 md:p-8">
          <header className="mb-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold font-headline text-primary text-center">Edit Story</h1>
            <p className="text-muted-foreground mt-1 text-center">
              Update the details for &quot;{story.title}&quot;.
            </p>
          </header>
          <StoryForm 
            initialData={story}
            categoryOptions={categoryOptions}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
