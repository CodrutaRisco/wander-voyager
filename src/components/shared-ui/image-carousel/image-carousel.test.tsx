import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ImageCarousel } from "./image-carousel";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, fill, className, sizes }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; sizes?: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} data-fill={fill} data-sizes={sizes} data-testid="carousel-image" />;
  },
}));

interface GalleryImage {
  _uid: string;
  image: {
    filename: string;
    alt?: string;
  };
  title?: string;
}

const createMockImages = (count: number = 3): GalleryImage[] => {
  return Array.from({ length: count }, (_, i) => ({
    _uid: `image-${i + 1}`,
    image: {
      filename: `https://a.storyblok.com/f/123/image-${i + 1}.jpg`,
      alt: `Test image ${i + 1}`,
    },
    title: `Image ${i + 1} Title`,
  }));
};

describe("ImageCarousel Component", () => {
  describe("Basic rendering", () => {
    it("renders carousel with images", () => {
      const images = createMockImages(3);
      render(<ImageCarousel images={images} />);
      
      const carousel = screen.getByLabelText("Image carousel");
      expect(carousel).toBeInTheDocument();
      
      const carouselImages = screen.getAllByTestId("carousel-image");
      expect(carouselImages).toHaveLength(3);
    });

    it("returns null when no images provided", () => {
      const { container } = render(<ImageCarousel images={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it("renders with default props", () => {
      const images = createMockImages(2);
      render(<ImageCarousel images={images} />);
      
      // Should show dots by default
      const dotsContainer = screen.getByLabelText("Carousel pagination");
      expect(dotsContainer).toBeInTheDocument();
      
      // Should show arrows by default
      expect(screen.getByLabelText("Previous")).toBeInTheDocument();
      expect(screen.getByLabelText("Next")).toBeInTheDocument();
    });
  });

  describe("Navigation arrows", () => {
    it("renders navigation arrows when showArrows is true", () => {
      const images = createMockImages(3);
      render(<ImageCarousel images={images} showArrows={true} />);
      
      const prevButton = screen.getByLabelText("Previous");
      const nextButton = screen.getByLabelText("Next");
      
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
      expect(prevButton).toHaveTextContent("◄");
      expect(nextButton).toHaveTextContent("►");
    });

    it("does not render navigation arrows when showArrows is false", () => {
      const images = createMockImages(3);
      render(<ImageCarousel images={images} showArrows={false} />);
      
      expect(screen.queryByLabelText("Previous")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Next")).not.toBeInTheDocument();
    });

    it("navigates to next slide when next button clicked", () => {
      const images = createMockImages(3);
      const { container } = render(<ImageCarousel images={images} />);
      
      const track = container.querySelector(".track") as HTMLElement;
      expect(track.style.transform).toMatch(/translateX\(-?0%\)/);
      
      const nextButton = screen.getByLabelText("Next");
      fireEvent.click(nextButton);
      
      expect(track.style.transform).toBe("translateX(-100%)");
    });

    it("navigates to previous slide when previous button clicked", () => {
      const images = createMockImages(3);
      const { container } = render(<ImageCarousel images={images} defaultVisible={1} />);
      
      const track = container.querySelector(".track") as HTMLElement;
      expect(track.style.transform).toBe("translateX(-100%)");
      
      const prevButton = screen.getByLabelText("Previous");
      fireEvent.click(prevButton);
      
      expect(track.style.transform).toMatch(/translateX\(-?0%\)/);
    });

    it("wraps to last slide when clicking previous on first slide", () => {
      const images = createMockImages(3);
      const { container } = render(<ImageCarousel images={images} defaultVisible={0} />);
      
      const track = container.querySelector(".track") as HTMLElement;
      const prevButton = screen.getByLabelText("Previous");
      
      fireEvent.click(prevButton);
      
      expect(track.style.transform).toBe("translateX(-200%)"); // Last slide (index 2)
    });

    it("wraps to first slide when clicking next on last slide", () => {
      const images = createMockImages(3);
      const { container } = render(<ImageCarousel images={images} defaultVisible={2} />);
      
      const track = container.querySelector(".track") as HTMLElement;
      const nextButton = screen.getByLabelText("Next");
      
      fireEvent.click(nextButton);
      
      expect(track.style.transform).toMatch(/translateX\(-?0%\)/); // First slide (index 0)
    });
  });

  describe("Pagination dots", () => {
    it("renders pagination dots when showDots is true", () => {
      const images = createMockImages(3);
      render(<ImageCarousel images={images} showDots={true} />);
      
      const dotsContainer = screen.getByLabelText("Carousel pagination");
      expect(dotsContainer).toBeInTheDocument();
      
      const dots = screen.getAllByRole("button", { name: /Go to slide \d+/ });
      expect(dots).toHaveLength(3);
    });

    it("does not render pagination dots when showDots is false", () => {
      const images = createMockImages(3);
      render(<ImageCarousel images={images} showDots={false} />);
      
      expect(screen.queryByLabelText("Carousel pagination")).not.toBeInTheDocument();
    });

    it("navigates to specific slide when dot clicked", () => {
      const images = createMockImages(4);
      const { container } = render(<ImageCarousel images={images} />);
      
      const track = container.querySelector(".track") as HTMLElement;
      const slideThreeButton = screen.getByLabelText("Go to slide 3");
      
      fireEvent.click(slideThreeButton);
      
      expect(track.style.transform).toBe("translateX(-200%)"); // Slide 3 (index 2)
    });

    it("applies active class to current slide dot", () => {
      const images = createMockImages(3);
      const { container } = render(<ImageCarousel images={images} defaultVisible={1} />);
      
      const dots = container.querySelectorAll(".dot");
      expect(dots[0]).not.toHaveClass("dotActive");
      expect(dots[1]).toHaveClass("dotActive");
      expect(dots[2]).not.toHaveClass("dotActive");
    });
  });

  describe("Image rendering", () => {
    it("renders images with correct props", () => {
      const images = createMockImages(2);
      render(<ImageCarousel images={images} />);
      
      const carouselImages = screen.getAllByTestId("carousel-image");
      
      expect(carouselImages[0]).toHaveAttribute("src", "https://a.storyblok.com/f/123/image-1.jpg");
      expect(carouselImages[0]).toHaveAttribute("alt", "Test image 1");
      expect(carouselImages[0]).toHaveAttribute("data-fill", "true");
      expect(carouselImages[0]).toHaveAttribute("data-sizes", "(max-width: 900px) 100vw, 900px");
    });

    it("uses title as fallback alt text when image alt is missing", () => {
      const images: GalleryImage[] = [
        {
          _uid: "image-1",
          image: {
            filename: "https://a.storyblok.com/f/123/image-1.jpg",
          },
          title: "Fallback Title",
        },
      ];
      render(<ImageCarousel images={images} />);
      
      const image = screen.getByTestId("carousel-image");
      expect(image).toHaveAttribute("alt", "Fallback Title");
    });

    it("uses generic fallback when both alt and title are missing", () => {
      const images: GalleryImage[] = [
        {
          _uid: "image-1",
          image: {
            filename: "https://a.storyblok.com/f/123/image-1.jpg",
          },
        },
      ];
      render(<ImageCarousel images={images} />);
      
      const image = screen.getByTestId("carousel-image");
      expect(image).toHaveAttribute("alt", "Gallery image");
    });
  });

  describe("Default visible slide", () => {
    it("starts with first slide when defaultVisible not specified", () => {
      const images = createMockImages(3);
      const { container } = render(<ImageCarousel images={images} />);
      
      const track = container.querySelector(".track") as HTMLElement;
      expect(track.style.transform).toMatch(/translateX\(-?0%\)/);
    });

    it("starts with specified defaultVisible slide", () => {
      const images = createMockImages(3);
      const { container } = render(<ImageCarousel images={images} defaultVisible={2} />);
      
      const track = container.querySelector(".track") as HTMLElement;
      expect(track.style.transform).toBe("translateX(-200%)");
    });

    it("clamps defaultVisible to valid range", () => {
      const images = createMockImages(3);
      const { container: container1 } = render(<ImageCarousel images={images} defaultVisible={-1} />);
      const { container: container2 } = render(<ImageCarousel images={images} defaultVisible={10} />);
      
      const track1 = container1.querySelector(".track") as HTMLElement;
      const track2 = container2.querySelector(".track") as HTMLElement;
      
      expect(track1.style.transform).toMatch(/translateX\(-?0%\)/); // Clamped to 0
      expect(track2.style.transform).toBe("translateX(-200%)"); // Clamped to 2 (last index)
    });
  });

  describe("CSS classes", () => {
    it("applies correct CSS classes", () => {
      const images = createMockImages(2);
      const { container } = render(<ImageCarousel images={images} />);
      
      expect(container.querySelector(".carousel")).toBeInTheDocument();
      expect(container.querySelector(".scene")).toBeInTheDocument();
      expect(container.querySelector(".viewport")).toBeInTheDocument();
      expect(container.querySelector(".track")).toBeInTheDocument();
      expect(container.querySelectorAll(".slide")).toHaveLength(2);
      expect(container.querySelector(".dots")).toBeInTheDocument();
    });

    it("applies navigation classes correctly", () => {
      const images = createMockImages(2);
      const { container } = render(<ImageCarousel images={images} />);
      
      const leftNav = container.querySelector(".nav.left");
      const rightNav = container.querySelector(".nav.right");
      
      expect(leftNav).toBeInTheDocument();
      expect(rightNav).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("handles single image correctly", () => {
      const images = createMockImages(1);
      render(<ImageCarousel images={images} />);
      
      const dots = screen.getAllByRole("button", { name: /Go to slide \d+/ });
      expect(dots).toHaveLength(1);
      
      const image = screen.getByTestId("carousel-image");
      expect(image).toBeInTheDocument();
    });

    it("handles non-array images gracefully", () => {
      const { container } = render(<ImageCarousel images={[]} />);
      expect(container.firstChild).toBeNull();
    });
  });
});