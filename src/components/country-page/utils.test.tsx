import React from "react";
import { render, screen } from "@testing-library/react";
import { heroFields, quickDetailsFields } from "./utils";

describe("Country Page Utils", () => {
  describe("heroFields", () => {
    it("renders all hero fields correctly", () => {
      const result = heroFields("Bucharest", "19 million", "Romanian Leu", "Romanian");
      render(<div>{result}</div>);
      
      // Check capital field
      expect(screen.getByText("Capital:")).toBeInTheDocument();
      expect(screen.getByText("Bucharest")).toBeInTheDocument();
      
      // Check population field
      expect(screen.getByText("Population:")).toBeInTheDocument();
      expect(screen.getByText("19 million")).toBeInTheDocument();
      
      // Check currency field
      expect(screen.getByText("Currency:")).toBeInTheDocument();
      expect(screen.getByText("Romanian Leu")).toBeInTheDocument();
      
      // Check language field
      expect(screen.getByText("Language:")).toBeInTheDocument();
      expect(screen.getByText("Romanian")).toBeInTheDocument();
    });

    it("renders with empty values", () => {
      const result = heroFields("", "", "", "");
      render(<div>{result}</div>);
      
      // Labels should still be present
      expect(screen.getByText("Capital:")).toBeInTheDocument();
      expect(screen.getByText("Population:")).toBeInTheDocument();
      expect(screen.getByText("Currency:")).toBeInTheDocument();
      expect(screen.getByText("Language:")).toBeInTheDocument();
    });

    it("has correct CSS classes", () => {
      const result = heroFields("Test Capital", "Test Pop", "Test Currency", "Test Language");
      const { container } = render(<div>{result}</div>);
      
      expect(container.querySelector('.heroFields')).toBeInTheDocument();
      expect(container.querySelectorAll('.field')).toHaveLength(4);
      expect(container.querySelectorAll('.label')).toHaveLength(4);
      expect(container.querySelectorAll('.value')).toHaveLength(4);
    });
  });

  describe("quickDetailsFields", () => {
    it("renders all quick details fields with title", () => {
      const result = quickDetailsFields("Quick Facts", "Romanian", "UTC+2", "+40", ".ro");
      render(<div>{result}</div>);
      
      // Check title
      expect(screen.getByText("Quick Facts")).toBeInTheDocument();
      
      // Check language field
      expect(screen.getByText("Official language")).toBeInTheDocument();
      expect(screen.getByText("Romanian")).toBeInTheDocument();
      
      // Check time zone field
      expect(screen.getByText("Time zone")).toBeInTheDocument();
      expect(screen.getByText("UTC+2")).toBeInTheDocument();
      
      // Check phone prefix field
      expect(screen.getByText("Phone prefix")).toBeInTheDocument();
      expect(screen.getByText("+40")).toBeInTheDocument();
      
      // Check internet domain field
      expect(screen.getByText("Internet domain")).toBeInTheDocument();
      expect(screen.getByText(".ro")).toBeInTheDocument();
    });

    it("renders without title when details is empty", () => {
      const result = quickDetailsFields("", "Romanian", "UTC+2", "+40", ".ro");
      render(<div>{result}</div>);
      
      // Title should not be present
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
      
      // Fields should still be present
      expect(screen.getByText("Official language")).toBeInTheDocument();
      expect(screen.getByText("Romanian")).toBeInTheDocument();
    });

    it("renders only non-empty fields", () => {
      const result = quickDetailsFields("", "Romanian", "", "+40", "");
      render(<div>{result}</div>);
      
      // Should render language and phone
      expect(screen.getByText("Official language")).toBeInTheDocument();
      expect(screen.getByText("Romanian")).toBeInTheDocument();
      expect(screen.getByText("Phone prefix")).toBeInTheDocument();
      expect(screen.getByText("+40")).toBeInTheDocument();
      
      // Should not render time zone and domain
      expect(screen.queryByText("Time zone")).not.toBeInTheDocument();
      expect(screen.queryByText("Internet domain")).not.toBeInTheDocument();
    });

    it("returns null when no details and no fields", () => {
      const result = quickDetailsFields("", "", "", "", "");
      expect(result).toBeNull();
    });

    it("returns component when details is provided but fields are empty", () => {
      const result = quickDetailsFields("Quick Facts", "", "", "", "");
      render(<div>{result}</div>);
      
      expect(screen.getByText("Quick Facts")).toBeInTheDocument();
      
      // No field labels should be present
      expect(screen.queryByText("Official language")).not.toBeInTheDocument();
      expect(screen.queryByText("Time zone")).not.toBeInTheDocument();
      expect(screen.queryByText("Phone prefix")).not.toBeInTheDocument();
      expect(screen.queryByText("Internet domain")).not.toBeInTheDocument();
    });

    it("has correct CSS classes", () => {
      const result = quickDetailsFields("Quick Facts", "Romanian", "UTC+2", "+40", ".ro");
      const { container } = render(<div>{result}</div>);
      
      expect(container.querySelector('.quickDetailsCard')).toBeInTheDocument();
      expect(container.querySelector('.quickDetailsCardTitle')).toBeInTheDocument();
      expect(container.querySelector('.quickDetailsList')).toBeInTheDocument();
      expect(container.querySelectorAll('.quickDetailsRow')).toHaveLength(4);
      expect(container.querySelectorAll('.quickDetailsLabel')).toHaveLength(4);
      expect(container.querySelectorAll('.quickDetailsValue')).toHaveLength(4);
      expect(container.querySelector('.quickDetailsDomain')).toBeInTheDocument();
    });

    it("handles partial field data correctly", () => {
      const result = quickDetailsFields("Facts", "", "UTC+2", "", ".com");
      render(<div>{result}</div>);
      
      // Should only render time zone and domain
      expect(screen.getByText("Time zone")).toBeInTheDocument();
      expect(screen.getByText("UTC+2")).toBeInTheDocument();
      expect(screen.getByText("Internet domain")).toBeInTheDocument();
      expect(screen.getByText(".com")).toBeInTheDocument();
      
      // Should not render language and phone
      expect(screen.queryByText("Official language")).not.toBeInTheDocument();
      expect(screen.queryByText("Phone prefix")).not.toBeInTheDocument();
      
      const { container } = render(<div>{result}</div>);
      expect(container.querySelectorAll('.quickDetailsRow')).toHaveLength(2);
    });
  });
});