import { StoryblokHero, StoryblokStory } from "@/types";



export type CountryPageHero = {
   // Allow any other fields
  hero: StoryblokHero[]; // Hero is an array in Storyblok Bloks field
  capital: string;
  population: string | number;
  currency: string;
  language: string;
}
export interface CountryPageStoryContent {
  _uid: string;
  component: string;
  // Hero can be either a single object or an array (Storyblok Bloks field)
  hero: [CountryPageHero];
}

export type CountryPageStory = StoryblokStory<CountryPageStoryContent>;

export interface CountryPageFeatureProps {
  story: CountryPageStory;
}
