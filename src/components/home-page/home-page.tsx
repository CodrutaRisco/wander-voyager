import styles from "./home-page.module.css";
import type { HomePageFeatureProps } from "./types";
import { renderRichText } from "@/lib/rich-text-renderer";
import { Hero, Gallery, Video } from "@/components/shared-ui";

export function HomePage({ story }: HomePageFeatureProps) {
  const { content } = story;

  // Test - verify data is arriving
 const introText = renderRichText(content.intro?.[0]?.richText);
 const introTitle = content.intro?.[0]?.title;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Hero Section */}
        {content.hero?.[0] && (
          <Hero
            title={content.hero[0].title}
            subtitle={content.hero[0].subtitle}
            image={content.hero[0].image}
          />
        )}

        {/* Intro Section - RichText */}
        {content.intro?.[0] && (
          <section className={styles.section}>
            <h2>{introTitle}</h2>
            {introText}
          </section>
        )}

        {/* Gallery/Carousel Section */}
        {content.carusel?.[0] && <Gallery images={content.carusel[0].images} />}

        {/* Video Section */}
        {content.videoComponent?.[0] && (
          <Video
            title={content.videoComponent[0].title}
            subtitle={content.videoComponent[0].subtitle}
            video={content.videoComponent[0].video}
            image={content.videoComponent[0].image}
            description={content.videoComponent[0].description}
          />
        )}

        <div className={styles.ctas}></div>
      </main>
    </div>
  );
}
