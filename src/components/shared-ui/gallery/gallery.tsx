import Image from "next/image";
import styles from "./gallery.module.css";
import { ImageCarousel } from "../image-carousel/image-carousel";

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
      <ImageCarousel images={images} />
    </section>
  );
}

export default Gallery;

