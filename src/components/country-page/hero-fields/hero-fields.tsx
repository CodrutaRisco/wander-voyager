import styles from "./hero-fields.module.css";

interface HeroFieldsProps {
  capital: string;
  population: string;
  currency: string;
  climate: string;
}

export function HeroFields({
  capital,
  population,
  currency,
  climate,
}: HeroFieldsProps) {
  return (
    <section className={styles.heroFields}>
      <div className={styles.field}>
        <span className={styles.label}>Capital:</span>
        <span className={styles.value}>{capital}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Population:</span>
        <span className={styles.value}>{population}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Currency:</span>
        <span className={styles.value}>{currency}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Climate:</span>
        <span className={styles.value}>{climate}</span>
      </div>
    </section>
  );
}