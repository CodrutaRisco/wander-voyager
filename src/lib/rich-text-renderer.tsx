import {
  MARK_BOLD,
  MARK_LINK,
  NODE_IMAGE,
  NODE_PARAGRAPH,
  NODE_HEADING,
  render,
  StoryblokRichtext,
} from "storyblok-rich-text-react-renderer";
import { ReactNode } from "react";
import Image from "next/image";

interface RenderRichTextOptions {
  openLinksInNewTab?: boolean;
}

/**
 * Renders Storyblok Rich Text content
 * @param body - Storyblok Rich Text field
 * @param options - Custom options
 *  - openLinksInNewTab: boolean - Specify if links should open in a new tab
 * @returns React.ReactNode
 */
export function renderRichText(
  body: StoryblokRichtext | unknown,
  options?: RenderRichTextOptions
): ReactNode {
  return render(body, {
    nodeResolvers: {
      [NODE_IMAGE]: (_, props) => (
        <Image
          src={props.src || ""}
          alt={props.alt || ""}
          title={props.title}
          width={800}
          height={450}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      ),
      [NODE_PARAGRAPH]: (children) =>
        children ? <p>{children}</p> : null,
      [NODE_HEADING]: (children, props) => {
        switch (props.level) {
          case 1: return <h1>{children}</h1>;
          case 2: return <h2>{children}</h2>;
          case 3: return <h3>{children}</h3>;
          case 4: return <h4>{children}</h4>;
          case 5: return <h5>{children}</h5>;
          case 6: return <h6>{children}</h6>;
          default: return <h2>{children}</h2>;
        }
      },
    },
    markResolvers: {
      [MARK_LINK]: (children, props) => (
        <a
          href={props.href}
          target={options?.openLinksInNewTab ? "_blank" : "_self"}
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      [MARK_BOLD]: (children) => <strong>{children}</strong>,
    },
  });
}

export default renderRichText;

