import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';

async function fetchData() {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get('cdn/stories/homepage', {
    version: 'draft',
  });
}

export default async function Home() {
  const { data } = await fetchData();

  return <StoryblokStory story={data.story} />;
}
