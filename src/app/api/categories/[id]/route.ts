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
    slug: z.string(),
    title: z.string(),
    image: z.string().optional(),
    imageDataUri: z.string().optional(),
    aiHint: z.string().optional(),
  });

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { categories } = await readData();
    const id = parseInt(params.id, 10);
    const category = categories.find((c) => c.id === id);

    if (category) {
        return NextResponse.json(category);
    }
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { stories, categories } = await readData();
    const id = parseInt(params.id, 10);
    const categoryIndex = categories.findIndex((c) => c.id === id);

    if (categoryIndex === -1) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    try {
        const json = await request.json();
        const updatedCategoryData = categorySchema.parse(json);

        let imageUrl = updatedCategoryData.image;
        if (updatedCategoryData.imageDataUri) {
            try {
                imageUrl = await uploadImageFromDataUri(updatedCategoryData.imageDataUri);
            } catch (e) {
                console.error("Image upload failed", e);
                return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
            }
        }

        if (!imageUrl) {
            return NextResponse.json({ error: 'Image is required' }, { status: 400 });
        }


        const updatedCategory = {
            id,
            slug: updatedCategoryData.slug,
            title: updatedCategoryData.title,
            image: imageUrl,
            aiHint: updatedCategoryData.aiHint || '',
        };

        const updatedCategories = [...categories];
        updatedCategories[categoryIndex] = updatedCategory;
        
        await writeData(stories, updatedCategories);
        
        return NextResponse.json(updatedCategory);

    } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json({ error: error.issues }, { status: 400 });
        }
        console.error("Error in PUT /api/categories/[id]", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { stories, categories } = await readData();
    const id = parseInt(params.id, 10);
    const categoryIndex = categories.findIndex((c) => c.id === id);

    if (categoryIndex === -1) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const deletedCategory = categories.splice(categoryIndex, 1);
    await writeData(stories, categories);

    return NextResponse.json(deletedCategory[0]);
}
