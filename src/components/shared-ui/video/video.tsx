import Image from "next/image";
import styles from "./video.module.css";
import { renderRichText } from "@/lib/rich-text-renderer";

interface VideoProps {
  title: string;
  subtitle?: string;
  video?: {
    filename: string;
  };
  image?: {
    filename: string;
    alt?: string;
  };
  description?: unknown;
}

export function Video({ title, subtitle, video, image, description }: VideoProps) {
  const descriptionContent = description ? renderRichText(description) : null;

  return (
    <section className={styles.videoSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.content}>
        {/* Video or Thumbnail */}
        <div className={styles.mediaWrapper}>
          {video?.filename ? (
            <video
              className={styles.video}
              controls
              poster={image?.filename}
            >
              <source src={video.filename} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : image?.filename ? (
            <Image
              src={image.filename}
              alt={image.alt || title}
              fill
              className={styles.thumbnail}
            />
          ) : null}
        </div>

        {/* Description */}
        {descriptionContent && (
          <div className={styles.description}>
            {descriptionContent}
          </div>
        )}
      </div>
    </section>
  );
}

export default Video;

