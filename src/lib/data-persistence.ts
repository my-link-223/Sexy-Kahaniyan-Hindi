// This is a simple in-memory data store for the application.
// In a real-world application, you would use a database like Firestore or Supabase.
import * as fs from 'fs/promises';
import * as path from 'path';
import type { Story, Category } from './data';

const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');

function toTS(stories: Story[], categories: Category[]): string {
    const storiesString = JSON.stringify(stories, null, 2);
    const categoriesString = JSON.stringify(categories, null, 2);

    return `
export type Story = {
  id: number;
  slug: string;
  title: string;
  author: string;
  date: string;
  readingTime: string;
  tags: string[];
  category: string;
  image: string;
  aiHint: string;
  content: string;
  trending: boolean;
};

export type Category = {
  id: number;
  slug: string;
  title: string;
  image: string;
  aiHint: string;
};


export let stories: Story[] = ${storiesString};

export let categories: Category[] = ${categoriesString};
`;
}


export async function readData(): Promise<{ stories: Story[], categories: Category[] }> {
    // Since Next.js caches modules, we need to dynamically import to get the fresh data.
    // A simple trick is to add a cache-busting query param.
    const { stories, categories } = await import(`./data.ts?${Date.now()}`);
    return { stories, categories };
}

export async function writeData(stories: Story[], categories: Category[]): Promise<void> {
    try {
        const tsContent = toTS(stories, categories);
        await fs.writeFile(dataFilePath, tsContent, 'utf-8');
        console.log("Data written to file successfully.");
    } catch (error) {
        console.error("Failed to write data to file:", error);
        throw error;
    }
}