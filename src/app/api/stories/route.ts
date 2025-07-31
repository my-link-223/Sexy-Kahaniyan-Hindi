import { NextResponse } from 'next/server';
import { stories } from '@/lib/data';

export async function GET() {
  return NextResponse.json(stories);
}
