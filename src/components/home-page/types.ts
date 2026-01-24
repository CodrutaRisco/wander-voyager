// Types for the Storyblok HomePage
import { StoryblokImage, StoryblokRichtext, StoryblokStory, StoryblokHero  } from "@/types";

export interface GalleryImageBlock {
  _uid: string;
  image: StoryblokImage;
  title: string;
  component: "galleryImage";
}

export interface GalleryBlock {
  _uid: string;
  images: GalleryImageBlock[];
  component: "Gallery";
}

export interface TileAndRichTextBlock {
  _uid: string;
  title: string;
  richText: StoryblokRichtext;
  component: string;
}

export interface VideoComponentBlock {
  _uid: string;
  title: string;
  subtitle: string;
  video: {
    filename: string;
  };
  image: StoryblokImage;
  description: StoryblokRichtext;
  component: string;
}

export interface HomePageContent {
  _uid: string;
  hero: [StoryblokHero];
  intro: [TileAndRichTextBlock];
  carusel: [GalleryBlock];
  videoComponent: [VideoComponentBlock];
  component: string;
}

export type HomePageStory = StoryblokStory<HomePageContent>;

export interface HomePageFeatureProps {
  story: HomePageStory;
}
