import { ReactNode } from "react";
import styles from "./header.module.css";

interface HeaderProps {
  children?: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Wander Voyager</span>
        </div>
        <nav className={styles.nav} aria-label="Main navigation">
          {children}
        </nav>
      </div>
    </header>
  );
}

