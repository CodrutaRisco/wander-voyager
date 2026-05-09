import { Hero } from "../shared-ui";
import type { CountryPageFeatureProps } from "./types";
import styles from "./country-page.module.css";
import { ComponentWrapper } from "@/components/shared-ui";
import { CuriositiesCard } from "../shared-ui/curiosities-card/curiosities-card";
import { HeroFields } from "./hero-fields/hero-fields";
import { CountryIntro } from "./country-intro/country-intro";
import { FAQs } from "../shared-ui/faqs/faqs";

export function CountryPage({ story }: CountryPageFeatureProps) {
  const { content } = story;

  const heroCountryPage = content.hero?.[0]?.hero?.[0];
  const countryPageHero = content.hero?.[0];
  const countryIntro = content.intro?.[0];
  const countryFaqs = content.facs; // Array de FAQ-uri, nu primul element

  const curiosities = content.curiosities;

  if (!heroCountryPage) {
    return null;
  }

  return (
    <>
      {heroCountryPage && (
        <Hero
          title={heroCountryPage.title}
          subtitle={heroCountryPage.subtitle}
          image={heroCountryPage.image}
        >
          {countryPageHero && (
            <HeroFields
              capital={countryPageHero.capital}
              population={String(countryPageHero.population)}
              currency={countryPageHero.currency}
              climate={countryPageHero.climate}
            />
          )}
        </Hero>
      )}
      <ComponentWrapper>
        {countryIntro && (
          <CountryIntro
            introText={countryIntro.introText}
            language={countryIntro.language}
            timeZone={countryIntro.timeZone}
            phone={countryIntro.phone}
            domain={countryIntro.domain}
          />
        )}

        {/* Curiosities Section */}
        {curiosities.length > 0 && (
          <section className={styles.curiositiesSection}>
            <h2 className={styles.curiositiesTitle}>Curiosities</h2>
            <div className={styles.curiositiesGrid}>
              {curiosities.map((item) => (
                <CuriositiesCard key={item._uid} {...item} />
              ))}
            </div>
          </section>
        )}
        {countryFaqs && countryFaqs.length > 0 && <FAQs faqs={countryFaqs} />}
      </ComponentWrapper>
    </>
  );
}
