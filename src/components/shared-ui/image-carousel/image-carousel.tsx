"use client";
import Image from "next/image";
import styles from "./image-carousel.module.css";
import { useMemo, useState } from "react";

interface GalleryImage {
  _uid: string;
  image: {
    filename: string;
    alt?: string;
  };
  title?: string;
}

interface ImageCarouselProps {
    images: GalleryImage[];
    defaultVisible?: number;
    showDots?: boolean;
    showArrows?: boolean;
}


export function ImageCarousel({ images, defaultVisible = 0,
    showDots = true,
    showArrows = true, }: ImageCarouselProps) {
        const slides = useMemo(() => (Array.isArray(images) ? images : []), [images]);
        const count = slides.length;
        const [index, setIndex] = useState(() => {
            if (count === 0) return 0;
            return Math.min(Math.max(defaultVisible, 0), count - 1);
          });
        
          if (count === 0) return null;

          const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);
        
  return (
    <div className={styles.carousel} aria-label="Image carousel">
      <div className={styles.scene}>
        {showArrows && (
          <button className={`${styles.nav} ${styles.left}`} onClick={prev} aria-label="Previous">
            <span className={styles.icon}>◄</span>
          </button>
        )}

        <div className={styles.viewport}>
          <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }}>
            {slides.map((item) => (
              <div key={item._uid} className={styles.slide}>
                <Image
                  src={item.image.filename}
                  alt={item.image.alt || item.title || "Gallery image"}
                  fill
                  className={styles.image}
                  sizes="(max-width: 900px) 100vw, 900px"
                />
              </div>
            ))}
          </div>
        </div>

        {showArrows && (
          <button className={`${styles.nav} ${styles.right}`} onClick={next} aria-label="Next">
            <span className={styles.icon}>►</span>
          </button>
        )}
      </div>

      {showDots && (
        <div className={styles.dots} aria-label="Carousel pagination">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}