import styles from "./home-page.module.css";
import type { HomePageFeatureProps } from "./types";
import { renderRichText } from "@/lib/rich-text-renderer";

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
        <div className={styles.intro}>
          <h1>{content.hero?.[0]?.title || "Hello Wander Voyager"}</h1>
          {content.hero?.[0]?.subtitle && <p>{content.hero[0].subtitle}</p>}
        </div>

        {/* Intro Section - RichText */}
        <section>{introText}</section>

        {/* Country Description Section - RichText */}
        {content.descriereTara?.[0] && (
          <section>
            <h2>{countryDescriptionTitle}</h2>
            {countryDescriptionText}
          </section>
        )}

        <div className={styles.ctas}></div>
      </main>
    </div>
  );
}
