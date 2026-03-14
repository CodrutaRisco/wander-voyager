"use client";

import styles from "./curiosities-card.module.css";
import Image from "next/image";
import { StoryblokImageAndRichText } from "@/types";
import { renderRichText } from "@/lib/rich-text-renderer";

export function CuriositiesCard({ image, text }: StoryblokImageAndRichText) {
  const openModal = () => {
    // Implement your modal opening logic here
    console.log("Open modal with full story");
  };
  return (
    <article className={styles.curiosityCard} onClick={openModal}>
      <div className={styles.curiosityImageContainer}>
        <Image
          src={image[0]?.image?.filename || "/placeholder-image.jpg"}
          alt={image[0]?.image?.alt || "Curiosity Image"}
          fill
          className={styles.curiosityImage}
        />
      </div>
      <div className={styles.curiosityContent}>
        <h3 className={styles.curiositiesTitle}>{image[0]?.title || ""}</h3>
        <div className={styles.curiositiesText}>{renderRichText(text)}</div>
        <p className={styles.readMore}>Read full story</p>
      </div>
    </article>
  );
}
