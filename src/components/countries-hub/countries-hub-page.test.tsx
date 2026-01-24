import React from "react";
import { render, screen } from "@testing-library/react";
import { CountriesHubPage } from "./countries-hub-page";
import { CountriesHubPageStory } from "./types";
import type { StoryblokRichtext } from "@/types";

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
  ComponentWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="component-wrapper">{children}</div>
  ),
}));

// Mock WorldCulture component
jest.mock("./world-culture/world-culture", () => ({
  WorldCulture: ({ title }: { title: string }) => (
    <div data-testid="world-culture">{title}</div>
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
      content: [{ type: "text" as any, text: "Test paragraph" }],
    },
  ],
};

const createMockStory = (overrides = {}): CountriesHubPageStory => ({
  name: "CountriesHub",
  created_at: "2026-01-01T00:00:00.000Z",
  published_at: "2026-01-01T00:00:00.000Z",
  id: 123,
  uuid: "test-uuid",
  slug: "countries-hub",
  full_slug: "countries-hub",
  content: {
    _uid: "content-uid",
    component: "CountriesHub",
    intro: mockRichText,
    CountriesHero: [
      {
        _uid: "hero-uid",
        title: "Explore Countries",
        subtitle: "Discover amazing destinations",
        image: mockImage,
        component: "hero",
      },
    ],
    worldCulture: [
      {
        _uid: "culture-1",
        title: "Culture 1",
        subtitle: "Subtitle 1",
        icon: mockImage,
        text: mockRichText,
        component: "WorldCulture",
      },
      {
        _uid: "culture-2",
        title: "Culture 2",
        subtitle: "Subtitle 2",
        icon: mockImage,
        text: mockRichText,
        component: "WorldCulture",
      },
    ],
    countriesList: [
      {
        _uid: "country-1",
        countrieName: "France",
        subtitle: "Beautiful country",
        image: mockImage,
        component: "CountrieCard",
      },
      {
        _uid: "country-2",
        countrieName: "Italy",
        subtitle: "Amazing culture",
        image: mockImage,
        component: "CountrieCard",
      },
    ],
    countriesFooter: mockRichText,
    ...overrides,
  },
});

describe("CountriesHubPage Component", () => {
  it("renders the Hero section when CountriesHero exists", () => {
    const story = createMockStory();
    render(<CountriesHubPage story={story} />);
    
    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Explore Countries");
    expect(screen.getByText("Discover amazing destinations")).toBeInTheDocument();
  });

  it("does not render Hero when CountriesHero is empty", () => {
    const story = createMockStory({
      CountriesHero: [],
    });
    render(<CountriesHubPage story={story} />);
    
    expect(screen.queryByTestId("hero")).not.toBeInTheDocument();
  });

  it("renders the intro section when intro exists", () => {
    const story = createMockStory();
    render(<CountriesHubPage story={story} />);
    
    const richTextElements = screen.getAllByTestId("rich-text-content");
    expect(richTextElements.length).toBeGreaterThan(0);
    // Verify intro section exists
    const introSection = document.querySelector(".intro");
    expect(introSection).toBeInTheDocument();
  });

  it("does not render intro section when intro is missing", () => {
    const story = createMockStory({
      intro: null as unknown as typeof mockRichText,
    });
    render(<CountriesHubPage story={story} />);
    
    // Rich text might still render null, but section should not appear
    const richTextElements = screen.queryAllByTestId("rich-text-content");
    expect(richTextElements.length).toBeLessThanOrEqual(1); // Only footer might have it
  });

  it("renders WorldCulture section when worldCulture exists", () => {
    const story = createMockStory();
    render(<CountriesHubPage story={story} />);
    
    const worldCultureElements = screen.getAllByTestId("world-culture");
    expect(worldCultureElements).toHaveLength(2);
    expect(screen.getByText("Culture 1")).toBeInTheDocument();
    expect(screen.getByText("Culture 2")).toBeInTheDocument();
  });

  it("does not render WorldCulture section when worldCulture is empty", () => {
    const story = createMockStory({
      worldCulture: [],
    });
    render(<CountriesHubPage story={story} />);
    
    expect(screen.queryByTestId("world-culture")).not.toBeInTheDocument();
  });

  it("renders countries list section when countriesList exists", () => {
    const story = createMockStory();
    render(<CountriesHubPage story={story} />);
    
    // Use getByRole with level to get the h2 in countries list section
    expect(screen.getByRole("heading", { level: 2, name: "Explore Countries" })).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText("Italy")).toBeInTheDocument();
    expect(screen.getByText("Beautiful country")).toBeInTheDocument();
    expect(screen.getByText("Amazing culture")).toBeInTheDocument();
  });

  it("renders country images with correct alt text", () => {
    const story = createMockStory();
    render(<CountriesHubPage story={story} />);
    
    const images = screen.getAllByRole("img");
    const countryImages = images.filter(img => img.getAttribute("alt") === "Test image" || img.getAttribute("alt") === "France" || img.getAttribute("alt") === "Italy");
    expect(countryImages.length).toBeGreaterThan(0);
  });

  it("uses country name as alt text when image alt is missing", () => {
    const story = createMockStory({
      countriesList: [
        {
          _uid: "country-1",
          countrieName: "France",
          subtitle: "Beautiful country",
          image: { ...mockImage, alt: "" },
          component: "CountrieCard",
        },
      ],
    });
    render(<CountriesHubPage story={story} />);
    
    const images = screen.getAllByRole("img");
    const franceImage = images.find(img => img.getAttribute("alt") === "France");
    expect(franceImage).toBeInTheDocument();
  });

  it("does not render countries list section when countriesList is empty", () => {
    const story = createMockStory({
      countriesList: [],
    });
    render(<CountriesHubPage story={story} />);
    
    // Hero still has "Explore Countries" as h1, so check for h2 specifically (countries list section)
    const h2Headings = screen.queryAllByRole("heading", { level: 2 });
    const countriesListHeading = h2Headings.find(h => h.textContent === "Explore Countries");
    expect(countriesListHeading).toBeUndefined();
    expect(screen.queryByText("France")).not.toBeInTheDocument();
  });

  it("renders footer section when countriesFooter exists", () => {
    const story = createMockStory();
    render(<CountriesHubPage story={story} />);
    
    const richTextElements = screen.getAllByTestId("rich-text-content");
    expect(richTextElements.length).toBeGreaterThan(0);
  });

  it("does not render footer section when countriesFooter is missing", () => {
    const story = createMockStory({
      countriesFooter: null as unknown as typeof mockRichText,
    });
    render(<CountriesHubPage story={story} />);
    
    // Footer section should not render rich text
    const richTextElements = screen.queryAllByTestId("rich-text-content");
    // Only intro might have rich text
    expect(richTextElements.length).toBeLessThanOrEqual(1);
  });

  it("renders ComponentWrapper around main content", () => {
    const story = createMockStory();
    render(<CountriesHubPage story={story} />);
    
    expect(screen.getByTestId("component-wrapper")).toBeInTheDocument();
  });

  it("renders all sections together", () => {
    const story = createMockStory();
    render(<CountriesHubPage story={story} />);
    
    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("component-wrapper")).toBeInTheDocument();
    expect(screen.getAllByTestId("world-culture")).toHaveLength(2);
    // Check for h2 in countries list section (not h1 from hero)
    expect(screen.getByRole("heading", { level: 2, name: "Explore Countries" })).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
  });
});
