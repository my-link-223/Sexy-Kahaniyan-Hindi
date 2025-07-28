import { stories } from '@/lib/data';
import { notFound } from 'next/navigation';
import { StoryPageClient } from './_components/story-page-client';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

type StoryPageProps = {
  params: {
    slug: string;
  };
};

// This function can be uncommented if you want to statically generate story pages at build time.
// export async function generateStaticParams() {
//   return stories.map((story) => ({
//     slug: story.slug,
//   }));
// }

export default function StoryPage({ params }: StoryPageProps) {
  const { slug } = params;
  const story = stories.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  const relatedStories = stories
    .filter((s) => s.category === story.category && s.id !== story.id)
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <StoryPageClient story={story} relatedStories={relatedStories} />
      <Footer />
    </div>
  );
}
