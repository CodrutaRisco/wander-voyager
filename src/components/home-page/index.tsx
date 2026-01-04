import { getHomePageStory } from "./get-story-data";
import { HomePage } from "./home-page";

export async function HomePageFeature() {
  const story = await getHomePageStory();
  return <HomePage story={story} />;
}

export { HomePage } from "./home-page";
export { getHomePageStory } from "./get-story-data";
export type { HomePageFeatureProps, HomePageStory } from "./types";


