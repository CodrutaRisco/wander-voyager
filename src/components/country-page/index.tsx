import { getCountryPageStory } from "./get-story-data";
import { CountryPage } from "./country-page";

export interface CountryPageFeatureParams {
  country: string;
}

export async function CountryPageFeature({ country }: CountryPageFeatureParams) {
  const story = await getCountryPageStory(country);
  return <CountryPage story={story} />;
}

export { CountryPage } from "./country-page";
export { getCountryPageStory } from "./get-story-data";
export type { CountryPageStory, CountryPageFeatureProps } from "./types";
