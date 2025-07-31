"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Category } from "@/lib/data"
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
import Image from "next/image"

const DeleteAction = ({ categoryId }: { categoryId: number }) => {
    const { toast } = useToast();
    const router = useRouter();

    const onDelete = async () => {
        try {
            const response = await fetch(`/api/categories/${categoryId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Failed to delete category");
            }
            toast({ title: "Category deleted successfully" });
            router.refresh();
            // A full page reload might be better to reflect changes immediately
            window.location.reload();
        } catch (error) {
            toast({
                title: "Error deleting category",
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
                        This action cannot be undone. This will permanently delete the category from your data.
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


export const categoryColumns: ColumnDef<Category>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
            <Image 
                src={row.original.image}
                alt={row.original.title}
                width={50}
                height={50}
                className="rounded-md object-cover"
            />
        )
    },
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
        accessorKey: "slug",
        header: "Slug",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const category = row.original
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
                            <Link href={`/category/${category.slug}`} target="_blank">View Category</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/categories/edit/${category.id}`}>Edit Category</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DeleteAction categoryId={category.id} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
