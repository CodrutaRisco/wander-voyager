import styles from "./curiosities-card.module.css";
import Image from "next/image";
import { StoryblokImageAndRichText } from "@/types";
import { renderRichText } from "@/lib/rich-text-renderer";

export function CuriositiesCard({ image, text }: StoryblokImageAndRichText) {
  return (
    <article className={styles.curiosityCard}>
      <div className={styles.curiosityImageContainer}>
        <Image
          src={image[0]?.image.filename || "/placeholder-image.jpg"}
          alt={image[0]?.image.alt || "Curiosity Image"}
          fill
          className={styles.curiosityImage}
        />
      </div>
     
        <h3 className={styles.curiositiesTitle}>{image[0]?.title || ""}</h3>
      <div className={styles.curiositiesContent}>
                  {renderRichText(text)}
                </div>
    </article>
  );
}