"use server";

import {
  suggestStoryIdeas,
  type SuggestStoryIdeasInput,
  type SuggestStoryIdeasOutput
} from "@/ai/flows/suggest-story-ideas";
import { z } from "zod";

const SuggestStoryIdeasInputSchema = z.object({
  trendingTopics: z.string(),
  userInterests: z.string(),
  numberOfSuggestions: z.number().min(1).max(5),
});

export async function getStorySuggestions(
  input: SuggestStoryIdeasInput
): Promise<SuggestStoryIdeasOutput> {
  const validatedInput = SuggestStoryIdeasInputSchema.parse(input);
  const result = await suggestStoryIdeas(validatedInput);
  return result;
}
