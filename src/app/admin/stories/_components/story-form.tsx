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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import type { Story } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  slug: z.string().min(5, "Slug must be at least 5 characters.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and contain only letters, numbers, and hyphens."),
  author: z.string().min(2, "Author name is required."),
  category: z.string({ required_error: "Please select a category." }),
  tags: z.string().min(1, "Please provide at least one tag."),
  image: z.string().optional(),
  imageDataUri: z.string().optional(),
  aiHint: z.string().optional(),
  content: z.string().min(100, "Story content must be at least 100 characters."),
  trending: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface StoryFormProps {
  initialData?: Story;
  categoryOptions: { value: string; label: string }[];
}

export function StoryForm({ initialData, categoryOptions }: StoryFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      tags: initialData.tags.join(', '),
      image: initialData.image || '',
    } : {
      title: "",
      slug: "",
      author: "",
      category: undefined,
      tags: "",
      image: "https://placehold.co/600x400.png",
      aiHint: "",
      content: "",
      trending: false,
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


      const payload = {
        ...values,
        tags: values.tags.split(',').map(tag => tag.trim()),
        date: initialData?.date || new Date().toISOString().split('T')[0],
        readingTime: `${Math.ceil(values.content.split(' ').length / 200)} min read`,
      };

      const url = initialData ? `/api/stories/${initialData.id}` : '/api/stories';
      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      toast({
        title: initialData ? "Story Updated!" : "Story Created!",
        description: `The story "${values.title}" has been saved successfully.`,
      });
      router.push("/admin/stories");
      router.refresh();
    } catch (error) {
      console.error("Error saving story:", error);
      toast({
        title: "An error occurred.",
        description: (error as Error).message || "Unable to save the story. Please try again.",
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
                      <Input placeholder="Enter the story title" {...field} />
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
                      <Input placeholder="e.g., my-awesome-story" {...field} />
                    </FormControl>
                    <FormDescription>This is the URL-friendly version of the title.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter author's name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categoryOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter comma-separated tags" {...field} />
                  </FormControl>
                  <FormDescription>Separate tags with a comma (e.g., #romance, #fantasy).</FormDescription>
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
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your story here..."
                      className="resize-y min-h-[250px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="trending"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Trending Story</FormLabel>
                    <FormDescription>
                      Mark this story as trending to feature it on the homepage.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {initialData ? 'Save Changes' : 'Create Story'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
