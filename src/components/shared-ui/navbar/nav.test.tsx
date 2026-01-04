import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "./nav";

// Mock next/navigation
const mockPathname = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

describe("Nav Component", () => {
  beforeEach(() => {
    mockPathname.mockReturnValue("/");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the navigation list", () => {
    render(<Nav />);
    const navList = screen.getByTestId("nav-list");
    expect(navList).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Nav />);
    
    expect(screen.getByTestId("nav-link-home")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-countries")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-places")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-events")).toBeInTheDocument();
  });

  it("renders correct link labels", () => {
    render(<Nav />);
    
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Countries")).toBeInTheDocument();
    expect(screen.getByText("Places")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
  });

  it("renders correct href attributes", () => {
    render(<Nav />);
    
    expect(screen.getByTestId("nav-link-home")).toHaveAttribute("href", "/");
    expect(screen.getByTestId("nav-link-countries")).toHaveAttribute("href", "/countries");
    expect(screen.getByTestId("nav-link-places")).toHaveAttribute("href", "/places");
    expect(screen.getByTestId("nav-link-events")).toHaveAttribute("href", "/events");
  });

  describe("Active state", () => {
    it("marks Home as active when on root path", () => {
      mockPathname.mockReturnValue("/");
      render(<Nav />);
      
      const homeLink = screen.getByTestId("nav-link-home");
      expect(homeLink.className).toContain("active");
    });

    it("marks Countries as active when on /countries path", () => {
      mockPathname.mockReturnValue("/countries");
      render(<Nav />);
      
      const countriesLink = screen.getByTestId("nav-link-countries");
      expect(countriesLink.className).toContain("active");
    });

    it("marks Countries as active when on /countries subpath", () => {
      mockPathname.mockReturnValue("/countries/france");
      render(<Nav />);
      
      const countriesLink = screen.getByTestId("nav-link-countries");
      expect(countriesLink.className).toContain("active");
    });

    it("marks Places as active when on /places path", () => {
      mockPathname.mockReturnValue("/places");
      render(<Nav />);
      
      const placesLink = screen.getByTestId("nav-link-places");
      expect(placesLink.className).toContain("active");
    });

    it("marks Events as active when on /events path", () => {
      mockPathname.mockReturnValue("/events");
      render(<Nav />);
      
      const eventsLink = screen.getByTestId("nav-link-events");
      expect(eventsLink.className).toContain("active");
    });

    it("does not mark Home as active when on other paths", () => {
      mockPathname.mockReturnValue("/countries");
      render(<Nav />);
      
      const homeLink = screen.getByTestId("nav-link-home");
      expect(homeLink.className).not.toContain("active");
    });
  });

  it("renders four navigation items", () => {
    render(<Nav />);
    
    const navItems = screen.getAllByRole("listitem");
    expect(navItems).toHaveLength(4);
  });

  it("renders links as anchor elements", () => {
    render(<Nav />);
    
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);
  });
});



