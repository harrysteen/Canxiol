import Image from 'next/image';
import styles from './coming-soon.module.css';

export const metadata = {
  title: 'Canxiol — Coming Soon | Leiutis',
  description: 'The new Canxiol website is on its way.',
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <Image
          src="/images/logo.png"
          alt="Canxiol By Leiutis"
          width={220}
          height={110}
          priority
          className={styles.logo}
        />
        <span className={styles.label}>Coming soon</span>
        <h1 className={styles.title}>
          Heal <span className={styles.titleLight}>the way you</span> Feel
        </h1>
        <p className={styles.text}>
          Our new website is on its way. Please check back soon.
        </p>
      </div>
    </main>
  );
}
