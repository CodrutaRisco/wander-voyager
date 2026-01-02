import { storyblokEditable, StoryblokServerComponent } from '@storyblok/react/rsc';
import { render } from 'storyblok-rich-text-react-renderer';

interface HomePageBlok {
  hero: Array<unknown>;
  intro: unknown;
  descriereTara: Array<unknown>;
  carusel: Array<unknown>;
  videoComponent: Array<unknown>;
}

interface HomePageProps {
  blok: HomePageBlok;
}

const HomePage = ({ blok }: HomePageProps) => {
  return (
    <div {...storyblokEditable(blok)}>
      {/* Hero Section - placeholder pentru acum */}
      <section style={{ padding: '20px', background: '#f0f0f0', marginBottom: '20px' }}>
        <p>🎯 Hero Section (placeholder)</p>
        {blok.hero?.map((nestedBlok: any) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </section>

      {/* Intro - Richtext */}
      <section style={{ padding: '20px', marginBottom: '20px' }}>
        <h2>Intro</h2>
        <div>{render(blok.intro)}</div>
      </section>

      {/* Descriere Tara - placeholder */}
      <section style={{ padding: '20px', background: '#f5f5f5', marginBottom: '20px' }}>
        <p>🌍 Descriere Tara (placeholder)</p>
        {blok.descriereTara?.map((nestedBlok: any) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </section>

      {/* Carusel - placeholder */}
      <section style={{ padding: '20px', background: '#f0f0f0', marginBottom: '20px' }}>
        <p>🎠 Carusel (placeholder)</p>
        {blok.carusel?.map((nestedBlok: any) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </section>

      {/* Video Component - placeholder */}
      <section style={{ padding: '20px', background: '#f5f5f5', marginBottom: '20px' }}>
        <p>🎬 Video Component (placeholder)</p>
        {blok.videoComponent?.map((nestedBlok: any) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </section>
    </div>
  );
};

export default HomePage;

