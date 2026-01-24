import React from "react";
import { render, screen } from "@testing-library/react";
import { WorldCulture } from "./world-culture";
import { WorldCultureBlock } from "../types";
import { StoryblokRichtext } from "@/types/storyblok";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: React.ImgHTMLAttributes<HTMLImageElement> & { width?: number; height?: number }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} data-testid="world-culture-image" />;
  },
}));

// Mock rich-text-renderer
jest.mock("@/lib/rich-text-renderer", () => ({
  renderRichText: (content: unknown) => {
    if (!content) return null;
    return <div data-testid="rich-text-content">Rich text content</div>;
  },
}));

const mockImage = {
  filename: "https://a.storyblok.com/f/123/culture-icon.jpg",
  alt: "Culture Icon",
  id: 123,
  name: "culture-icon",
  focus: "",
  title: "",
  source: "",
  copyright: "",
  fieldtype: "asset" as const,
  meta_data: {},
  is_external_url: false,
};

const mockRichText = {
  type: "doc" as const,
  content: [
    {
      type: "paragraph" as const,
      content: [{ type: "text", text: "Test paragraph" }],
    },
  ],
};

const createMockWorldCulture = (overrides = {}): WorldCultureBlock => ({
  _uid: "test-uid",
  title: "Test Culture",
  subtitle: "Test Subtitle",
  icon: mockImage,
  text: mockRichText as StoryblokRichtext,
  component: "WorldCulture",
  ...overrides,
});

describe("WorldCulture Component", () => {
  it("renders title correctly", () => {
    const props = createMockWorldCulture();
    render(<WorldCulture {...props} />);
    
    expect(screen.getByText("Test Culture")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Test Culture");
  });

  it("renders subtitle correctly", () => {
    const props = createMockWorldCulture();
    render(<WorldCulture {...props} />);
    
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("renders icon image with correct attributes", () => {
    const props = createMockWorldCulture();
    render(<WorldCulture {...props} />);
    
    const image = screen.getByTestId("world-culture-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://a.storyblok.com/f/123/culture-icon.jpg");
    expect(image).toHaveAttribute("alt", "Culture Icon");
    expect(image).toHaveAttribute("width", "120");
    expect(image).toHaveAttribute("height", "120");
  });

  it("uses title as alt text when icon alt is not provided", () => {
    const props = createMockWorldCulture({
      icon: { ...mockImage, alt: "" },
    });
    render(<WorldCulture {...props} />);
    
    const image = screen.getByTestId("world-culture-image");
    expect(image).toHaveAttribute("alt", "Test Culture");
  });

  it("renders rich text content", () => {
    const props = createMockWorldCulture();
    render(<WorldCulture {...props} />);
    
    expect(screen.getByTestId("rich-text-content")).toBeInTheDocument();
    expect(screen.getByText("Rich text content")).toBeInTheDocument();
  });

  it("has correct CSS classes", () => {
    const { container } = render(<WorldCulture {...createMockWorldCulture()} />);
    
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass("cultureCard");
    
    const iconDiv = container.querySelector(".cultureIcon");
    expect(iconDiv).toBeInTheDocument();
    
    const title = screen.getByRole("heading", { level: 3 });
    expect(title).toHaveClass("cultureTitle");
    
    const subtitle = screen.getByText("Test Subtitle");
    expect(subtitle).toHaveClass("cultureSubtitle");
    
    const textDiv = container.querySelector(".cultureText");
    expect(textDiv).toBeInTheDocument();
  });

  it("renders with different title and subtitle", () => {
    const props = createMockWorldCulture({
      title: "Different Culture",
      subtitle: "Different Subtitle",
    });
    render(<WorldCulture {...props} />);
    
    expect(screen.getByText("Different Culture")).toBeInTheDocument();
    expect(screen.getByText("Different Subtitle")).toBeInTheDocument();
  });

  it("renders as article element", () => {
    const { container } = render(<WorldCulture {...createMockWorldCulture()} />);
    
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
  });
});
