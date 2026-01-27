import { WorldCultureBlock } from "../types";
import Image from "next/image";
import { renderRichText } from "@/lib/rich-text-renderer";
import styles from "./world-culture.module.css";

export function WorldCulture({ title, subtitle, icon, text }: WorldCultureBlock) {
  return (
    <article className={styles.cultureCard}>
    <div className={styles.cultureIcon}>
      <Image
        src={icon.filename}
        alt={icon.alt || title}
        width={120}
        height={120}
      />
    </div>
    <h3 className={styles.cultureTitle}>{title}</h3>
    <p className={styles.cultureSubtitle}>{subtitle}</p>
    <div className={styles.cultureText}>
      {renderRichText(text)}
    </div>
  </article>
  );
}   