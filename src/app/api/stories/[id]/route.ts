import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data-persistence';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs/promises';
import * as path from 'path';

// This is a simplified mock for uploading a file. 
// In a real app, you would use a cloud storage service like Firebase Storage.
async function uploadImageFromDataUri(dataUri: string): Promise<string> {
    const publicDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(publicDir, { recursive: true });

    const matches = dataUri.match(/^data:(image\/(\w+));base64,(.+)$/);
    if (!matches) {
        throw new Error('Invalid data URI');
    }

    const fileExtension = matches[2];
    const base64Data = matches[3];
    const buffer = Buffer.from(base64Data, 'base64');
    const filename = `${uuidv4()}.${fileExtension}`;
    const filePath = path.join(publicDir, filename);

    await fs.writeFile(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;
    return fileUrl;
}

const storySchema = z.object({
    slug: z.string(),
    title: z.string(),
    author: z.string(),
    date: z.string(),
    readingTime: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    image: z.string().optional(),
    imageDataUri: z.string().optional(),
    aiHint: z.string().optional(),
    content: z.string(),
    trending: z.boolean(),
  });

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { stories } = await readData();
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
    const { stories, categories } = await readData();
    const id = parseInt(params.id, 10);
    const storyIndex = stories.findIndex((s) => s.id === id);

    if (storyIndex === -1) {
        return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    try {
        const json = await request.json();
        const updatedStoryData = storySchema.parse(json);

        let imageUrl = updatedStoryData.image;
        if (updatedStoryData.imageDataUri) {
            try {
                imageUrl = await uploadImageFromDataUri(updatedStoryData.imageDataUri);
            } catch (e) {
                console.error("Image upload failed", e);
                return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
            }
        }

        if (!imageUrl) {
            return NextResponse.json({ error: 'Image is required' }, { status: 400 });
        }

        const updatedStory = {
            id,
            slug: updatedStoryData.slug,
            title: updatedStoryData.title,
            author: updatedStoryData.author,
            date: updatedStoryData.date,
            readingTime: updatedStoryData.readingTime,
            tags: updatedStoryData.tags,
            category: updatedStoryData.category,
            image: imageUrl,
            aiHint: updatedStoryData.aiHint || '',
            content: updatedStoryData.content,
            trending: updatedStoryData.trending,
        };

        const updatedStories = [...stories];
        updatedStories[storyIndex] = updatedStory;
        
        await writeData(updatedStories, categories);

        return NextResponse.json(updatedStory);

    } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        console.error("Error in PUT /api/stories/[id]", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { stories, categories } = await readData();
    const id = parseInt(params.id, 10);
    const storyIndex = stories.findIndex((s) => s.id === id);

    if (storyIndex === -1) {
        return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    const deletedStory = stories.splice(storyIndex, 1);
    
    await writeData(stories, categories);

    return NextResponse.json(deletedStory[0]);
}
