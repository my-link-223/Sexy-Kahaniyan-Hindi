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
  id: z.number().optional(),
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

export async function GET() {
  const { stories } = await readData();
  return NextResponse.json(stories);
}

export async function POST(request: Request) {
  try {
    const { stories, categories } = await readData();
    const json = await request.json();
    const newStoryData = storySchema.parse(json);

    let imageUrl = newStoryData.image;
    if(newStoryData.imageDataUri) {
        try {
            imageUrl = await uploadImageFromDataUri(newStoryData.imageDataUri);
        } catch(e) {
            console.error("Image upload failed", e);
            return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
        }
    }

    if (!imageUrl) {
        return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    const newStory = {
      id: stories.length > 0 ? Math.max(...stories.map(s => s.id)) + 1 : 1,
      slug: newStoryData.slug,
      title: newStoryData.title,
      author: newStoryData.author,
      date: newStoryData.date,
      readingTime: newStoryData.readingTime,
      tags: newStoryData.tags,
      category: newStoryData.category,
      image: imageUrl,
      aiHint: newStoryData.aiHint || '',
      content: newStoryData.content,
      trending: newStoryData.trending,
    };

    const updatedStories = [...stories, newStory];
    await writeData(updatedStories, categories);

    return NextResponse.json(newStory, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Error in POST /api/stories", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
