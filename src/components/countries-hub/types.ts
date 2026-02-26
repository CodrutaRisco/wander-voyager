import { StoryblokImage, StoryblokRichtext, StoryblokStory, StoryblokHero } from "@/types";

export interface WorldCultureBlock {
  _uid: string;
  title: string;
  subtitle: string;
  icon: StoryblokImage;
  text: StoryblokRichtext;
  component: "WorldCulture";
}

export interface CountrieCardBlock {
  _uid: string;
  countrieName: string;
  subtitle: string;
  image: StoryblokImage;
  slug?: string;
  component: "CountrieCard";
}

// ==================== Content Type ====================

export interface CountriesHubPageStoryContent {
  _uid: string;
  component: "CountriesHub";
  intro: StoryblokRichtext;
  CountriesHero: [StoryblokHero];
  worldCulture: WorldCultureBlock[];
  countriesList: CountrieCardBlock[];
  countriesFooter: StoryblokRichtext;
}

export type CountriesHubPageStory = StoryblokStory<CountriesHubPageStoryContent>;

export interface CountriesHubPageFeatureProps {
  story: CountriesHubPageStory;
}