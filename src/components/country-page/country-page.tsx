import { Hero } from "../shared-ui";
import type { CountryPageFeatureProps } from "./types";
import heroFields from "./utils";

export function CountryPage({ story }: CountryPageFeatureProps) {
  const { content } = story; 

  const heroCountryPage = content.hero?.[0]?.hero?.[0];
  const countryPageHero = content.hero?.[0]; 

  if (!heroCountryPage) {
    return null;
  }

  return (
    <>
    {heroCountryPage && ( <Hero
        title={heroCountryPage.title}
        subtitle={heroCountryPage.subtitle}
        image={heroCountryPage.image}
      >
        {countryPageHero && heroFields(
          countryPageHero.capital,
          String(countryPageHero.population),
          countryPageHero.currency,
          countryPageHero.language
        )}
      </Hero>
    )}
    </>
    
  );
}
