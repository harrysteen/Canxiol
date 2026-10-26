import Image from 'next/image';
import Link from 'next/link';

const PATHS = [
  {
    audience: 'For Patients',
    title: <>Understand Anxiety<br />&amp; its effects</>,
    desc: 'Learn about anxiety, its effects, and ways to seek appropriate support.',
    href: '/anxiety',
  },
  {
    audience: 'For Pharmacists',
    title: <>Explore Anxiety and<br />Treatment Perspectives</>,
    desc: 'Access information about anxiety and relevant treatment perspectives.',
    // Portal login (links on to sign-up); a logged-in pharmacist goes straight to their portal
    href: '/pharmacist/login',
  },
  {
    audience: 'For Psychiatrists',
    title: <>Explore the Science and<br />Treatment Information</>,
    desc: 'Explore professional insights on anxiety and prescription cannabidiol treatment.',
    href: '/psychiatrist/login',
  },
];

export default function CanxiolChoosePathSection() {
  return (
    <section className="cx-path-section">
      <div className="container">
        <h2 className="cx-path-h2">Choose Your Path</h2>

        <div className="cx-path-grid">
          {PATHS.map((p) => (
            <div key={p.audience} className="cx-path-card">
              <span className="cx-path-eyebrow">{p.audience}</span>
              <h3 className="cx-path-title">{p.title}</h3>
              <p className="cx-path-desc">{p.desc}</p>
              <Link href={p.href} className="cx-path-btn">
                <span>KNOW MORE</span>
                <Image
                  src="/images/for-psychiatrists-arrow.png"
                  alt=""
                  width={12}
                  height={12}
                  className="cx-path-btn-arrow"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
