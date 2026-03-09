import { renderRichText } from "@/lib/rich-text-renderer";
import { Hero } from "../shared-ui";
import type { CountryPageFeatureProps } from "./types";
import { heroFields, quickDetailsFields } from "./utils";
import styles from "./country-page.module.css";
import { ComponentWrapper } from "@/components/shared-ui";

export function CountryPage({ story }: CountryPageFeatureProps) {
  const { content } = story;

  const heroCountryPage = content.hero?.[0]?.hero?.[0];
  const countryPageHero = content.hero?.[0];

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
          {countryPageHero &&
            heroFields(
              countryPageHero.capital,
              String(countryPageHero.population),
              countryPageHero.currency,
              countryPageHero.language,
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
            {(content.details ||
              content.language ||
              content.Language ||
              content.time ||
              content.phone ||
              content.domain) &&
              quickDetailsFields(
                content.details,
                content.language ?? content.Language ?? "",
                content.time,
                content.phone,
                content.domain,
              )}
          </section>
        )}
      </ComponentWrapper>
    </>
  );
}
