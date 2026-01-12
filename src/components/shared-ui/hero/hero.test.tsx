import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "./hero";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} data-fill={fill} data-priority={priority} />;
  },
}));

const mockImage = {
  id: 123,
  alt: "Test hero image",
  name: "test-image",
  focus: "",
  title: "Test Image Title",
  source: "",
  filename: "https://a.storyblok.com/f/123/test-image.jpg",
  copyright: "",
  fieldtype: "asset" as const,
  meta_data: {},
  is_external_url: false,
};

describe("Hero Component", () => {
  it("renders the title", () => {
    render(<Hero title="Welcome to Wander Voyager" image={mockImage} />);
    
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Welcome to Wander Voyager"
    );
  });

  it("renders the subtitle when provided", () => {
    render(
      <Hero
        title="Welcome"
        subtitle="Explore the world"
        image={mockImage}
      />
    );
    
    expect(screen.getByText("Explore the world")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    render(<Hero title="Welcome" image={mockImage} />);
    
    const subtitle = screen.queryByText("Explore the world");
    expect(subtitle).not.toBeInTheDocument();
  });

  it("renders the background image with correct src", () => {
    render(<Hero title="Welcome" image={mockImage} />);
    
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockImage.filename);
  });

  it("uses image alt text when provided", () => {
    render(<Hero title="Welcome" image={mockImage} />);
    
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Test hero image");
  });

  it("falls back to title for alt text when image.alt is empty", () => {
    const imageWithoutAlt = { ...mockImage, alt: "" };
    render(<Hero title="Welcome Title" image={imageWithoutAlt} />);
    
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Welcome Title");
  });

  it("renders the hero section", () => {
    render(<Hero title="Welcome" image={mockImage} />);
    
    const section = screen.getByRole("heading", { level: 1 }).closest("section");
    expect(section).toBeInTheDocument();
  });

  it("does not render image when filename is missing", () => {
    const imageWithoutFilename = { ...mockImage, filename: "" };
    render(<Hero title="Welcome" image={imageWithoutFilename} />);
    
    const image = screen.queryByRole("img");
    expect(image).not.toBeInTheDocument();
  });
});

