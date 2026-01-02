import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./footer";

describe("Footer Component", () => {
  it("renders the footer element", () => {
    render(<Footer />);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  it("renders the brand name", () => {
    render(<Footer />);
    expect(screen.getByText("Wander Voyager")).toBeInTheDocument();
  });

  it("renders copyright text with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyright = screen.getByTestId("copyright");
    expect(copyright).toHaveTextContent(`© ${currentYear} Wander Voyager`);
  });

  it("renders with correct semantic structure", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("renders copyright as a paragraph element", () => {
    render(<Footer />);
    const copyright = screen.getByTestId("copyright");
    expect(copyright.tagName.toLowerCase()).toBe("p");
  });

  it("renders brand name as a span element", () => {
    render(<Footer />);
    const brandName = screen.getByText("Wander Voyager");
    expect(brandName.tagName.toLowerCase()).toBe("span");
  });

  it("has role contentinfo for accessibility", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });
});

