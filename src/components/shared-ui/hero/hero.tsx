import Image from "next/image";
import styles from "./hero.module.css";
import { StoryblokImage } from "@/types";

interface HeroProps {
  title: string;
  subtitle?: string;
  image: StoryblokImage;
}

export function Hero({ title, subtitle, image }: HeroProps) {
  return (
    <section className={styles.hero}>
      {image?.filename && (
        <Image
          src={image.filename}
          alt={image.alt || title}
          fill
          priority
          className={styles.backgroundImage}
        />
      )}
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}

export default Hero;

