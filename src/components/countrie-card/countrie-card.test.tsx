import React from "react";
import { render, screen } from "@testing-library/react";
import { CountrieCard } from "./countrie-card";
import { CountrieCardBlock } from "../countries-hub/types";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, fill, className }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} data-fill={fill} data-testid="country-image" />;
  },
}));

const mockImage = {
  filename: "https://a.storyblok.com/f/123/france.jpg",
  alt: "France landscape",
  id: 123,
  name: "france",
  focus: "",
  title: "",
  source: "",
  copyright: "",
  fieldtype: "asset" as const,
  meta_data: {},
  is_external_url: false,
};

const createMockCountrieCard = (overrides = {}): CountrieCardBlock => ({
  _uid: "test-uid",
  countrieName: "France",
  subtitle: "Beautiful country",
  image: mockImage,
  component: "CountrieCard",
  ...overrides,
});

describe("CountrieCard Component", () => {
  it("renders country name correctly", () => {
    const props = createMockCountrieCard();
    render(<CountrieCard {...props} />);
    
    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("France");
  });

  it("renders subtitle correctly", () => {
    const props = createMockCountrieCard();
    render(<CountrieCard {...props} />);
    
    expect(screen.getByText("Beautiful country")).toBeInTheDocument();
  });

  it("renders image with correct attributes", () => {
    const props = createMockCountrieCard();
    render(<CountrieCard {...props} />);
    
    const image = screen.getByTestId("country-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://a.storyblok.com/f/123/france.jpg");
    expect(image).toHaveAttribute("alt", "France landscape");
    expect(image).toHaveAttribute("data-fill", "true");
  });

  it("uses country name as alt text when image alt is not provided", () => {
    const props = createMockCountrieCard({
      image: { ...mockImage, alt: "" },
    });
    render(<CountrieCard {...props} />);
    
    const image = screen.getByTestId("country-image");
    expect(image).toHaveAttribute("alt", "France");
  });

  it("renders with different country name and subtitle", () => {
    const props = createMockCountrieCard({
      countrieName: "Italy",
      subtitle: "Amazing culture",
    });
    render(<CountrieCard {...props} />);
    
    expect(screen.getByText("Italy")).toBeInTheDocument();
    expect(screen.getByText("Amazing culture")).toBeInTheDocument();
  });

  it("has correct CSS classes", () => {
    const { container } = render(<CountrieCard {...createMockCountrieCard()} />);
    
    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass("countryCard");
    
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass("countryCard");
    
    const imageWrapper = container.querySelector(".countryImageWrapper");
    expect(imageWrapper).toBeInTheDocument();
    
    const image = screen.getByTestId("country-image");
    expect(image).toHaveClass("countryImage");
    
    const countryInfo = container.querySelector(".countryInfo");
    expect(countryInfo).toBeInTheDocument();
    
    const countryName = screen.getByRole("heading", { level: 3 });
    expect(countryName).toHaveClass("countryName");
    
    const subtitle = screen.getByText("Beautiful country");
    expect(subtitle).toHaveClass("countrySubtitle");
  });

  it("renders as article element", () => {
    const { container } = render(<CountrieCard {...createMockCountrieCard()} />);
    
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
  });

  it("renders image wrapper with correct structure", () => {
    const { container } = render(<CountrieCard {...createMockCountrieCard()} />);
    
    const imageWrapper = container.querySelector(".countryImageWrapper");
    expect(imageWrapper).toBeInTheDocument();
    
    const image = imageWrapper?.querySelector("img");
    expect(image).toBeInTheDocument();
  });

  it("renders country info section with correct structure", () => {
    const { container } = render(<CountrieCard {...createMockCountrieCard()} />);
    
    const countryInfo = container.querySelector(".countryInfo");
    expect(countryInfo).toBeInTheDocument();
    
    const heading = countryInfo?.querySelector("h3");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("France");
    
    const paragraph = countryInfo?.querySelector("p");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent("Beautiful country");
  });
});
