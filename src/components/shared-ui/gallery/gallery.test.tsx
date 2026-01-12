import React from "react";
import { render, screen } from "@testing-library/react";
import Gallery from "./gallery";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} data-fill={fill} data-priority={priority} />;
  },
}));

const mockImages = [
  {
    _uid: "img-1",
    image: {
      filename: "https://a.storyblok.com/f/123/image1.jpg",
      alt: "First gallery image",
    },
  },
  {
    _uid: "img-2",
    image: {
      filename: "https://a.storyblok.com/f/123/image2.jpg",
      alt: "Second gallery image",
    },
  },
  {
    _uid: "img-3",
    image: {
      filename: "https://a.storyblok.com/f/123/image3.jpg",
      alt: "",
    },
  },
];

describe("Gallery Component", () => {
  it("renders all images", () => {
    render(<Gallery images={mockImages} />);
    
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);
  });

  it("renders images with correct src attributes", () => {
    render(<Gallery images={mockImages} />);
    
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", mockImages[0].image.filename);
    expect(images[1]).toHaveAttribute("src", mockImages[1].image.filename);
    expect(images[2]).toHaveAttribute("src", mockImages[2].image.filename);
  });

  it("renders images with correct alt text", () => {
    render(<Gallery images={mockImages} />);
    
    expect(screen.getByAltText("First gallery image")).toBeInTheDocument();
    expect(screen.getByAltText("Second gallery image")).toBeInTheDocument();
  });

  it("uses fallback alt text when alt is empty", () => {
    render(<Gallery images={mockImages} />);
    
    const images = screen.getAllByRole("img");
    expect(images[2]).toHaveAttribute("alt", "Gallery image");
  });

  it("renders the title when provided", () => {
    render(<Gallery images={mockImages} title="Our Gallery" />);
    
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Our Gallery"
    );
  });

  it("does not render title when not provided", () => {
    render(<Gallery images={mockImages} />);
    
    const heading = screen.queryByRole("heading");
    expect(heading).not.toBeInTheDocument();
  });

  it("returns null when images array is empty", () => {
    const { container } = render(<Gallery images={[]} />);
    
    expect(container.firstChild).toBeNull();
  });

  it("returns null when images is undefined", () => {
    // @ts-expect-error testing undefined case
    const { container } = render(<Gallery images={undefined} />);
    
    expect(container.firstChild).toBeNull();
  });

  it("renders the gallery section", () => {
    render(<Gallery images={mockImages} />);
    
    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});

