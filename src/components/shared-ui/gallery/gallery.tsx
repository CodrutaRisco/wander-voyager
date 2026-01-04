import Image from "next/image";
import styles from "./gallery.module.css";

interface GalleryImage {
  _uid: string;
  image: {
    filename: string;
    alt?: string;
  };
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
}

export function Gallery({ images, title }: GalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className={styles.gallery}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.grid}>
        {images.map((item) => (
          <div key={item._uid} className={styles.imageWrapper}>
            <Image
              src={item.image.filename}
              alt={item.image.alt || "Gallery image"}
              fill
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;

