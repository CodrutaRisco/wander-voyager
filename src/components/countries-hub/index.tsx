import { getCountriesHubPageStory } from "./get-story-data";
import { CountriesHubPage } from "./countries-hub-page";

export async function CountriesHubPageFeature() {
  const story = await getCountriesHubPageStory();
  return <CountriesHubPage story={story} />;
}

export { CountriesHubPage } from "./countries-hub-page";
export { getCountriesHubPageStory } from "./get-story-data";
export type { CountriesHubPageFeatureProps, CountriesHubPageStory } from "./types";