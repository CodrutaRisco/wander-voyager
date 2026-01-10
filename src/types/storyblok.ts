// Shared Storyblok Types - exportable

// ==================== Rich Text Types ====================

export type StoryblokRichtextContentType =
  | "heading"
  | "code_block"
  | "paragraph"
  | "blockquote"
  | "ordered_list"
  | "bullet_list"
  | "list_item"
  | "horizontal_rule"
  | "hard_break"
  | "image"
  | "blok";

export type StoryblokRichtextMark =
  | "bold"
  | "italic"
  | "strike"
  | "underline"
  | "code"
  | "link"
  | "styled";

export interface StoryblokRichtextContent {
  type: StoryblokRichtextContentType;
  attrs?: {
    level?: number;
    class?: string;
    src?: string;
    alt?: string;
    title?: string;
    order?: number;
    body?: Array<{ _uid: string }>;
  };
  marks?: {
    type: StoryblokRichtextMark;
    attrs?: {
      linktype?: string;
      href?: string;
      target?: string;
      anchor?: string;
      uuid?: string;
      class?: string;
    };
  }[];
  text?: string;
  content?: StoryblokRichtextContent[];
}

export interface StoryblokRichtext {
  type: "doc";
  content: StoryblokRichtextContent[];
}

// ==================== Asset Types ====================

export interface StoryblokImage {
  filename: string;
  alt: string;
  id?: number;
  name?: string;
  focus?: string;
  title?: string;
  source?: string;
  copyright?: string;
  fieldtype?: string;
  meta_data?: {
    alt?: string;
    title?: string;
    source?: string;
    copyright?: string;
  };
  is_external_url?: boolean;
}

export interface StoryblokVideo {
  filename: string;
  id?: number;
  alt?: string;
  name?: string;
  title?: string;
  fieldtype?: string;
}

// ==================== Story Types ====================

export interface StoryblokStory<T = unknown> {
  name: string;
  slug: string;
  full_slug: string;
  content: T;
  id?: number;
  uuid?: string;
  created_at?: string;
  published_at?: string;
  updated_at?: string;
}

export interface StoryblokTitleAndRichText {
    _uid: string;
    title: string;
    richText: StoryblokRichtext;
    component: 'tileAndRichText';
}

