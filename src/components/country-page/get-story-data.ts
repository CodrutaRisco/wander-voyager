import { getStoryblokApi } from "@/lib/storyblok";
import type { CountryPageStory } from "./types";

export async function getCountryPageStory(
  slug: string
): Promise<CountryPageStory> {
  const storyblokApi = getStoryblokApi();

  // Storyblok: folder "all countries" → stories romania, jamaica, etc.
  const { data } = await storyblokApi.get(`cdn/stories/allcountries/${slug}`, {
    version: "draft",
  });

  if (!data?.story) {
    throw new Error(
      `Unable to fetch country page story from Storyblok for slug: ${slug}`
    );
  }

  return data.story as CountryPageStory;
}