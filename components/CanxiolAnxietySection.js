'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function CanxiolAnxietySection() {
  return (
    <>
      <section id="anxiety" className="cx-anxiety-section">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            
            {/* Left Column: Heading, Paragraph, and CTA */}
            <div className="col-12 col-lg-6">
              <div className="cx-anxiety-left">
                <h2 className="cx-anxiety-h2">
                  Anxiety affects<br />
                  more than the<br />
                  mind.
                </h2>

                <p className="cx-anxiety-desc">
                  Anxiety can influence mood, sleep, concentration, relationships
                  and day-to-day functioning. For millions living with anxiety, finding
                  an effective and well-tolerated approach to care remains an
                  important need.
                </p>

                <Link href="#anxiety-effects" className="cx-btn-anxiety">
                  <span>EXPLORE ANXIETY &amp; ITS EFFECTS</span>
                  <Image
                    src="/images/contact-us-arrow.png"
                    alt=""
                    width={14}
                    height={14}
                    className="cx-btn-anxiety-arrow"
                  />
                </Link>
              </div>
            </div>

            {/* Right Column: Lifestyle Image & Caption */}
            <div className="col-12 col-lg-6">
              <div className="cx-anxiety-right">
                <div className="cx-anxiety-img-box">
                  <Image
                    src="/images/anxiety-lifestyle.png"
                    alt="Woman smiling calmly while stretching her arm on a leafy city walkway"
                    fill
                    sizes="(max-width: 991px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
                  />
                </div>
                <p className="cx-anxiety-caption">
                  Understanding anxiety is the first step towards better care.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
