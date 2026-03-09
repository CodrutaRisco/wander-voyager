import React from "react";
import { render, screen } from "@testing-library/react";
import { CountryPage } from "./country-page";
import type { CountryPageStory } from "./types";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, fill, className }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} data-fill={fill} data-testid="country-hero-image" />;
  },
}));

// Mock rich-text-renderer
jest.mock("@/lib/rich-text-renderer", () => ({
  renderRichText: jest.fn((content) => <div data-testid="rich-text-content">{content?.type || "Mocked rich text"}</div>),
}));

const mockImage = {
  filename: "https://a.storyblok.com/f/123/romania.jpg",
  alt: "Romania landscape",
  id: 123,
  name: "romania",
  focus: "",
  title: "",
  source: "",
  copyright: "",
  fieldtype: "asset" as const,
  meta_data: {},
  is_external_url: false,
};

const createMockCountryStory = (overrides = {}): CountryPageStory => ({
  id: 123,
  uuid: "test-uuid",
  name: "romania",
  slug: "romania",
  created_at: "2024-01-01",
  published_at: "2024-01-01",
  alternates: [],
  default_full_slug: "countries/romania",
  full_slug: "countries/romania",
  group_id: "group-123",
  is_startpage: false,
  meta_data: null,
  parent_id: null,
  position: 0,
  release_id: null,
  sort_by_date: null,
  tag_list: [],
  translated_slugs: null,
  content: {
    _uid: "test-uid",
    component: "CountryPage",
    hero: [{
      hero: [{
        _uid: "hero-uid",
        title: "Romania",
        subtitle: "Beautiful Eastern European country",
        image: mockImage,
        component: "Hero",
      }],
      capital: "Bucharest",
      population: "19 million",
      currency: "Lei",
      language: "Romanian",
    }],
    intro: [{
      _uid: "intro-uid",
      title: "About Romania",
      richText: { type: "doc", content: [] },
      component: "TileAndRichText",
    }],
    details: "Quick Facts",
    language: "Romanian",
    time: "UTC+2",
    phone: "+40",
    domain: ".ro",
    ...overrides,
  },
});

describe("CountryPage Component", () => {
  it("renders country page with all sections", () => {
    const story = createMockCountryStory();
    render(<CountryPage story={story} />);
    
    // Check if hero section is rendered
    expect(screen.getByText("Romania")).toBeInTheDocument();
    expect(screen.getByText("Beautiful Eastern European country")).toBeInTheDocument();
    
    // Check if intro section is rendered
    expect(screen.getByText("About Romania")).toBeInTheDocument();
    expect(screen.getByTestId("rich-text-content")).toBeInTheDocument();
    
    // Check if quick details are rendered
    expect(screen.getByText("Quick Facts")).toBeInTheDocument();
  });

  it("renders hero fields correctly", () => {
    const story = createMockCountryStory();
    render(<CountryPage story={story} />);
    
    expect(screen.getByText("Capital:")).toBeInTheDocument();
    expect(screen.getByText("Bucharest")).toBeInTheDocument();
    expect(screen.getByText("Population:")).toBeInTheDocument();
    expect(screen.getByText("19 million")).toBeInTheDocument();
    expect(screen.getByText("Currency:")).toBeInTheDocument();
    expect(screen.getByText("Lei")).toBeInTheDocument();
    expect(screen.getByText("Language:")).toBeInTheDocument();
    expect(screen.getAllByText("Romanian")).toHaveLength(2); // One in hero, one in quick details
  });

  it("renders quick details fields correctly", () => {
    const story = createMockCountryStory();
    render(<CountryPage story={story} />);
    
    expect(screen.getByText("Official language")).toBeInTheDocument();
    expect(screen.getAllByText("Romanian")).toHaveLength(2); // One in hero, one in quick details
    expect(screen.getByText("Time zone")).toBeInTheDocument();
    expect(screen.getByText("UTC+2")).toBeInTheDocument();
    expect(screen.getByText("Phone prefix")).toBeInTheDocument();
    expect(screen.getByText("+40")).toBeInTheDocument();
    expect(screen.getByText("Internet domain")).toBeInTheDocument();
    expect(screen.getByText(".ro")).toBeInTheDocument();
  });

  it("returns null when hero is missing", () => {
    const story = createMockCountryStory({
      hero: [],
    });
    
    const { container } = render(<CountryPage story={story} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders without intro section when intro is missing", () => {
    const story = createMockCountryStory({
      intro: [],
      details: "",
      language: "",
      time: "",
      phone: "",
      domain: "",
    });
    
    render(<CountryPage story={story} />);
    
    // Hero should still be rendered
    expect(screen.getByText("Romania")).toBeInTheDocument();
    
    // Intro section should not be rendered
    expect(screen.queryByText("About Romania")).not.toBeInTheDocument();
  });

  it("renders intro without title when title is missing", () => {
    const story = createMockCountryStory({
      intro: [{
        _uid: "intro-uid",
        title: "",
        richText: { type: "doc", content: [] },
        component: "TileAndRichText",
      }],
    });
    
    render(<CountryPage story={story} />);
    
    // Rich text content should still be rendered
    expect(screen.getByTestId("rich-text-content")).toBeInTheDocument();
    
    // Intro title should not be rendered (only Quick Facts title should exist)
    expect(screen.queryByText("About Romania")).not.toBeInTheDocument();
  });

  it("handles Language field with capital L", () => {
    const story = createMockCountryStory({
      language: undefined,
      Language: "Romanian (Capital L)",
    });
    
    render(<CountryPage story={story} />);
    
    expect(screen.getByText("Romanian (Capital L)")).toBeInTheDocument();
    // Verify the quick details section shows the capital L version
    expect(screen.getByText("Official language")).toBeInTheDocument();
  });

  it("renders quick details without title when details is empty", () => {
    const story = createMockCountryStory({
      details: "",
    });
    
    render(<CountryPage story={story} />);
    
    // Quick details fields should still be rendered
    expect(screen.getByText("Official language")).toBeInTheDocument();
    expect(screen.getAllByText("Romanian")).toHaveLength(2); // One in hero, one in quick details
    
    // Details title should not be rendered
    expect(screen.queryByText("Quick Facts")).not.toBeInTheDocument();
  });

  it("handles missing quick details gracefully", () => {
    const story = createMockCountryStory({
      details: "",
      language: "",
      Language: "",
      time: "",
      phone: "",
      domain: "",
    });
    
    render(<CountryPage story={story} />);
    
    // Hero should still be rendered
    expect(screen.getByText("Romania")).toBeInTheDocument();
    
    // Quick details section should not be rendered
    expect(screen.queryByText("Official language")).not.toBeInTheDocument();
  });

  it("renders with population as number", () => {
    const story = createMockCountryStory({
      hero: [{
        ...createMockCountryStory().content.hero[0],
        population: 19000000,
      }],
    });
    
    render(<CountryPage story={story} />);
    
    expect(screen.getByText("19000000")).toBeInTheDocument();
  });
});