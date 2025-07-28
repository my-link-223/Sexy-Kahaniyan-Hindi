'use server';

/**
 * @fileOverview This file defines a Genkit flow for transliterating a search query.
 *
 * - transliterateSearchQuery - A function that converts an English/Hinglish query to Hindi.
 * - TransliterateSearchQueryInput - The input type for the function.
 * - TransliterateSearchQueryOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransliterateSearchQueryInputSchema = z.object({
  query: z.string().describe('The search query in English or Hinglish.'),
});
export type TransliterateSearchQueryInput = z.infer<typeof TransliterateSearchQueryInputSchema>;

const TransliterateSearchQueryOutputSchema = z.object({
  hindiQueries: z.array(z.string()).describe('A list of possible Hindi translations or transliterations.'),
});
export type TransliterateSearchQueryOutput = z.infer<typeof TransliterateSearchQueryOutputSchema>;

export async function transliterateSearchQuery(input: TransliterateSearchQueryInput): Promise<TransliterateSearchQueryOutput> {
  return transliterateSearchQueryFlow(input);
}

const transliteratePrompt = ai.definePrompt({
  name: 'transliteratePrompt',
  input: {schema: TransliterateSearchQueryInputSchema},
  output: {schema: TransliterateSearchQueryOutputSchema},
  prompt: `You are a transliteration expert for a Hindi stories website. Given the following search query, provide a list of possible Hindi translations or transliterations that can be used to search for stories. The query might be in English or Hinglish.

For example:
- If the query is 'pyar', you should return ['प्यार', 'प्रेम'].
- If the query is 'love', you should return ['प्यार', 'प्रेम', 'इश्क'].
- If the query is 'bhabhi', you should return ['भाभी'].

Return the result as a JSON object with a "hindiQueries" key which is an array of strings. Only return the JSON object.

Query: {{{query}}}
`,
});

const transliterateSearchQueryFlow = ai.defineFlow(
  {
    name: 'transliterateSearchQueryFlow',
    inputSchema: TransliterateSearchQueryInputSchema,
    outputSchema: TransliterateSearchQueryOutputSchema,
  },
  async input => {
    // If the query is already in Hindi, just return it.
    // A simple check to see if the query contains non-latin characters.
    if (/[^\u0000-\u007f]/.test(input.query)) {
        return { hindiQueries: [input.query] };
    }

    const {output} = await transliteratePrompt(input);
    return output || { hindiQueries: [] };
  }
);
