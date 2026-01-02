import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import { HomePage } from '@/components/storyblok';

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: 'eu',
  },
  components: {
    homePage: HomePage,
  },
});