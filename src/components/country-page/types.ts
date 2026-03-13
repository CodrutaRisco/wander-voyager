import {
  StoryblokHero,
  StoryblokImageAndRichText,
  StoryblokStory,
} from "@/types";
import { TileAndRichTextBlock } from "../home-page/types";

export type CountryPageHero = {
  hero: [StoryblokHero];
  capital: string;
  population: string | number;
  currency: string;
  language: string;
};

export interface CountryPageStoryContent {
  _uid: string;
  component: string;
  hero: [CountryPageHero];
  intro: [TileAndRichTextBlock];
  details: string;
  language?: string;
  Language?: string;
  time: string;
  phone: string;
  domain: string;
  curiosities: StoryblokImageAndRichText[];
}

export type CountryPageStory = StoryblokStory<CountryPageStoryContent>;

export interface CountryPageFeatureProps {
  story: CountryPageStory;
}
