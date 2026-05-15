import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CuriositiesCard } from "./curiosities-card";
import type { StoryblokImageAndRichText } from "@/types";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, fill, className, sizes }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; sizes?: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} data-fill={fill} data-sizes={sizes} data-testid="curiosity-image" />;
  },
}));

// Mock rich-text-renderer
jest.mock("@/lib/rich-text-renderer", () => ({
  renderRichText: jest.fn((content) => <div data-testid="rich-text-content">{content?.type || "Mocked rich text"}</div>),
}));

const mockImage = {
  id: 123,
  alt: "Test curiosity image",
  name: "test-curiosity",
  focus: "",
  title: "Test Curiosity Title",
  source: "",
  filename: "https://a.storyblok.com/f/123/test-curiosity.jpg",
  copyright: "",
  fieldtype: "asset" as const,
  meta_data: {},
  is_external_url: false,
};

const createMockCuriosityProps = (overrides = {}): StoryblokImageAndRichText => ({
  _uid: "curiosity-uid",
  component: "imageAndRichText",
  image: [
    {
      _uid: "gallery-image-uid",
      image: mockImage,
      title: "Test Curiosity",
      component: "galleryImage",
    },
  ],
  text: [{
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "attrs": {},
        "content": [
          {
            "text": "Also labeled \"the Road to the Sky\", \"the Road to the Clouds\", \"the Best Driving Road in the World\" and even \"A spectacular Monument to Earth-Moving Megalomania\" the TransFagarasan climbs, twists and descends right through Moldoveanu and Negoiu - the highest peaks in Fagaras Mountains and in Romania. This is no pass through a gap but a frontal assault, a stark and spectacular reminder of unchecked power stamping itself on an obstreperous landscape.",
            "type": "paragraph",
            "marks": []
          }
        ]
      }
    ]
  },],
  ...overrides,
});

describe("CuriositiesCard Component", () => {
  it("renders the title correctly", () => {
    const props = createMockCuriosityProps();
    render(<CuriositiesCard {...props} />);

    expect(screen.getByText("Test Curiosity")).toBeInTheDocument();
  });

  it("renders the rich text content", () => {
    const props = createMockCuriosityProps();
    render(<CuriositiesCard {...props} />);

    expect(screen.getByTestId("rich-text-content")).toBeInTheDocument();
  });

  it("renders the curiosity card container", () => {
    const props = createMockCuriosityProps();
    const { container } = render(<CuriositiesCard {...props} />);

    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass("curiosityCard");
  });

  it("renders the image correctly when provided", () => {
    const props = createMockCuriosityProps();
    render(<CuriositiesCard {...props} />);

    const image = screen.getByTestId("curiosity-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockImage.filename);
    expect(image).toHaveAttribute("alt", mockImage.alt);
    expect(image).toHaveAttribute("data-fill", "true");
    expect(image).toHaveAttribute("data-sizes", "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw");
  });

  it("renders with fallback alt text when image alt is missing", () => {
    const propsWithoutAlt = createMockCuriosityProps({
      image: [
        {
          _uid: "gallery-image-uid",
          image: { ...mockImage, alt: "" },
          title: "Test Curiosity",
          component: "galleryImage",
        },
      ],
    });

    render(<CuriositiesCard {...propsWithoutAlt} />);

    const image = screen.getByTestId("curiosity-image");
    expect(image).toHaveAttribute("alt", "Curiosity Image");
  });

  it("handles empty image filename gracefully", () => {
    const propsWithoutFilename = createMockCuriosityProps({
      image: [
        {
          _uid: "gallery-image-uid",
          image: { ...mockImage, filename: "" },
          title: "Test Curiosity",
          component: "galleryImage",
        },
      ],
    });

    render(<CuriositiesCard {...propsWithoutFilename} />);

    const image = screen.getByTestId("curiosity-image");
    expect(image).toHaveAttribute("src", "/placeholder-image.jpg");
  });

  it("renders correctly when image array is empty", () => {
    const propsWithEmptyImages = createMockCuriosityProps({
      image: [],
    });

    render(<CuriositiesCard {...propsWithEmptyImages} />);

    const image = screen.getByTestId("curiosity-image");
    expect(image).toHaveAttribute("src", "/placeholder-image.jpg");
    expect(image).toHaveAttribute("alt", "Curiosity Image");
  });

  it("handles missing nested image object gracefully", () => {
    const propsWithMissingImage = createMockCuriosityProps({
      image: [
        {
          _uid: "gallery-image-uid",
          image: null,
          title: "Test Curiosity",
          component: "galleryImage",
        },
      ],
    });

    render(<CuriositiesCard {...propsWithMissingImage} />);

    const image = screen.getByTestId("curiosity-image");
    expect(image).toHaveAttribute("src", "/placeholder-image.jpg");
  });

  it("has proper image container structure", () => {
    const props = createMockCuriosityProps();
    const { container } = render(<CuriositiesCard {...props} />);

    const imageContainer = container.querySelector(".curiosityImageContainer");
    expect(imageContainer).toBeInTheDocument();

    const image = imageContainer?.querySelector("img");
    expect(image).toBeInTheDocument();
  });

  it("opens and closes the modal when the card is clicked", () => {
    const props = createMockCuriosityProps();
    const { container } = render(<CuriositiesCard {...props} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();

    fireEvent.click(article!);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Test Curiosity" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  // it("has proper CSS classes applied", () => {
  //   const props = createMockCuriosityProps();
  //   const { container } = render(<CuriositiesCard {...props} />);

  //   const article = container.querySelector("article");
  //   expect(article).toHaveClass("curiosityCard");

  //   const imageContainer = container.querySelector(".curiosityImageContainer");
  //   expect(imageContainer).toBeInTheDocument();

  //   const image = container.querySelector(".curiosityImage");
  //   expect(image).toBeInTheDocument();

  //   const title = container.querySelector('.curiositiesTitle');
  //   expect(title).toBeInTheDocument();

  //   const content = container.querySelector('.curiositiesContent');
  //   expect(content).toBeInTheDocument();
  // });
});