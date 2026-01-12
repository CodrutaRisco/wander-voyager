import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./header";

describe("Header Component", () => {
  it("renders the header element", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders the brand name", () => {
    render(<Header />);
    expect(screen.getByText("Wander Voyager")).toBeInTheDocument();
  });

  it("renders the navigation element with correct aria-label", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Main navigation" });
    expect(nav).toBeInTheDocument();
  });

  it("renders children inside navigation", () => {
    render(
      <Header>
        <span data-testid="test-child">Test Child</span>
      </Header>
    );
    
    const child = screen.getByTestId("test-child");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Test Child");
  });

  it("renders multiple children", () => {
    render(
      <Header>
        <span data-testid="child-1">Child 1</span>
        <span data-testid="child-2">Child 2</span>
      </Header>
    );
    
    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
  });

  it("renders without children", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeEmptyDOMElement();
  });

  it("has the brand name as a link to home page", () => {
    render(<Header />);
    const brandLink = screen.getByRole("link", { name: "Wander Voyager" });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute("href", "/");
  });

  it("renders with correct semantic structure", () => {
    const { container } = render(<Header />);
    
    // Header should be the root element
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    
    // Should contain a nav element
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });
});



