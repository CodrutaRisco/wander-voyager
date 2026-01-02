"use client";

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

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <ul className={styles.navList} data-testid="nav-list">
      {navLinks.map((link) => (
        <li key={link.href} className={styles.navItem}>
          <Link
            href={link.href}
            className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
            data-testid={`nav-link-${link.label.toLowerCase()}`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}


