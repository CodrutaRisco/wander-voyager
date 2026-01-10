import Image from "next/image";
import styles from "./video.module.css";
import { renderRichText } from "@/lib/rich-text-renderer";

interface VideoProps {
  title: string;
  subtitle?: string;
  video?: {
    url?: string;
    cached_url?: string;
    filename?: string;
  };
  image?: {
    filename: string;
    alt?: string;
  };
  description?: unknown;
}

// Extract video ID from Vimeo or YouTube URL
function getEmbedUrl(url: string): string | null {
  // Vimeo: https://vimeo.com/1152897368
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  // YouTube: https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID
  const youtubeMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  return null;
}

export function Video({
  title,
  subtitle,
  video,
  image,
  description,
}: VideoProps) {
  const descriptionContent = description ? renderRichText(description) : null;

  // Get video URL from link or asset
  const videoUrl = video?.url || video?.cached_url || video?.filename || "";
  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;

  return (
    <section className={styles.videoSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.content}>
        {/* Video or Thumbnail */}
        <div className={styles.mediaWrapper}>
          {embedUrl ? (
            // Vimeo/YouTube embed
            <iframe
              src={embedUrl}
              className={styles.iframe}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={title}
            />
          ) : video?.filename ? (
            // Direct video file
            <video className={styles.video} controls poster={image?.filename}>
              <source src={video.filename} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : image?.filename ? (
            // Fallback to thumbnail
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
          <div className={styles.description}>{descriptionContent}</div>
        )}
      </div>
    </section>
  );
}

export default Video;
