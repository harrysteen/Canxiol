import Image from 'next/image';

// Full-width Canxiol product banner between Storage and "Have questions about Canxiol?"
export default function CanxiolBannerSection() {
  return (
    <section className="cx-cxp-banner">
      <div className="container">
        <Image
          src="/images/banner2.png"
          alt="Heal The Way You Feel. Canxiol® Cannabidiol Oral Solution 150 mg/mL: world's first prescription CBD product for the management of mild to moderate anxiety disorders in conjunction with CBT. Easy to use and titrate with no pill burden; not psychoactive, with no known potential for abuse, dependence or addiction; no withdrawal symptoms; about 89% treatment response for anxiety (HAM-A scale); about 60% improvement in depression symptoms (PHQ-9) and sleep quality (PSQI); well tolerated, with no treatment-related discontinuations. Proprietary nanodispersion technology product."
          width={2896}
          height={1222}
          sizes="(max-width: 1400px) 100vw, 1320px"
          className="cx-cxp-banner-img"
        />
      </div>
    </section>
  );
}
