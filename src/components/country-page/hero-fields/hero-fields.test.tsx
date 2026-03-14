import React from "react";
import { render, screen } from "@testing-library/react";
import { HeroFields } from "./hero-fields";

interface HeroFieldsProps {
  capital: string;
  population: string;
  currency: string;
  language: string;
}

const createMockHeroFieldsProps = (overrides = {}): HeroFieldsProps => ({
  capital: "Bucharest",
  population: "19 million",
  currency: "Lei",
  language: "Romanian",
  ...overrides,
});

describe("HeroFields Component", () => {
  it("renders the hero fields section", () => {
    const props = createMockHeroFieldsProps();
    const { container } = render(<HeroFields {...props} />);
    
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("heroFields");
  });

  it("renders all field labels correctly", () => {
    const props = createMockHeroFieldsProps();
    render(<HeroFields {...props} />);
    
    expect(screen.getByText("Capital:")).toBeInTheDocument();
    expect(screen.getByText("Population:")).toBeInTheDocument();
    expect(screen.getByText("Currency:")).toBeInTheDocument();
    expect(screen.getByText("Language:")).toBeInTheDocument();
  });

  it("renders all field values correctly", () => {
    const props = createMockHeroFieldsProps();
    render(<HeroFields {...props} />);
    
    expect(screen.getByText("Bucharest")).toBeInTheDocument();
    expect(screen.getByText("19 million")).toBeInTheDocument();
    expect(screen.getByText("Lei")).toBeInTheDocument();
    expect(screen.getAllByText("Romanian")).toHaveLength(1);
  });

  it("renders with custom values", () => {
    const customProps = createMockHeroFieldsProps({
      capital: "Paris",
      population: "67 million",
      currency: "Euro",
      language: "French",
    });
    render(<HeroFields {...customProps} />);
    
    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("67 million")).toBeInTheDocument();
    expect(screen.getByText("Euro")).toBeInTheDocument();
    expect(screen.getByText("French")).toBeInTheDocument();
  });

  it("renders with empty values", () => {
    const emptyProps = createMockHeroFieldsProps({
      capital: "",
      population: "",
      currency: "",
      language: "",
    });
    render(<HeroFields {...emptyProps} />);
    
    // Labels should still be present
    expect(screen.getByText("Capital:")).toBeInTheDocument();
    expect(screen.getByText("Population:")).toBeInTheDocument();
    expect(screen.getByText("Currency:")).toBeInTheDocument();
    expect(screen.getByText("Language:")).toBeInTheDocument();
  });

  it("has proper CSS structure with field containers", () => {
    const props = createMockHeroFieldsProps();
    const { container } = render(<HeroFields {...props} />);
    
    const fields = container.querySelectorAll(".field");
    expect(fields).toHaveLength(4);
    
    fields.forEach(field => {
      const label = field.querySelector(".label");
      const value = field.querySelector(".value");
      expect(label).toBeInTheDocument();
      expect(value).toBeInTheDocument();
    });
  });

  it("renders labels and values with correct CSS classes", () => {
    const props = createMockHeroFieldsProps();
    const { container } = render(<HeroFields {...props} />);
    
    const labels = container.querySelectorAll(".label");
    const values = container.querySelectorAll(".value");
    
    expect(labels).toHaveLength(4);
    expect(values).toHaveLength(4);
    
    // Check that each label has corresponding value
    expect(labels[0]).toHaveTextContent("Capital:");
    expect(values[0]).toHaveTextContent("Bucharest");
    
    expect(labels[1]).toHaveTextContent("Population:");
    expect(values[1]).toHaveTextContent("19 million");
    
    expect(labels[2]).toHaveTextContent("Currency:");
    expect(values[2]).toHaveTextContent("Lei");
    
    expect(labels[3]).toHaveTextContent("Language:");
    expect(values[3]).toHaveTextContent("Romanian");
  });

  it("renders with very long values", () => {
    const longProps = createMockHeroFieldsProps({
      capital: "A Very Long Capital Name That Might Overflow",
      population: "123,456,789,012 people with detailed demographic information",
      currency: "A Currency With A Really Long Name",
      language: "Multiple Languages Including English, Spanish, French, German, Italian",
    });
    render(<HeroFields {...longProps} />);
    
    expect(screen.getByText("A Very Long Capital Name That Might Overflow")).toBeInTheDocument();
    expect(screen.getByText("123,456,789,012 people with detailed demographic information")).toBeInTheDocument();
    expect(screen.getByText("A Currency With A Really Long Name")).toBeInTheDocument();
    expect(screen.getByText("Multiple Languages Including English, Spanish, French, German, Italian")).toBeInTheDocument();
  });

  it("renders with numeric population values", () => {
    const numericProps = createMockHeroFieldsProps({
      population: "67000000",
    });
    render(<HeroFields {...numericProps} />);
    
    expect(screen.getByText("67000000")).toBeInTheDocument();
  });
});