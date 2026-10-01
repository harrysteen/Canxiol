'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useOpenPsychiatristInquiry } from './PsychiatristInquiryProvider';

// Both packs come from a single image; each label sits under its pack.
// `left` is the pack's horizontal centre as a percentage of the image width.
const labels = [
  { text: '14 mL bottle', color: '#EA6C04', left: '25%' },
  { text: '28 mL bottle', color: '#E5045C', left: '61%' },
];

export default function CanxiolPerspectiveSection({ showButtons = false }) {
  const openInquiry = useOpenPsychiatristInquiry();

  return (
    <section className="cx-perspective-section">
      <div className="container">
        {/* Heading */}
        <div className="cx-perspective-header text-center">
          <h2 className="cx-perspective-h2">
            A new perspective<br />
            on anxiety care.
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
              src="/images/A-new-perspective-on-anxiety-care.png"
              alt="Canxiol 14 mL and 28 mL bottles with their packaging"
              fill
              sizes="(max-width: 1100px) 100vw, 1040px"
              className="cx-perspective-img"
            />
          </div>

          <div className="cx-perspective-labels">
            {labels.map((label) => (
              <p
                key={label.text}
                className="cx-bottle-label"
                style={{ color: label.color, left: label.left }}
              >
                {label.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
