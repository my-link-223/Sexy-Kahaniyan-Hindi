
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
import { useState } from "react"

const DeleteAction = ({ categoryId, onDeleted }: { categoryId: number, onDeleted: () => void }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const onDelete = async () => {
        try {
            const response = await fetch(`/api/categories/${categoryId}`, {
                method: 'DELETE',
            });
            if (response.status !== 200 && response.status !== 204) {
                 const errorData = await response.json().catch(() => ({ error: "Failed to delete category with no specific error message." }));
                throw new Error(errorData.error || "Failed to delete category");
            }
            toast({ title: "Category deleted successfully" });
            onDeleted();
            router.refresh();
        } catch (error) {
            toast({
                title: "Error deleting category",
                description: (error as Error).message,
                variant: "destructive",
            });
        } finally {
            setIsOpen(false);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <div 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(true);
                    }}
                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent text-destructive"
                >
                    Delete
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the category from your data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={(e) => { e.stopPropagation(); onDelete(); }} className="bg-destructive hover:bg-destructive/90">Continue</AlertDialogAction>
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
        cell: ({ row, table }) => {
            const category = row.original;
            const router = useRouter();
            
            const handleDeleted = () => {
                const data = table.options.data;
                const newData = data.filter(d => d.id !== category.id);
                // This is a way to trigger a re-render in the table
                table.options.meta?.setData(newData);
                router.refresh();
            }

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
                         <DeleteAction categoryId={category.id} onDeleted={handleDeleted} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
