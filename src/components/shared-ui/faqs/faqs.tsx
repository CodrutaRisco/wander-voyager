"use client";

import styles from "./faqs.module.css";
import { renderRichText } from "@/lib/rich-text-renderer";
import { TileAndRichTextBlock } from "@/types";
import { useState } from "react";

export function FAQs({ faqs }: { faqs: TileAndRichTextBlock[] }) {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggleFAQ = (uid: string) => {
    setOpenFAQ(openFAQ === uid ? null : uid);
  };

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
      <div className={styles.faqGrid}>
        {faqs.map((faqItem) => {
          const isOpen = openFAQ === faqItem._uid;
          return (
            <div key={faqItem._uid} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(faqItem._uid)}
                aria-expanded={isOpen}
                data-open={isOpen}
              >
                <span>{faqItem.title}</span>
              </button>
              <div
                className={`${styles.faqAnswer} ${isOpen ? styles.faqAnswerOpen : ""}`}
              >
                <div className={styles.faqContent}>
                  {renderRichText(faqItem.richText)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQs;
