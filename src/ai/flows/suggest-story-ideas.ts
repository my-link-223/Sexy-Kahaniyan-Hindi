'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting story ideas based on trending topics and user interests.
 *
 * - suggestStoryIdeas - A function that generates story titles and meta descriptions.
 * - SuggestStoryIdeasInput - The input type for the suggestStoryIdeas function.
 * - SuggestStoryIdeasOutput - The return type for the suggestStoryIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestStoryIdeasInputSchema = z.object({
  trendingTopics: z
    .string()
    .describe('A comma-separated list of trending topics.'),
  userInterests: z
    .string()
    .describe('A comma-separated list of user interests.'),
  numberOfSuggestions: z
    .number()
    .default(3)
    .describe('The number of story ideas to generate.'),
  language: z.string().default('English').describe('The language for the generated story ideas (e.g., Hindi, English, Gujarati).'),
});
export type SuggestStoryIdeasInput = z.infer<typeof SuggestStoryIdeasInputSchema>;

const SuggestStoryIdeasOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      title: z.string().describe('The suggested story title.'),
      metaDescription: z.string().describe('The suggested meta description.'),
      keywords: z.string().describe('Suggested SEO keywords'),
    })
  ),
});
export type SuggestStoryIdeasOutput = z.infer<typeof SuggestStoryIdeasOutputSchema>;

export async function suggestStoryIdeas(input: SuggestStoryIdeasInput): Promise<SuggestStoryIdeasOutput> {
  return suggestStoryIdeasFlow(input);
}

const suggestStoryIdeasPrompt = ai.definePrompt({
  name: 'suggestStoryIdeasPrompt',
  input: {schema: SuggestStoryIdeasInputSchema},
  output: {schema: SuggestStoryIdeasOutputSchema},
  prompt: `You are a creative story idea generator for a mature audience (18+).  Based on the trending topics and user interests provided, generate {{numberOfSuggestions}} story ideas in the {{language}} language. Each idea must have a title, meta description, and SEO keywords. The story ideas should be sensual, romantic, and designed to engage readers.

Trending Topics: {{{trendingTopics}}}
User Interests: {{{userInterests}}}

Format your response as a JSON array of objects with 'title', 'metaDescription', and 'keywords' fields. The entire response, including keys and values, must be in the specified {{language}}.
`,
});

const suggestStoryIdeasFlow = ai.defineFlow(
  {
    name: 'suggestStoryIdeasFlow',
    inputSchema: SuggestStoryIdeasInputSchema,
    outputSchema: SuggestStoryIdeasOutputSchema,
  },
  async input => {
    const {output} = await suggestStoryIdeasPrompt(input);
    return output!;
  }
);
