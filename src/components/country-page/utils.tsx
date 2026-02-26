import styles from "./country-page.module.css";

function heroFields(
  capital: string,
  population: string,
  currency: string,
  language: string
) {
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
        <span className={styles.label}>Language:</span>
        <span className={styles.value}>{language}</span>
      </div>
    </section>
  );
}

export default heroFields;