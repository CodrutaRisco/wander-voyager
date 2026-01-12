import React from "react";
import { render, screen } from "@testing-library/react";
import { renderRichText } from "./rich-text-renderer";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} data-testid="rich-text-image" data-fill={fill} data-priority={priority} />;
  },
}));

describe("renderRichText", () => {
  describe("Paragraphs", () => {
    it("renders a simple paragraph", () => {
      const content = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Hello World" }],
          },
        ],
      };

      const { container } = render(<>{renderRichText(content)}</>);
      
      expect(container.querySelector("p")).toHaveTextContent("Hello World");
    });

    it("does not render empty paragraphs", () => {
      const content = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [],
          },
        ],
      };

      const { container } = render(<>{renderRichText(content)}</>);
      
      expect(container.querySelector("p")).toBeNull();
    });
  });

  describe("Headings", () => {
    it("renders h1 heading", () => {
      const content = {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "Heading 1" }],
          },
        ],
      };

      render(<>{renderRichText(content)}</>);
      
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Heading 1"
      );
    });

    it("renders h2 heading", () => {
      const content = {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Heading 2" }],
          },
        ],
      };

      render(<>{renderRichText(content)}</>);
      
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Heading 2"
      );
    });

    it("renders h3 heading", () => {
      const content = {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Heading 3" }],
          },
        ],
      };

      render(<>{renderRichText(content)}</>);
      
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "Heading 3"
      );
    });

    it("renders h4 to h6 headings", () => {
      const content = {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 4 },
            content: [{ type: "text", text: "H4" }],
          },
          {
            type: "heading",
            attrs: { level: 5 },
            content: [{ type: "text", text: "H5" }],
          },
          {
            type: "heading",
            attrs: { level: 6 },
            content: [{ type: "text", text: "H6" }],
          },
        ],
      };

      render(<>{renderRichText(content)}</>);
      
      expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("H4");
      expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("H5");
      expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent("H6");
    });
  });

  describe("Bold text", () => {
    it("renders bold text with strong tag", () => {
      const content = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Bold text",
                marks: [{ type: "bold" }],
              },
            ],
          },
        ],
      };

      const { container } = render(<>{renderRichText(content)}</>);
      
      expect(container.querySelector("strong")).toHaveTextContent("Bold text");
    });
  });

  describe("Links", () => {
    it("renders links with href", () => {
      const content = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Click here",
                marks: [
                  {
                    type: "link",
                    attrs: { href: "https://example.com" },
                  },
                ],
              },
            ],
          },
        ],
      };

      render(<>{renderRichText(content)}</>);
      
      const link = screen.getByRole("link");
      expect(link).toHaveTextContent("Click here");
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("opens links in same tab by default", () => {
      const content = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Link",
                marks: [{ type: "link", attrs: { href: "https://example.com" } }],
              },
            ],
          },
        ],
      };

      render(<>{renderRichText(content)}</>);
      
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_self");
    });

    it("opens links in new tab when option is set", () => {
      const content = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Link",
                marks: [{ type: "link", attrs: { href: "https://example.com" } }],
              },
            ],
          },
        ],
      };

      render(<>{renderRichText(content, { openLinksInNewTab: true })}</>);
      
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("has rel noopener noreferrer on links", () => {
      const content = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Link",
                marks: [{ type: "link", attrs: { href: "https://example.com" } }],
              },
            ],
          },
        ],
      };

      render(<>{renderRichText(content)}</>);
      
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Images", () => {
    it("renders images with src and alt", () => {
      const content = {
        type: "doc",
        content: [
          {
            type: "image",
            attrs: {
              src: "https://example.com/image.jpg",
              alt: "Test image",
            },
          },
        ],
      };

      render(<>{renderRichText(content)}</>);
      
      const image = screen.getByTestId("rich-text-image");
      expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
      expect(image).toHaveAttribute("alt", "Test image");
    });

    it("handles missing alt text", () => {
      const content = {
        type: "doc",
        content: [
          {
            type: "image",
            attrs: {
              src: "https://example.com/image.jpg",
            },
          },
        ],
      };

      render(<>{renderRichText(content)}</>);
      
      const image = screen.getByTestId("rich-text-image");
      expect(image).toHaveAttribute("alt", "");
    });
  });

  describe("Edge cases", () => {
    it("handles empty document", () => {
      const content = {
        type: "doc",
        content: [],
      };

      const { container } = render(<>{renderRichText(content)}</>);
      expect(container.textContent).toBe("");
    });

    it("handles document with only empty paragraphs", () => {
      const content = {
        type: "doc",
        content: [
          { type: "paragraph", content: [] },
          { type: "paragraph", content: [] },
        ],
      };

      const { container } = render(<>{renderRichText(content)}</>);
      expect(container.querySelectorAll("p")).toHaveLength(0);
    });
  });
});

