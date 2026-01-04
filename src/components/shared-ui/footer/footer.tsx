import styles from "./footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Wander Voyager</span>
        </div>
        <p className={styles.copyright} data-testid="copyright">
          © {currentYear} Wander Voyager
        </p>
      </div>
    </footer>
  );
}



