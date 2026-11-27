import Image from 'next/image';
import { PSY_DOWNLOADS } from '../../components/psychiatrists/psyLinks';
import styles from './leaflet.module.css';

// Opened by the QR code in the "Download Official Document" pop-up (public/images/pil-qr.svg
// → https://canxiol.com/leaflet). The visitor picks a language and the leaflet PDF opens.
// Stays open while canxiol.com shows the coming-soon page (see middleware.js).
export const metadata = {
  title: 'Prescribing Information Leaflet | Canxiol',
  description: 'Choose a language to open the Canxiol Prescribing Information Leaflet (PDF).',
};

export default function LeafletPage() {
  const languages = Object.entries(PSY_DOWNLOADS.pilByLanguage);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <Image
          src="/images/canxiol-logo-trim.png"
          alt="Canxiol"
          width={587}
          height={130}
          priority
          className={styles.logo}
        />
        <span className={styles.tagline}>Care. Knowledge. Connection.</span>

        <h1 className={styles.title}>Prescribing Information Leaflet</h1>
        <p className={styles.text}>Choose your language to open the leaflet (PDF).</p>

        <ul className={styles.langs}>
          {languages.map(([lang, href]) => (
            <li key={lang}>
              <a href={encodeURI(href)} className={styles.lang} target="_blank" rel="noopener noreferrer">
                <span>{lang}</span>
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
                  <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <p className={styles.foot}>Patient access requires no login.</p>
      </div>
    </main>
  );
}
