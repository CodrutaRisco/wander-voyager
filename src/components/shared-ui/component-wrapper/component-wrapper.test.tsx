import React from "react";
import { render, screen } from "@testing-library/react";
import { ComponentWrapper } from "./component-wrapper";

describe("ComponentWrapper Component", () => {
  it("renders children correctly", () => {
    render(
      <ComponentWrapper>
        <div data-testid="test-child">Test Content</div>
      </ComponentWrapper>
    );
    
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <ComponentWrapper>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </ComponentWrapper>
    );
    
    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
  });

  it("renders text content", () => {
    render(
      <ComponentWrapper>
        Simple text content
      </ComponentWrapper>
    );
    
    expect(screen.getByText("Simple text content")).toBeInTheDocument();
  });

  it("has correct CSS classes", () => {
    const { container } = render(
      <ComponentWrapper>
        <div>Content</div>
      </ComponentWrapper>
    );
    
    const pageDiv = container.firstChild;
    expect(pageDiv).toHaveClass("page");
    
    const mainElement = container.querySelector("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass("main");
  });

  it("renders empty children", () => {
    const { container } = render(<ComponentWrapper>{null}</ComponentWrapper>);
    
    const mainElement = container.querySelector("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toBeEmptyDOMElement();
  });

  it("renders complex nested structure", () => {
    render(
      <ComponentWrapper>
        <section>
          <h1>Title</h1>
          <p>Paragraph</p>
        </section>
      </ComponentWrapper>
    );
    
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Title");
    expect(screen.getByText("Paragraph")).toBeInTheDocument();
  });
});
