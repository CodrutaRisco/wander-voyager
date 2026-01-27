import React from "react";
import { render, screen } from "@testing-library/react";
import { HomePage } from "./home-page";
import { HomePageStory } from "./types";
import type { StoryblokRichtext, StoryblokRichtextContent, StoryblokHero } from "@/types";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} data-fill={fill} data-priority={priority} />;
  },
}));

// Mock rich-text-renderer
jest.mock("@/lib/rich-text-renderer", () => ({
  renderRichText: (content: unknown) => {
    if (!content) return null;
    return <div data-testid="rich-text-content">Rich text content</div>;
  },
}));

// Mock shared-ui components
jest.mock("@/components/shared-ui", () => ({
  Hero: ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div data-testid="hero">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  ),
  Gallery: ({ images }: { images: unknown[] }) => (
    <div data-testid="gallery">Gallery with {images.length} images</div>
  ),
  Video: ({ title }: { title: string }) => (
    <div data-testid="video">Video: {title}</div>
  ),
  ComponentWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="component-wrapper">{children}</div>
  ),
}));

const mockImage = {
  id: 123,
  alt: "Test image",
  name: "test",
  focus: "",
  title: "",
  source: "",
  filename: "https://a.storyblok.com/f/123/test.jpg",
  copyright: "",
  fieldtype: "asset" as const,
  meta_data: {},
  is_external_url: false,
};

const mockRichText: StoryblokRichtext = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text" as never, text: "Test paragraph" }] as StoryblokRichtextContent[],
    },
  ],
};

const createMockStory = (overrides = {}): HomePageStory => ({
  name: "HomePage",
  created_at: "2026-01-01T00:00:00.000Z",
  published_at: "2026-01-01T00:00:00.000Z",
  id: 123,
  uuid: "test-uuid",
  slug: "homepage",
  full_slug: "homepage",
  content: {
    _uid: "content-uid",
    hero: [
      {
        _uid: "hero-uid",
        title: "Welcome to Wander Voyager",
        subtitle: "Explore the world",
        image: mockImage,
        component: "hero",
      },
    ],
    intro: [
      {
        _uid: "intro-uid",
        title: "Introduction",
        richText: mockRichText,
        component: "tileAndRichText",
      },
    ],
    carusel: [
      {
        _uid: "gallery-uid",
        images: [
          {
            _uid: "img-1",
            image: mockImage,
            title: "Image 1",
            component: "galleryImage" as const,
          },
        ],
        component: "Gallery" as const,
      },
    ],
    videoComponent: [
      {
        _uid: "video-uid",
        title: "Our Video",
        subtitle: "Watch now",
        video: { filename: "" },
        image: mockImage,
        description: mockRichText,
        component: "cuVideoComponent",
      },
    ],
    component: "homePage",
    ...overrides,
  },
});

describe("HomePage Component", () => {
  it("renders the Hero section", () => {
    const story = createMockStory();
    render(<HomePage story={story} />);
    
    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Welcome to Wander Voyager"
    );
  });

  it("renders the intro section with title", () => {
    const story = createMockStory();
    render(<HomePage story={story} />);
    
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Introduction"
    );
  });

  it("renders the Gallery section", () => {
    const story = createMockStory();
    render(<HomePage story={story} />);
    
    expect(screen.getByTestId("gallery")).toBeInTheDocument();
    expect(screen.getByText("Gallery with 1 images")).toBeInTheDocument();
  });

  it("renders the Video section", () => {
    const story = createMockStory();
    render(<HomePage story={story} />);
    
    expect(screen.getByTestId("video")).toBeInTheDocument();
    expect(screen.getByText("Video: Our Video")).toBeInTheDocument();
  });

  it("does not render Hero when hero array is empty", () => {
    const story = createMockStory({
      hero: [] as unknown as [StoryblokHero],
    });
    render(<HomePage story={story} />);
    
    expect(screen.queryByTestId("hero")).not.toBeInTheDocument();
  });

  it("does not render intro section when intro is empty", () => {
    const story = createMockStory();
    story.content.intro = [] as unknown as [typeof story.content.intro[0]];
    render(<HomePage story={story} />);
    
    expect(screen.queryByText("Introduction")).not.toBeInTheDocument();
  });

  it("does not render Gallery when carusel is empty", () => {
    const story = createMockStory();
    story.content.carusel = [] as unknown as [typeof story.content.carusel[0]];
    render(<HomePage story={story} />);
    
    expect(screen.queryByTestId("gallery")).not.toBeInTheDocument();
  });

  it("does not render Video when videoComponent is empty", () => {
    const story = createMockStory();
    story.content.videoComponent = [] as unknown as [typeof story.content.videoComponent[0]];
    render(<HomePage story={story} />);
    
    expect(screen.queryByTestId("video")).not.toBeInTheDocument();
  });

  it("renders rich text content in intro section", () => {
    const story = createMockStory();
    render(<HomePage story={story} />);
    
    expect(screen.getByTestId("rich-text-content")).toBeInTheDocument();
  });
});

