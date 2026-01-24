import { Hero } from "../shared-ui";
import type { CountriesHubPageFeatureProps } from "./types";
import styles from "./countries-hub-page.module.css";
import { renderRichText } from "@/lib/rich-text-renderer";
import Image from "next/image";
import { WorldCulture } from "./world-culture/world-culture";

export function CountriesHubPage({ story }: CountriesHubPageFeatureProps) {
  const { content } = story;

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      {content.CountriesHero?.[0] && (
        <Hero
          title={content.CountriesHero[0].title}
          subtitle={content.CountriesHero[0].subtitle}
          image={content.CountriesHero[0].image}
        />
      )}

      {/* Intro Section */}
      {content.intro && (
        <section className={styles.intro}>
          <div className={styles.introContent}>
            {renderRichText(content.intro)}
          </div>
        </section>
      )}

      {/* World Culture Section */}
      {content.worldCulture && content.worldCulture.length > 0 && (
        <section className={styles.worldCulture}>
          <div className={styles.cultureGrid}>
            {content.worldCulture.map((item) => (
            <WorldCulture key={item._uid} {...item} />
            ))}
          </div>
        </section>
      )}

      {/* Countries List Section */}
      {content.countriesList && content.countriesList.length > 0 && (
        <section className={styles.countriesList}>
          <h2 className={styles.sectionTitle}>Explore Countries</h2>
          <div className={styles.countriesGrid}>
            {content.countriesList.map((country) => (
              <article key={country._uid} className={styles.countryCard}>
                <div className={styles.countryImageWrapper}>
                  <Image
                    src={country.image.filename}
                    alt={country.image.alt || country.countrieName}
                    fill
                    className={styles.countryImage}
                  />
                </div>
                <div className={styles.countryInfo}>
                  <h3 className={styles.countryName}>{country.countrieName}</h3>
                  <p className={styles.countrySubtitle}>{country.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Footer Section */}
      {content.countriesFooter && (
        <section className={styles.footer}>
          <div className={styles.footerContent}>
            {renderRichText(content.countriesFooter)}
          </div>
        </section>
      )}
    </div>
  );
}