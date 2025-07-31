"use client"

import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoryDataTable } from "./story-data-table";
import { storyColumns } from "./story-columns";
import { Story } from "@/lib/data";

interface StoryClientProps {
    initialData: Story[];
}

export function StoryClient({ initialData }: StoryClientProps) {
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-headline text-primary">Stories</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage all the stories in your collection ({initialData.length} stories).
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/stories/add">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Story
                    </Link>
                </Button>
            </div>
            <StoryDataTable columns={storyColumns} data={initialData} />
        </>
    )
}
