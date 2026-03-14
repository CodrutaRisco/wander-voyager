import {
  StoryblokHero,
  StoryblokImageAndRichText,
  StoryblokRichtext,
  StoryblokStory,
} from "@/types";


export type CountryPageHero = {
  hero: [StoryblokHero];
  capital: string;
  population: string | number;
  currency: string;
  climate: string;
};

export type CountryIntro = {
  introText: StoryblokRichtext;
  language: string;
  timeZone: string;
  phone: string;
  domain: string;
};

export interface CountryPageStoryContent {
  _uid: string;
  component: string;
  hero: [CountryPageHero];
  intro: [CountryIntro];
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
