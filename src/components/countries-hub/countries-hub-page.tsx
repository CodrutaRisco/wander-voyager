import { Hero } from "../shared-ui";
import type { CountriesHubPageFeatureProps } from "./types";
import styles from "./countries-hub-page.module.css";
import { renderRichText } from "@/lib/rich-text-renderer";
import Image from "next/image";
import { WorldCulture } from "./world-culture/world-culture";
import { ComponentWrapper } from "@/components/shared-ui";
export function CountriesHubPage({ story }: CountriesHubPageFeatureProps) {
  const { content } = story;

  const heroCountriesHub = content.CountriesHero?.[0];
  const introCountriesHub = content.intro;
  const worldCultureCountriesHub = content.worldCulture;
  const countriesListCountriesHub = content.countriesList;
  const countriesFooterCountriesHub = content.countriesFooter;

  return (
    <>
      {/* Hero Section */}
      {heroCountriesHub  && (
        <Hero
          title={content.CountriesHero[0].title}
          subtitle={content.CountriesHero[0].subtitle}
          image={content.CountriesHero[0].image}
        />
      )}
 <ComponentWrapper>
      {/* Intro Section */}
      {introCountriesHub && (
        <section className={styles.intro}>
          <div className={styles.introContent}>
            {renderRichText(content.intro)}
          </div>
        </section>
      )}

      {/* World Culture Section */}
      {worldCultureCountriesHub && worldCultureCountriesHub.length > 0 && (
        <section className={styles.worldCulture}>
          <div className={styles.cultureGrid}>
            {worldCultureCountriesHub.map((item) => (
            <WorldCulture key={item._uid} {...item} />
            ))}
          </div>
        </section>
      )}

      {/* Countries List Section */}
      {countriesListCountriesHub && countriesListCountriesHub.length > 0 && (
        <section className={styles.countriesList}>
          <h2 className={styles.sectionTitle}>Explore Countries</h2>
          <div className={styles.countriesGrid}>
            {countriesListCountriesHub.map((country) => (
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
      {countriesFooterCountriesHub && (
        <section className={styles.footer}>
          <div className={styles.footerContent}>
            {renderRichText(countriesFooterCountriesHub)}
          </div>
        </section>
      )}
    </ComponentWrapper>
    </>
  );
}