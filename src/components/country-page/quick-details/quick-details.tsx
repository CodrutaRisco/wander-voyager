import styles from "./quick-details.module.css";

interface QuickDetailsProps {
  language?: string;
  time?: string;
  phone?: string;
  domain?: string;
}

export function QuickDetails({ 

  language, 
  time, 
  phone, 
  domain 
}: QuickDetailsProps) {
  const hasAny = language || time || phone || domain;

  return (
    <aside className={styles.quickDetailsCard}>
      <h2 className={styles.quickDetailsCardTitle}>Quick Details</h2>
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