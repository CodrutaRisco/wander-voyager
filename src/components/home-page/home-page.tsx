import { getStoryblokApi } from "@/lib/storyblok";
import styles from "./home-page.module.css";

export default function HomePage() {
    const story  = getStoryblokApi();
    console.log(story)
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Hello Wander Voyager</h1>
        </div>
        <div className={styles.ctas}></div>
      </main>
    </div>
  );
}
