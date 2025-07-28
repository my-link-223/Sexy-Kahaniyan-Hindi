"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { Story } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StoryCard } from "@/components/story-card";
import { FontSizeAdjuster } from "./font-size-adjuster";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Bookmark, Calendar, Heart, MessageCircle, UserCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type StoryPageClientProps = {
  story: Story;
  relatedStories: Story[];
};

export function StoryPageClient({ story, relatedStories }: StoryPageClientProps) {
  const [fontSize, setFontSize] = useState("text-lg");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(story.id));
  }, [story.id]);

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = bookmarks.filter((id: number) => id !== story.id);
      toast({ title: "Bookmark removed", description: `"${story.title}" removed from your bookmarks.` });
    } else {
      newBookmarks = [...bookmarks, story.id];
      toast({ title: "Bookmarked!", description: `"${story.title}" added to your bookmarks.` });
    }
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };
  
  // A simple markdown-to-html converter for paragraphs
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-6 leading-relaxed">
        {paragraph}
      </p>
    ));
  };


  return (
    <main className="flex-1 py-12 md:py-16">
      <div className="container max-w-4xl mx-auto">
        <article>
          <header className="mb-8 text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {story.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">
              {story.title}
            </h1>
            <div className="flex justify-center items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center gap-1.5"><UserCircle className="h-4 w-4" /><span>{story.author}</span></div>
                <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /><span>{story.date}</span></div>
            </div>
          </header>
          
          <div className="flex justify-end mb-4">
            <FontSizeAdjuster setFontSize={setFontSize} />
          </div>

          <div className={cn("font-body", fontSize)}>
             {formatContent(story.content)}
          </div>

          <div className="my-8 h-px bg-border"></div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 md:gap-4">
              <Button variant="ghost" size="icon"><Heart className="h-5 w-5" /> <span className="sr-only">Like</span></Button>
              <Button variant="ghost" size="icon"><MessageCircle className="h-5 w-5" /> <span className="sr-only">Comment</span></Button>
              <Button variant="ghost" size="icon" onClick={handleBookmark}>
                <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current text-accent")} />
                <span className="sr-only">Bookmark</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                    <Link href="#"><ArrowLeft className="mr-1 h-4 w-4"/> Prev</Link>
                </Button>
                 <Button variant="outline" size="sm" asChild>
                    <Link href="#">Next <ArrowRight className="ml-1 h-4 w-4"/></Link>
                </Button>
            </div>
          </div>
        </article>

        <section className="mt-16 pt-12 border-t">
          <h2 className="text-3xl font-headline font-bold text-center mb-10">
            Related Stories You May Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedStories.map((relatedStory) => (
              <StoryCard key={relatedStory.id} story={relatedStory} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
