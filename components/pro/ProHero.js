'use client';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedGradientBg from '../AnimatedGradientBg';
import { useOpenPsychiatristInquiry } from '../PsychiatristInquiryProvider';

// "Heal The way You Feel" hero with the bottle-in-hand photo — the earlier home hero,
// now shown in the pharmacist portal. The 4-column info bar sits below it (pinned).
export default function ProHero({ role }) {
  const openInquiry = useOpenPsychiatristInquiry();
  const isPsychiatrist = role === 'psychiatrist';

  return (
    <section className="cx-hero-wrapper cx-hero-wrapper--pro">
      <AnimatedGradientBg speed={0.5} direction={0} distortion={0.15} scale={1.5} />
      <div className="cx-hero-vignette" />

      <div className="cx-hero-main">
        <div className="container">
          <div className="row align-items-end g-4">
            <div className="col-12 col-lg-6 col-xl-6 cx-hero-left">
              <h1 className="cx-hero-h1">
                <span className="cx-hl">Heal</span> The way<br />
                You <span className="cx-hl">Feel</span>
              </h1>

              <p className="cx-hero-p">
                Prescription Only medicine. Use only as directed by Psychiatrist
              </p>

              <div className="cx-hero-btns">
                <Link href="/canxiol" className="cx-btn-discover">
                  <span>DISCOVER CANXIOL</span>
                  <Image src="/images/contact-us-arrow.png" alt="" width={14} height={14} className="cx-btn-discover-arrow" />
                </Link>
                <Link
                  href={isPsychiatrist ? '/psychiatrists' : '#psychiatrists'}
                  className="cx-btn-hero-psychiatrists"
                  onClick={isPsychiatrist ? undefined : openInquiry}
                >
                  <span>FOR PSYCHIATRISTS</span>
                  <Image src="/images/for-psychiatrists-arrow.png" alt="" width={14} height={14} className="cx-hero-arrow-icon" />
                </Link>
              </div>
            </div>

            <div className="col-12 col-lg-6 col-xl-6 cx-hero-img-col">
              <div className="cx-img-wrapper cx-img-wrapper--pro">
                <Image
                  src="/images/canxiol_bottle_hand.png"
                  alt="Canxiol Cannabidiol Oral Solution 150mg/mL held in hand"
                  fill
                  priority
                  sizes="(max-width: 576px) 100vw, (max-width: 992px) 500px, 680px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
