"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./nav.module.css";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/countries", label: "Countries" },
  { href: "/places", label: "Places" },
  { href: "/events", label: "Events" },
];

export default function Nav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Hamburger Button - visible only on mobile */}
      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span
          className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ""}`}
        />
        <span
          className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ""}`}
        />
        <span
          className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ""}`}
        />
      </button>

      {/* Navigation Links */}
      <ul
        className={`${styles.navList} ${isMenuOpen ? styles.navListOpen : ""}`}
        data-testid="nav-list"
      >
        {navLinks.map((link) => (
          <li key={link.href} className={styles.navItem}>
            <Link
              href={link.href}
              className={`${styles.navLink} ${
                isActive(link.href) ? styles.active : ""
              }`}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Overlay when menu is open */}
      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu} />}
    </>
  );
}



