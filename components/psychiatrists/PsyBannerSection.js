import Image from 'next/image';
import { PSY_IMAGES } from './psyImages';

// Full-width Canxiol campaign banner between Pharmacokinetics and the PIL download
export default function PsyBannerSection() {
  return (
    <section className="cx-psy-banner">
      <div className="container">
        <Image
          src={PSY_IMAGES.banner}
          alt="Canxiol cannabidiol oral solution 150 mg/mL — Heal the way you feel. World's first prescription CBD product approved for mild to moderate anxiety disorders in conjunction with CBT."
          width={2400}
          height={1329}
          sizes="(max-width: 1400px) 100vw, 1300px"
          className="cx-psy-banner-img"
        />
      </div>
    </section>
  );
}
