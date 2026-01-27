import { getStoryblokApi } from "@/lib/storyblok";
import type { CountriesHubPageStory } from "./types";

export async function getCountriesHubPageStory(): Promise<CountriesHubPageStory> {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.get("cdn/stories/countries", {
    version: "draft",
  });

  if (!data?.story) {
    throw new Error("Unable to fetch countries hub page story from Storyblok");
  }

  return data.story as CountriesHubPageStory;
}