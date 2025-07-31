import { NextResponse } from 'next/server';
import { stories } from '@/lib/data';
import { z } from 'zod';

const storySchema = z.object({
  id: z.number().optional(),
  slug: z.string(),
  title: z.string(),
  author: z.string(),
  date: z.string(),
  readingTime: z.string(),
  tags: z.array(z.string()),
  category: z.string(),
  image: z.string().url(),
  aiHint: z.string(),
  content: z.string(),
  trending: z.boolean(),
});

export async function GET() {
  return NextResponse.json(stories);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const newStoryData = storySchema.parse(json);

    const newStory = {
      ...newStoryData,
      id: stories.length > 0 ? Math.max(...stories.map(s => s.id)) + 1 : 1,
    };

    stories.push(newStory);

    return NextResponse.json(newStory, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
