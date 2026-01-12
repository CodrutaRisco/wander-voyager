import { ReactNode } from "react";
import styles from "./header.module.css";
import Link from "next/link";

interface HeaderProps {
  children?: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandName}>
            Wander Voyager
          </Link>
        </div>
        <nav className={styles.nav} aria-label="Main navigation">
          {children}
        </nav>
      </div>
    </header>
  );
}

