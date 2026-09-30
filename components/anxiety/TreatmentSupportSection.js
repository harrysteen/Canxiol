import Image from 'next/image';

// TODO: swap for the family-on-the-sofa photo once it is added to /public/images
const SUPPORT_IMAGE = '/images/lifestyle-connections.png';

const pillars = [
  { title: 'Foundational care', desc: 'Sleep, physical activity & balanced daily habits' },
  { title: 'Professional priority', desc: 'Does not substitute clinical psychiatric evaluation' },
];

export default function TreatmentSupportSection() {
  return (
    <section className="cx-treat-support">
      <div className="container">
        <span className="cx-anx-eyebrow">Supportive measures in daily life</span>

        <div className="row cx-treat-support-row">
          {/* Left Column: Photo */}
          <div className="col-12 col-lg-6">
            <div className="cx-treat-support-img">
              <Image
                src={SUPPORT_IMAGE}
                alt="A young woman chatting and smiling with her brother and mother on the sofa at home"
                fill
                sizes="(max-width: 991px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Column: Strategies */}
          <div className="col-12 col-lg-6 cx-treat-support-text">
            <h2 className="cx-anx-h2 cx-treat-support-h2">Supportive strategies in everyday routine.</h2>
            <div className="cx-treat-support-card">
              <p>
                Regular sleep, physical activity, reducing excessive stimulants, and
                stress-management strategies can support treatment, but should not replace
                Psychiatrist&rsquo;s assessment when symptoms are persistent or significantly
                impairing.
              </p>
            </div>
            <div className="cx-treat-support-pillars">
              {pillars.map((p) => (
                <div key={p.title} className="cx-treat-support-pillar">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
