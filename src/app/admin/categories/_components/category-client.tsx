"use client"

import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryDataTable } from "./category-data-table";
import { categoryColumns } from "./category-columns";
import { Category } from "@/lib/data";

interface CategoryClientProps {
    initialData: Category[];
}

export function CategoryClient({ initialData }: CategoryClientProps) {
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-headline text-primary">Categories</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage all the categories in your app ({initialData.length} categories).
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/categories/add">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Category
                    </Link>
                </Button>
            </div>
            <CategoryDataTable columns={categoryColumns} data={initialData} />
        </>
    )
}
