import Image from 'next/image';
import Link from 'next/link';
import { PSY_DOWNLOADS } from '../psychiatrists/psyLinks';

const cards = [
  {
    title: 'Patient Information Leaflet',
    text: 'Find detailed information about Canxiol and your treatment.',
    icon: '/images/Patient Information Leaflet.png',
    cta: 'Download leaflet',
    href: PSY_DOWNLOADS.pil,
  },
  {
    title: 'Questions About Your Medicine',
    text: 'Speak with your psychiatrist or healthcare professional if you have questions about your dose, treatment or anything you experience.',
    icon: '/images/Questions About Your Medicine.png',
    cta: 'Get support',
    href: '/contact',
  },
  {
    title: 'Report a Side Effect',
    text: 'If you think you have experienced a side effect, speak with your healthcare professional or use the appropriate reporting channel.',
    icon: '/images/Report a Side Effect.png',
    cta: 'Report a side effect',
    href: '#pharmacovigilance',
  },
];

export default function CanxiolQuestionsSection() {
  return (
    <section id="questions" className="cx-cxp-faq">
      <div className="container">
        <h2 className="cx-cxp-faq-h2">
          Have questions about Canxiol<sup>®</sup>?
        </h2>
        <p className="cx-cxp-faq-sub">
          Start with the information that is most useful to you. Your healthcare professional
          can help with questions about your individual treatment.
        </p>

        <ul className="cx-cxp-faq-grid">
          {cards.map((card) => (
            <li key={card.title} className="cx-cxp-faq-card">
              <Image src={card.icon} alt="" width={20} height={20} className="cx-cxp-faq-icon" />
              <h3 className="cx-cxp-faq-title">{card.title}</h3>
              <p className="cx-cxp-faq-text">{card.text}</p>
              <Link href={card.href} className="cx-cxp-faq-link">
                <span>{card.cta}</span>
                <svg width="10" height="9" viewBox="0 0 10 9" fill="none" aria-hidden="true">
                  <path
                    d="M1 4.5h8M5.5 1 9 4.5 5.5 8"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
