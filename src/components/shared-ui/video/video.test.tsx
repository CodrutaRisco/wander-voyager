import React from "react";
import { render, screen } from "@testing-library/react";
import Video from "./video";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} data-fill={fill} data-priority={priority} />;
  },
}));

// Mock rich-text-renderer
jest.mock("@/lib/rich-text-renderer", () => ({
  renderRichText: (content: unknown) => {
    if (!content) return null;
    return <div data-testid="rich-text-content">Rich text content</div>;
  },
}));

const mockImage = {
  filename: "https://a.storyblok.com/f/123/thumbnail.jpg",
  alt: "Video thumbnail",
};

describe("Video Component", () => {
  it("renders the title", () => {
    render(<Video title="Our Video" />);
    
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Our Video"
    );
  });

  it("renders the subtitle when provided", () => {
    render(<Video title="Our Video" subtitle="Watch and enjoy" />);
    
    expect(screen.getByText("Watch and enjoy")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    render(<Video title="Our Video" />);
    
    const subtitle = screen.queryByText("Watch and enjoy");
    expect(subtitle).not.toBeInTheDocument();
  });

  describe("Video embedding", () => {
    it("renders Vimeo embed for Vimeo URL", () => {
      render(
        <Video
          title="Vimeo Video"
          video={{ url: "https://vimeo.com/123456789" }}
        />
      );
      
      const iframe = document.querySelector("iframe");
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute(
        "src",
        "https://player.vimeo.com/video/123456789"
      );
    });

    it("renders YouTube embed for YouTube URL", () => {
      render(
        <Video
          title="YouTube Video"
          video={{ url: "https://www.youtube.com/watch?v=abc123xyz" }}
        />
      );
      
      const iframe = document.querySelector("iframe");
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute(
        "src",
        "https://www.youtube.com/embed/abc123xyz"
      );
    });

    it("renders YouTube embed for youtu.be short URL", () => {
      render(
        <Video
          title="YouTube Video"
          video={{ url: "https://youtu.be/abc123xyz" }}
        />
      );
      
      const iframe = document.querySelector("iframe");
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute(
        "src",
        "https://www.youtube.com/embed/abc123xyz"
      );
    });

    it("renders direct video file when filename is provided", () => {
      render(
        <Video
          title="Direct Video"
          video={{ filename: "https://example.com/video.mp4" }}
          image={mockImage}
        />
      );
      
      const video = document.querySelector("video");
      expect(video).toBeInTheDocument();
      
      const source = document.querySelector("source");
      expect(source).toHaveAttribute("src", "https://example.com/video.mp4");
    });

    it("uses cached_url when url is not provided", () => {
      render(
        <Video
          title="Cached Video"
          video={{ cached_url: "https://vimeo.com/987654321" }}
        />
      );
      
      const iframe = document.querySelector("iframe");
      expect(iframe).toHaveAttribute(
        "src",
        "https://player.vimeo.com/video/987654321"
      );
    });
  });

  describe("Thumbnail fallback", () => {
    it("renders thumbnail image when no video is provided", () => {
      render(<Video title="Video Section" image={mockImage} />);
      
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("src", mockImage.filename);
      expect(image).toHaveAttribute("alt", "Video thumbnail");
    });

    it("uses title as alt text when image.alt is missing", () => {
      const imageWithoutAlt = { filename: mockImage.filename };
      render(<Video title="Fallback Alt" image={imageWithoutAlt} />);
      
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("alt", "Fallback Alt");
    });
  });

  describe("Description", () => {
    it("renders description when provided", () => {
      render(
        <Video
          title="Video with Description"
          description={{ type: "doc", content: [] }}
        />
      );
      
      expect(screen.getByTestId("rich-text-content")).toBeInTheDocument();
    });

    it("does not render description when not provided", () => {
      render(<Video title="Video without Description" />);
      
      expect(screen.queryByTestId("rich-text-content")).not.toBeInTheDocument();
    });
  });

  it("renders the video section", () => {
    render(<Video title="Test Video" />);
    
    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("sets iframe title for accessibility", () => {
    render(
      <Video
        title="Accessible Video"
        video={{ url: "https://vimeo.com/123456789" }}
      />
    );
    
    const iframe = document.querySelector("iframe");
    expect(iframe).toHaveAttribute("title", "Accessible Video");
  });
});

