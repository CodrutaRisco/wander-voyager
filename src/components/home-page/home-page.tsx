import styles from "./home-page.module.css";
import type { HomePageFeatureProps } from "./types";
import { renderRichText } from "@/lib/rich-text-renderer";
import { Hero, Gallery, Video } from "@/components/shared-ui";

export function HomePage({ story }: HomePageFeatureProps) {
  const { content } = story;

  // Test - verify data is arriving
  console.log("Story name:", story.name);
  console.log("Hero title:", content.hero?.[0]?.title);
  console.log("content", content);

  const introText = renderRichText(content.intro);
  const countryDescriptionTitle = content.descriereTara?.[0]?.title;
  const countryDescriptionText = renderRichText(
    content.descriereTara?.[0]?.richText
  );

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
        <section className={styles.section}>{introText}</section>

        {/* Country Description Section - RichText */}
        {content.descriereTara?.[0] && (
          <section className={styles.section}>
            <h2>{countryDescriptionTitle}</h2>
            {countryDescriptionText}
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
