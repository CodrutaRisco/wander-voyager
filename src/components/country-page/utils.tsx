import styles from "./country-page.module.css";

function heroFields(
  capital: string,
  population: string,
  currency: string,
  language: string,
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

function quickDetailsFields(
  details: string,
  language: string,
  time: string,
  phone: string,
  domain: string,
) {
  const hasAny = language || time || phone || domain;
  if (!details && !hasAny) return null;

  return (
    <aside className={styles.quickDetailsCard}>
      {details && <h2 className={styles.quickDetailsCardTitle}>{details}</h2>}
      <dl className={styles.quickDetailsList}>
        {language && (
          <div className={styles.quickDetailsRow}>
            <dt className={styles.quickDetailsLabel}>Official language</dt>
            <dd className={styles.quickDetailsValue}>{language}</dd>
          </div>
        )}
        {time && (
          <div className={styles.quickDetailsRow}>
            <dt className={styles.quickDetailsLabel}>Time zone</dt>
            <dd className={styles.quickDetailsValue}>{time}</dd>
          </div>
        )}
        {phone && (
          <div className={styles.quickDetailsRow}>
            <dt className={styles.quickDetailsLabel}>Phone prefix</dt>
            <dd className={styles.quickDetailsValue}>{phone}</dd>
          </div>
        )}
        {domain && (
          <div className={styles.quickDetailsRow}>
            <dt className={styles.quickDetailsLabel}>Internet domain</dt>
            <dd className={styles.quickDetailsValue}>
              <span className={styles.quickDetailsDomain}>{domain}</span>
            </dd>
          </div>
        )}
      </dl>
    </aside>
  );
}
export { heroFields, quickDetailsFields };