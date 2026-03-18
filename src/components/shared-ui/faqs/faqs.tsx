import styles from "./faqs.module.css";
import { renderRichText } from "@/lib/rich-text-renderer";
import { TileAndRichTextBlock } from "@/types";


export function FAQs({ faqs }: { faqs: TileAndRichTextBlock[] }) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
      <div className={styles.faqGrid}>
        {faqs.map((faqItem) => (
          <div key={faqItem._uid} className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>{faqItem.title}</h3>
            <div className={styles.faqAnswer}>
              {renderRichText(faqItem.richText)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQs;