"use server";

import {
  transliterateSearchQuery,
  type TransliterateSearchQueryInput,
  type TransliterateSearchQueryOutput
} from "@/ai/flows/transliterate-search-query";

export async function getTransliteratedQuery(
  input: TransliterateSearchQueryInput
): Promise<TransliterateSearchQueryOutput> {
  const result = await transliterateSearchQuery(input);
  return result;
}
