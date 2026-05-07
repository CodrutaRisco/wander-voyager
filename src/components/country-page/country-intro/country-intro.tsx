import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import styles from './country-intro.module.css';
import { renderRichText } from '@/lib/rich-text-renderer';
import { QuickDetails } from '../quick-details/quick-details';

interface CountryIntroProps {
  introText: StoryblokRichtext;
  language: string;
  timeZone: string;
  phone: string;
  domain: string;
}

export function CountryIntro({
  introText,
  language,
  timeZone,
  phone,
  domain,
}: CountryIntroProps) {
  return (
    <section className={styles.introSection}>
      <div className={styles.intro}>
        <h2 className={styles.introTitle}>Introduction</h2>
        <div>{renderRichText(introText)}</div>
      </div>
      <QuickDetails
        language={language}
        time={timeZone}
        phone={phone}
        domain={domain}
      />
    </section>
  );
}

