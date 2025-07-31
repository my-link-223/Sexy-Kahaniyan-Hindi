"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import type { Category } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and contain only letters, numbers, and hyphens."),
  image: z.string().optional(),
  imageDataUri: z.string().optional(),
  aiHint: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData?: Category;
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      image: "https://placehold.co/600x400.png",
      aiHint: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        form.setValue("imageDataUri", dataUri);
        setImagePreview(dataUri);
        form.setValue("image", ""); // Clear image URL if a file is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    form.setValue("image", url);
    if (url) {
        setImagePreview(url);
        form.setValue("imageDataUri", ""); // Clear image data URI if a URL is entered
    } else {
        setImagePreview(null);
    }
  }

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
        if (!values.image && !values.imageDataUri) {
            toast({
                title: "Image required",
                description: "Please provide an Image URL or upload an image.",
                variant: "destructive"
            });
            setIsLoading(false);
            return;
        }

      const url = initialData ? `/api/categories/${initialData.id}` : '/api/categories';
      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      toast({
        title: initialData ? "Category Updated!" : "Category Created!",
        description: `The category "${values.title}" has been saved successfully.`,
      });
      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        title: "An error occurred.",
        description: (error as Error).message || "Unable to save the category. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the category title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., my-awesome-category" {...field} />
                    </FormControl>
                    <FormDescription>This is the URL-friendly version of the title.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="aiHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Hint</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., woman portrait" {...field} />
                  </FormControl>
                  <FormDescription>A hint for AI image generation tools.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
                <FormLabel>Cover Image</FormLabel>
                <Tabs defaultValue="url" className="w-full mt-2">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="url">Image URL</TabsTrigger>
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                    </TabsList>
                    <TabsContent value="url">
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input placeholder="https://example.com/image.png" {...field} onChange={handleUrlChange} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </TabsContent>
                    <TabsContent value="upload">
                         <FormField
                            control={form.control}
                            name="imageDataUri"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </TabsContent>
                </Tabs>
                {imagePreview && (
                    <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Image Preview:</p>
                        <Image src={imagePreview} alt="Preview" width={200} height={150} className="rounded-md object-cover border" />
                    </div>
                )}
            </div>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {initialData ? 'Save Changes' : 'Create Category'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
