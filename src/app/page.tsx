import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { categories, stories } from '@/lib/data';
import { StoryCard } from '@/components/story-card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {
  const trendingStories = stories.filter((story) => story.trending);
  const dailyUpdates = stories.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative text-center py-20 md:py-32 lg:py-40 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-background opacity-50"></div>
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Sensual background"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 w-full h-full object-cover -z-10 opacity-10"
            data-ai-hint="sensual abstract"
          />
          <div className="container relative z-10">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground animate-fade-in-down">
              Har Raat Ek Nayi Kahani
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
              Discover daily new tales of romance and fantasy.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full group bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#daily-updates">
                <Flame className="mr-2 h-5 w-5 group-hover:animate-pulse" /> Read Today’s Hot Story
              </Link>
            </Button>
          </div>
        </section>

        <section id="trending" className="py-16">
          <div className="container">
            <h2 className="text-3xl font-headline font-bold text-center mb-10">
              <Flame className="inline-block h-8 w-8 mr-2 text-primary" />
              Trending Stories
            </h2>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {trendingStories.map((story) => (
                  <CarouselItem key={story.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <StoryCard story={story} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>

        <section id="categories" className="py-16 bg-secondary/20">
          <div className="container">
            <h2 className="text-3xl font-headline font-bold text-center mb-10">
              Explore Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {categories.map((category) => (
                <Link href={`/category/${encodeURIComponent(category.title)}`} key={category.title}>
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
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center">
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
        </section>

        <section id="daily-updates" className="py-16">
          <div className="container">
            <h2 className="text-3xl font-headline font-bold text-center mb-10">
              Daily Updates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dailyUpdates.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link href="#">
                  View All Stories <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="subscribe" className="py-16 bg-gradient-to-t from-background to-secondary/20">
          <div className="container text-center max-w-2xl">
            <h2 className="text-3xl font-headline font-bold">
              Never Miss a Story
            </h2>
            <p className="text-muted-foreground mt-2 mb-6">
              Subscribe to get the latest sensual stories delivered to your inbox daily.
            </p>
            <form className="flex max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none focus:ring-accent"
              />
              <Button type="submit" className="rounded-l-none bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
