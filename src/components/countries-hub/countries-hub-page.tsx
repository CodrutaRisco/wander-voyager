import Link from "next/link";
import { Hero } from "../shared-ui";
import type { CountriesHubPageFeatureProps } from "./types";
import styles from "./countries-hub-page.module.css";
import { renderRichText } from "@/lib/rich-text-renderer";
import { CountrieCard } from "../countrie-card/countrie-card";
import { WorldCulture } from "./world-culture/world-culture";
import { ComponentWrapper } from "@/components/shared-ui";

function getCountrySlug(country: { countrieName: string; slug?: string }): string {
  if (country.slug) return country.slug;
  return country.countrieName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}


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
      {heroCountriesHub && (
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
            {worldCultureCountriesHub.map((item) => (
              <WorldCulture
                key={item._uid}
                {...item}
                component="WorldCulture"
              />
            ))}
          </section>
        )}

        {/* Countries List Section */}
        {countriesListCountriesHub && countriesListCountriesHub.length > 0 && (
          <section className={styles.countriesList}>
            <h2 className={styles.sectionTitle}>Explore Countries</h2>
            <div className={styles.countriesGrid}>
              {countriesListCountriesHub.map((country) => (
                <Link
                  key={country._uid}
                  href={`/countries/${getCountrySlug(country)}`}
                  className={styles.countryCardLink}
                >
                  <CountrieCard {...country} />
                </Link>
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