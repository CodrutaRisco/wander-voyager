import { getStoryblokApi } from "@/lib/storyblok";
import type { HomePageStory } from "./types";

export async function getHomePageStory(): Promise<HomePageStory> {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.get("cdn/stories/homepage", {
    version: "draft",
  });

  if (!data?.story) {
    throw new Error("Unable to fetch homepage story from Storyblok");
  }

  return data.story as HomePageStory;
}


