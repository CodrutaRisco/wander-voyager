import React from "react";
import { render, screen } from "@testing-library/react";
import { CountryIntro } from "./country-intro";

// Mock the rich-text-renderer module
jest.mock("@/lib/rich-text-renderer", () => ({
  renderRichText: jest.fn((content) => (
    <div data-testid="rendered-rich-text">{JSON.stringify(content)}</div>
  )),
}));

// Mock the QuickDetails component
jest.mock("../quick-details/quick-details", () => ({
  QuickDetails: jest.fn(({ language, time, phone, domain }) => (
    <div
      data-testid="quick-details"
      data-language={language}
      data-time={time}
      data-phone={phone}
      data-domain={domain}
    >
      Quick Details Mock
    </div>
  )),
}));

import { renderRichText } from "@/lib/rich-text-renderer";
import { QuickDetails } from "../quick-details/quick-details";

const createMockCountryIntroProps = (overrides = {}) => ({
  introText: {
    type: "doc" as const,
    content: [
      {
        type: "paragraph" as const,
        content: [
          {
            type: "text" as const,
            text: "This is a beautiful country with rich culture.",
          },
        ],
      },
    ],
  },
  language: "Romanian",
  timeZone: "UTC+2",
  phone: "+40",
  domain: ".ro",
  ...overrides,
});

describe("CountryIntro Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the intro section with correct structure", () => {
    const props = createMockCountryIntroProps();
    const { container } = render(<CountryIntro {...props} />);

    const section = container.querySelector("section.introSection");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("introSection");
  });

  it("renders the introduction title", () => {
    const props = createMockCountryIntroProps();
    render(<CountryIntro {...props} />);

    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveTextContent("Introduction");
    expect(title).toHaveClass("introTitle");
  });

  it("renders the intro content div", () => {
    const props = createMockCountryIntroProps();
    const { container } = render(<CountryIntro {...props} />);

    const introDiv = container.querySelector(".intro");
    expect(introDiv).toBeInTheDocument();

    const contentDiv = container.querySelector(".introContent");
    expect(contentDiv).toBeInTheDocument();
  });

  it("calls renderRichText with the correct introText", () => {
    const props = createMockCountryIntroProps();
    render(<CountryIntro {...props} />);

    expect(renderRichText).toHaveBeenCalledWith(props.introText);
    expect(renderRichText).toHaveBeenCalledTimes(1);
  });

  it("renders the rich text content", () => {
    const props = createMockCountryIntroProps();
    render(<CountryIntro {...props} />);

    const richTextElement = screen.getByTestId("rendered-rich-text");
    expect(richTextElement).toBeInTheDocument();
  });

  it("renders QuickDetails component with correct props", () => {
    const props = createMockCountryIntroProps();
    render(<CountryIntro {...props} />);

    expect(QuickDetails).toHaveBeenCalledTimes(1);
    const quickDetailsCall = (QuickDetails as jest.Mock).mock.calls[0][0];
    expect(quickDetailsCall).toMatchObject({
      language: "Romanian",
      time: "UTC+2",
      phone: "+40",
      domain: ".ro",
    });
  });

  it("displays the QuickDetails component", () => {
    const props = createMockCountryIntroProps();
    render(<CountryIntro {...props} />);

    const quickDetails = screen.getByTestId("quick-details");
    expect(quickDetails).toBeInTheDocument();
    expect(quickDetails).toHaveAttribute("data-language", "Romanian");
    expect(quickDetails).toHaveAttribute("data-time", "UTC+2");
    expect(quickDetails).toHaveAttribute("data-phone", "+40");
    expect(quickDetails).toHaveAttribute("data-domain", ".ro");
  });

  it("handles different introText content", () => {
    const customIntroText = {
      type: "doc" as const,
      content: [
        {
          type: "paragraph" as const,
          content: [
            { type: "text" as const, text: "Different introduction text." },
          ],
        },
      ],
    };

    const props = createMockCountryIntroProps({ introText: customIntroText });
    render(<CountryIntro {...props} />);

    expect(renderRichText).toHaveBeenCalledWith(customIntroText);
  });

  it("handles different country details", () => {
    const props = createMockCountryIntroProps({
      language: "French",
      timeZone: "UTC+1",
      phone: "+33",
      domain: ".fr",
    });
    render(<CountryIntro {...props} />);

    expect(QuickDetails).toHaveBeenCalledTimes(1);
    const quickDetailsCall = (QuickDetails as jest.Mock).mock.calls[0][0];
    expect(quickDetailsCall).toMatchObject({
      language: "French",
      time: "UTC+1",
      phone: "+33",
      domain: ".fr",
    });
  });

  it("handles empty or undefined props gracefully", () => {
    const props = createMockCountryIntroProps({
      language: "",
      timeZone: "",
      phone: "",
      domain: "",
    });
    render(<CountryIntro {...props} />);

    expect(QuickDetails).toHaveBeenCalledTimes(1);
    const quickDetailsCall = (QuickDetails as jest.Mock).mock.calls[0][0];
    expect(quickDetailsCall).toMatchObject({
      language: "",
      time: "",
      phone: "",
      domain: "",
    });
  });
});
