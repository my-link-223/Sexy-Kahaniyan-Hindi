"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Story } from "@/lib/data"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"


const DeleteAction = ({ storyId }: { storyId: number }) => {
    const { toast } = useToast();
    const router = useRouter();

    const onDelete = async () => {
        try {
            const response = await fetch(`/api/stories/${storyId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete story");
            }
            toast({ title: "Story deleted successfully" });
            router.refresh();
            // A full page reload might be better to reflect changes immediately
            window.location.reload();
        } catch (error) {
            toast({
                title: "Error deleting story",
                description: (error as Error).message,
                variant: "destructive",
            });
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent">Delete</div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the story from your data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} className="bg-destructive hover:bg-destructive/90">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};


export const storyColumns: ColumnDef<Story>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <Badge variant="outline">{row.original.category}</Badge>
    },
    {
        accessorKey: "author",
        header: "Author",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "trending",
        header: "Trending",
        cell: ({ row }) => (row.original.trending ? "Yes" : "No"),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const story = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/stories/${story.slug}`} target="_blank">View Story</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/stories/edit/${story.slug}`}>Edit Story</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DeleteAction storyId={story.id} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
