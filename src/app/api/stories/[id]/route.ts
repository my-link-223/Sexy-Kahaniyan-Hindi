import { NextResponse } from 'next/server';
import { stories } from '@/lib/data';
import { z } from 'zod';

const storySchema = z.object({
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

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id, 10);
    const story = stories.find((s) => s.id === id);

    if (story) {
        return NextResponse.json(story);
    }
    return NextResponse.json({ error: 'Story not found' }, { status: 404 });
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id, 10);
    const storyIndex = stories.findIndex((s) => s.id === id);

    if (storyIndex === -1) {
        return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    try {
        const json = await request.json();
        const updatedStoryData = storySchema.parse(json);

        const updatedStory = {
            id,
            ...updatedStoryData,
        };

        stories[storyIndex] = updatedStory;

        return NextResponse.json(updatedStory);

    } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id, 10);
    const storyIndex = stories.findIndex((s) => s.id === id);

    if (storyIndex === -1) {
        return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    const deletedStory = stories.splice(storyIndex, 1);

    return NextResponse.json(deletedStory[0]);
}
