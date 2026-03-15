import React from "react";
import { render, screen } from "@testing-library/react";
import { QuickDetails } from "./quick-details";

interface QuickDetailsProps {
  details?: string;
  language?: string;
  time?: string;
  phone?: string;
  domain?: string;
}

const createMockQuickDetailsProps = (overrides = {}): QuickDetailsProps => ({
  details: "Quick Details",
  language: "Romanian",
  time: "UTC+2",
  phone: "+40",
  domain: ".ro",
  ...overrides,
});

describe("QuickDetails Component", () => {
  it("renders the quick details card when details provided", () => {
    const props = createMockQuickDetailsProps();
    const { container } = render(<QuickDetails {...props} />);
    
    const aside = container.querySelector("aside");
    expect(aside).toBeInTheDocument();
    expect(aside).toHaveClass("quickDetailsCard");
  });

  it("renders the title when details provided", () => {
    const props = createMockQuickDetailsProps();
    render(<QuickDetails {...props} />);
    
    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveTextContent("Quick Details");
    expect(title).toHaveClass("quickDetailsCardTitle");
  });

  it("does not render title when details is empty", () => {
    const props = createMockQuickDetailsProps({ details: "" });
    render(<QuickDetails {...props} />);
    
    const title = screen.queryByRole("heading", { level: 2 });
    expect(title).not.toBeInTheDocument();
  });

  it("renders all detail fields correctly", () => {
    const props = createMockQuickDetailsProps();
    render(<QuickDetails {...props} />);
    
    expect(screen.getByText("Official language")).toBeInTheDocument();
    expect(screen.getByText("Romanian")).toBeInTheDocument();
    
    expect(screen.getByText("Time zone")).toBeInTheDocument();
    expect(screen.getByText("UTC+2")).toBeInTheDocument();
    
    expect(screen.getByText("Phone prefix")).toBeInTheDocument();
    expect(screen.getByText("+40")).toBeInTheDocument();
    
    expect(screen.getByText("Internet domain")).toBeInTheDocument();
    expect(screen.getByText(".ro")).toBeInTheDocument();
  });

  it("renders only provided fields", () => {
    const partialProps = createMockQuickDetailsProps({
      language: "French",
      time: "UTC+1",
      phone: "",
      domain: "",
    });
    render(<QuickDetails {...partialProps} />);
    
    expect(screen.getByText("Official language")).toBeInTheDocument();
    expect(screen.getByText("French")).toBeInTheDocument();
    
    expect(screen.getByText("Time zone")).toBeInTheDocument();
    expect(screen.getByText("UTC+1")).toBeInTheDocument();
    
    expect(screen.queryByText("Phone prefix")).not.toBeInTheDocument();
    expect(screen.queryByText("Internet domain")).not.toBeInTheDocument();
  });

  it("returns null when no details and no fields provided", () => {
    const emptyProps = createMockQuickDetailsProps({
      details: "",
      language: "",
      time: "",
      phone: "",
      domain: "",
    });
    const { container } = render(<QuickDetails {...emptyProps} />);
    
    expect(container.firstChild).toBeNull();
  });

  it("renders without title but with fields when only fields provided", () => {
    const noTitleProps = createMockQuickDetailsProps({
      details: "",
      language: "Spanish",
      time: "UTC-5",
    });
    render(<QuickDetails {...noTitleProps} />);
    
    const title = screen.queryByRole("heading");
    expect(title).not.toBeInTheDocument();
    
    expect(screen.getByText("Official language")).toBeInTheDocument();
    expect(screen.getByText("Spanish")).toBeInTheDocument();
  });

  it("has proper semantic structure with definition lists", () => {
    const props = createMockQuickDetailsProps();
    const { container } = render(<QuickDetails {...props} />);
    
    const dl = container.querySelector("dl");
    expect(dl).toBeInTheDocument();
    expect(dl).toHaveClass("quickDetailsList");
    
    const dts = container.querySelectorAll("dt");
    const dds = container.querySelectorAll("dd");
    
    expect(dts).toHaveLength(4);
    expect(dds).toHaveLength(4);
  });

  it("applies correct CSS classes to all elements", () => {
    const props = createMockQuickDetailsProps();
    const { container } = render(<QuickDetails {...props} />);
    
    const rows = container.querySelectorAll(".quickDetailsRow");
    expect(rows).toHaveLength(4);
    
    const labels = container.querySelectorAll(".quickDetailsLabel");
    const values = container.querySelectorAll(".quickDetailsValue");
    
    expect(labels).toHaveLength(4);
    expect(values).toHaveLength(4);
    
    // Check domain has special styling
    const domainSpan = container.querySelector(".quickDetailsDomain");
    expect(domainSpan).toBeInTheDocument();
    expect(domainSpan).toHaveTextContent(".ro");
  });

  it("handles undefined props gracefully", () => {
    render(<QuickDetails />);
    
    // Should return null when no props provided
    const { container } = render(<QuickDetails />);
    expect(container.firstChild).toBeNull();
  });

  it("renders with custom values", () => {
    const customProps = createMockQuickDetailsProps({
      language: "German",
      time: "UTC+1",
      phone: "+49",
      domain: ".de",
    });
    render(<QuickDetails {...customProps} />);

    expect(screen.getByText("German")).toBeInTheDocument();
    expect(screen.getByText("UTC+1")).toBeInTheDocument();
    expect(screen.getByText("+49")).toBeInTheDocument();
    expect(screen.getByText(".de")).toBeInTheDocument();
  });

  it("handles very long field values", () => {
    const longProps = createMockQuickDetailsProps({
      language: "English, French, Spanish, German, Italian, Portuguese, Russian",
      time: "UTC+2 (Central European Time with Daylight Saving Time)",
      phone: "+40 (includes country code for international calls)",
      domain: ".ro (Romania top-level domain)",
    });
    render(<QuickDetails {...longProps} />);
    
    expect(screen.getByText("English, French, Spanish, German, Italian, Portuguese, Russian")).toBeInTheDocument();
    expect(screen.getByText("UTC+2 (Central European Time with Daylight Saving Time)")).toBeInTheDocument();
    expect(screen.getByText("+40 (includes country code for international calls)")).toBeInTheDocument();
    expect(screen.getByText(".ro (Romania top-level domain)")).toBeInTheDocument();
  });
});