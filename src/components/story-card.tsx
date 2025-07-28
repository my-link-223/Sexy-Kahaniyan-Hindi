import Image from 'next/image';
import Link from 'next/link';
import type { Story } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, UserCircle } from 'lucide-react';

type StoryCardProps = {
  story: Story;
};

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/stories/${story.slug}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
        <CardContent className="p-0">
          <Image
            src={story.image}
            alt={story.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={story.aiHint}
          />
        </CardContent>
        <CardHeader>
          <CardTitle className="font-headline text-xl leading-tight">
            {story.title}
          </CardTitle>
          <div className="flex items-center text-xs text-muted-foreground pt-2 gap-4">
             <div className="flex items-center gap-1.5">
                <UserCircle className="h-3.5 w-3.5" />
                <span>{story.author}</span>
             </div>
             <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{story.date}</span>
             </div>
          </div>
        </CardHeader>
        <CardFooter className="flex-grow flex items-end">
            <div className="flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
                ))}
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
