import Image from 'next/image';
import Link from 'next/link';

export default function AboutHealSection() {
  return (
    <section id="heal-the-way" className="cx-about-heal">
      <div className="container">
        <div className="row cx-about-heal-row">
          {/* Left Column: Headline and milestone line */}
          <div className="col-12 col-lg-5 cx-about-heal-left">
            <h2 className="cx-about-heal-h2">
              <strong>Heal</strong> the way<br />
              you <strong>Feel</strong>.
            </h2>
            <p className="cx-about-heal-note">
              the result bringing Science &amp; Patient SMILE together is a significant
              milestone in cannabinoid therapeutics
            </p>
          </div>

          {/* Right Column: Canxiol statement and CTA */}
          <div className="col-12 col-lg-7 cx-about-heal-right">
            <p className="cx-about-heal-lead">
              Canxiol is the world’s first approved psychiatrist-only prescription CBD product
              for the treatment of mild to moderate anxiety disorders, in conjunction with
              Cognitive Behavioral Therapy (CBT).
            </p>
            <p className="cx-about-heal-p">
              A decade of research. A purposeful innovation. A therapy centred on the patient
              &amp; the prescribing psychiatrist.
            </p>
            <Link href="/canxiol" className="cx-btn-discover">
              <span>EXPLORE CANXIOL</span>
              <Image
                src="/images/contact-us-arrow.png"
                alt=""
                width={14}
                height={14}
                className="cx-btn-discover-arrow"
              />
            </Link>
          </div>
        </div>

        {/* Full-width banner photo */}
        <div className="cx-about-heal-img">
          <Image
            src="/images/Heal the way.png"
            alt="Woman sitting calmly on a park bench with her eyes closed"
            fill
            sizes="(max-width: 1400px) 100vw, 1320px"
          />
        </div>
      </div>
    </section>
  );
}
