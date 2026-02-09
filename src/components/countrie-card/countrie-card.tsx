import styles from "./countrie-card.module.css";
import Image from "next/image";
import { CountrieCardBlock } from "../countries-hub/types";


export function CountrieCard({ countrieName, subtitle, image }: CountrieCardBlock) {
  return (
    <article className={styles.countryCard}>
      <div className={styles.countryImageWrapper}>
        <Image
          src={image.filename}
          alt={image.alt || countrieName}
          fill
          className={styles.countryImage}
        />
      </div>
      <div className={styles.countryInfo}>
        <h3 className={styles.countryName}>{countrieName}</h3>
        <p className={styles.countrySubtitle}>{subtitle}</p>
      </div>
    </article>
  );
}