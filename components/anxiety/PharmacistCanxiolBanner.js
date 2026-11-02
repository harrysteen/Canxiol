'use client';
import Image from 'next/image';
import { usePortalRole } from '../auth/portalMode';

// Canxiol product banner, shown only to logged-in pharmacists and psychiatrists (above
// the disclaimer at the bottom of the Treatment page). Public visitors don't see it.
export default function PharmacistCanxiolBanner() {
  if (!usePortalRole()) return null;

  return (
    <div className="cx-pharm-banner">
      <Image
        src="/images/banner1.png"
        alt="Canxiol® Cannabidiol Oral Solution 150 mg/mL: world's first prescription CBD product for the management of mild to moderate anxiety disorders in conjunction with CBT. Easy to use and titrate with no pill burden; not psychoactive, with no known potential for abuse, dependence or addiction; no withdrawal symptoms; about 89% treatment response for anxiety (HAM-A scale); about 60% improvement in depression symptoms (PHQ-9) and sleep quality (PSQI); well tolerated, with no treatment-related discontinuations. Proprietary nanodispersion technology product."
        width={4096}
        height={1437}
        sizes="(max-width: 1400px) 100vw, 1320px"
      />
    </div>
  );
}
