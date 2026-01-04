// Tipuri pentru datele din Storyblok HomePage

export interface HeroBlock {
  _uid: string;
  title: string;
  subtitle: string;
  image: {
    filename: string;
    alt: string;
  };
  component: string;
}

export interface GalleryImageBlock {
  _uid: string;
  image: {
    filename: string;
    alt: string;
  };
  component: string;
}

export interface GalleryBlock {
  _uid: string;
  images: GalleryImageBlock[];
  component: string;
}

export interface TileAndRichTextBlock {
  _uid: string;
  title: string;
  richText: unknown; // Storyblok Richtext
  component: string;
}

export interface VideoComponentBlock {
  _uid: string;
  title: string;
  subtitle: string;
  video: {
    filename: string;
  };
  image: {
    filename: string;
    alt: string;
  };
  description: unknown; // Storyblok Richtext
  component: string;
}

export interface HomePageContent {
  _uid: string;
  hero: HeroBlock[];
  intro: unknown; // Storyblok Richtext
  descriereTara: TileAndRichTextBlock[];
  carusel: GalleryBlock[];
  videoComponent: VideoComponentBlock[];
  component: string;
}

export interface HomePageStory {
  name: string;
  slug: string;
  full_slug: string;
  content: HomePageContent;
}

export interface HomePageFeatureProps {
  story: HomePageStory;
}


