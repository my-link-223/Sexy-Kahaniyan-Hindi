import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data-persistence';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs/promises';
import * as path from 'path';

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

const categorySchema = z.object({
  id: z.number().optional(),
  slug: z.string(),
  title: z.string(),
  image: z.string().optional(),
  imageDataUri: z.string().optional(),
  aiHint: z.string().optional(),
});

export async function GET() {
  const { categories } = await readData();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  try {
    const { stories, categories } = await readData();
    const json = await request.json();
    const newCategoryData = categorySchema.parse(json);

    let imageUrl = newCategoryData.image;
    if(newCategoryData.imageDataUri) {
        try {
            imageUrl = await uploadImageFromDataUri(newCategoryData.imageDataUri);
        } catch(e) {
            console.error("Image upload failed", e);
            return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
        }
    }

    if (!imageUrl) {
        return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    const newCategory = {
      id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
      slug: newCategoryData.slug,
      title: newCategoryData.title,
      image: imageUrl,
      aiHint: newCategoryData.aiHint || '',
    };

    const updatedCategories = [...categories, newCategory];
    await writeData(stories, updatedCategories);

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Error in POST /api/categories", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
