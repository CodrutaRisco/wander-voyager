
import styles from "./component-wrapper.module.css";

interface ComponentWrapperProps {
  children: React.ReactNode;
}

export function ComponentWrapper({ children }: ComponentWrapperProps) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}