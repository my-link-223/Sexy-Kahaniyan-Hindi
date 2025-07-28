"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getStorySuggestions } from "../actions";
import type { SuggestStoryIdeasOutput } from "@/ai/flows/suggest-story-ideas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  trendingTopics: z.string().min(3, "Please enter at least one trending topic."),
  userInterests: z.string().min(3, "Please enter at least one user interest."),
  numberOfSuggestions: z.coerce.number().min(1).max(5).default(3),
});

type FormValues = z.infer<typeof formSchema>;

export function StoryIdeasClient() {
  const [suggestions, setSuggestions] = useState<SuggestStoryIdeasOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trendingTopics: "Secret romance, Forbidden love",
      userInterests: "Office affairs, College stories",
      numberOfSuggestions: 3,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await getStorySuggestions(values);
      setSuggestions(result);
    } catch (error) {
      console.error("Error getting story suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Idea Generator</CardTitle>
          <CardDescription>Fill in the details below to generate story ideas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="trendingTopics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trending Topics</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., love triangle, hidden identity" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userInterests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Interests</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., desi stories, fantasy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="numberOfSuggestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Suggestions (1-5)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Ideas
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="mt-2 text-muted-foreground">Generating brilliant ideas...</p>
        </div>
      )}

      {suggestions && suggestions.suggestions.length > 0 && (
        <div className="space-y-6">
            <h2 className="text-2xl font-headline font-bold text-center">Generated Ideas</h2>
          {suggestions.suggestions.map((idea, index) => (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-accent">{idea.title}</CardTitle>
                <CardDescription>{idea.metaDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <Label className="font-bold">Keywords</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                    {idea.keywords.split(',').map(keyword => (
                        <Badge key={keyword.trim()} variant="outline">{keyword.trim()}</Badge>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
