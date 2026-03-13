import { renderRichText } from "@/lib/rich-text-renderer";
import { Hero } from "../shared-ui";
import type { CountryPageFeatureProps } from "./types";
import styles from "./country-page.module.css";
import { ComponentWrapper } from "@/components/shared-ui";
import { CuriositiesCard } from "../shared-ui/curiosities-card/curiosities-card";
import { QuickDetails } from "./quick-details/quick-details";
import { HeroFields } from "./hero-fields/hero-fields";

export function CountryPage({ story }: CountryPageFeatureProps) {
  const { content } = story;

  const heroCountryPage = content.hero?.[0]?.hero?.[0];
  const countryPageHero = content.hero?.[0];

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
              language={countryPageHero.language}
            />
          )}
        </Hero>
      )}
      <ComponentWrapper>
        {(content.intro?.[0] || content.details) && (
          <section className={styles.introSection}>
            {content.intro?.[0] && (
              <div className={styles.intro}>
                {content.intro[0].title && (
                  <h2 className={styles.introTitle}>
                    {content.intro[0].title}
                  </h2>
                )}
                <div className={styles.introContent}>
                  {renderRichText(content.intro[0].richText)}
                </div>
              </div>
            )}
            <QuickDetails
              details={content.details}
              language={content.language ?? content.Language ?? ""}
              time={content.time}
              phone={content.phone}
              domain={content.domain}
            />
          </section>
        )}

        {/* Curiosities Section */}
        {curiosities.length > 0 && (
          <section className={styles.curiositiesSection}>
            <div className={styles.curiositiesGrid}>
              {curiosities.map((item) => (
                <CuriositiesCard key={item._uid} {...item} />
              ))}
            </div>
          </section>
        )}
      </ComponentWrapper>
    </>
  );
}
