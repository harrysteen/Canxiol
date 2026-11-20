'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useOpenPsychiatristInquiry } from './PsychiatristInquiryProvider';

// Both packs, with their "14 mL bottle" / "28 mL bottle" labels, come from a single image.
export default function CanxiolPerspectiveSection({ showButtons = false }) {
  const openInquiry = useOpenPsychiatristInquiry();

  return (
    <section className="cx-perspective-section">
      <div className="container">
        {/* Heading */}
        <div className="cx-perspective-header text-center">
          <h2 className="cx-perspective-h2">
            Rethinking Anxiety Care:<br />
            A New Perspective.
          </h2>

          {showButtons && (
            <div className="cx-hero-btns cx-perspective-btns">
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
              <Link href="#psychiatrists" className="cx-btn-hero-psychiatrists" onClick={openInquiry}>
                <span>FOR PSYCHIATRISTS</span>
                <Image
                  src="/images/for-psychiatrists-arrow.png"
                  alt=""
                  width={14}
                  height={14}
                  className="cx-hero-arrow-icon"
                />
              </Link>
            </div>
          )}
        </div>

        <div className="cx-perspective-packs">
          <div className="cx-perspective-img-wrap">
            <Image
              src="/images/14mland28ml-bottle.png"
              alt="Canxiol 14 mL bottle and 28 mL bottle, each shown with its pack"
              fill
              sizes="(max-width: 1100px) 100vw, 1040px"
              className="cx-perspective-img"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
