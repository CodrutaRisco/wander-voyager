import { StoryblokHero, StoryblokStory } from "@/types";
import { TileAndRichTextBlock } from "../home-page/types";

export type CountryPageHero = {
  // Allow any other fields
  hero: StoryblokHero[]; // Hero is an array in Storyblok Bloks field
  capital: string;
  population: string | number;
  currency: string;
  language: string;
};
export interface CountryPageStoryContent {
  _uid: string;
  component: string;
  // Hero can be either a single object or an array (Storyblok Bloks field)
  hero: [CountryPageHero];
  // intro: [{ _uid: string; title?: string; richText: StoryblokRichtext; component?: string }];
  intro: [TileAndRichTextBlock];
  details: string;
  language?: string;
  /** Storyblok may return this with capital L */
  Language?: string;
  time: string;
  phone: string;
  domain: string;
}

export type CountryPageStory = StoryblokStory<CountryPageStoryContent>;

export interface CountryPageFeatureProps {
  story: CountryPageStory;
}
