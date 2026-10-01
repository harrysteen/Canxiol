import Image from 'next/image';

const paragraphs = [
  'Canxiol® should be administered at the dose prescribed by your psychiatrist.',
  'Administer the dose at consistent time with respect to meals preferably 30 minutes after food.',
  'It is recommended to use a calibrated measuring dropper provided along with the pack to measure and deliver the prescribed dose accurately. A household teaspoon or tablespoon is not an adequate measuring device.',
  'Measure the prescribed dose of Canxiol® into the calibrated dropper and add the measured dose to about 150 mL of water. Stir rapidly for at least 10 seconds using a spoon or stirrer and immediately administer the dose orally.',
];

export default function CanxiolDoseTimingSection() {
  return (
    <section id="dose-timing" className="cx-cxp-dose">
      <div className="container">
        <h2 className="cx-cxp-dose-h2">
          When should you take Canxiol<sup>®</sup>?
        </h2>
        <p className="cx-cxp-dose-sub">
          Take your prescribed dose at a consistent time in relation to meals, preferably 30
          minutes after food.
        </p>

        <div className="row cx-cxp-dose-row">
          {/* Left Column: Dosing guidance */}
          <div className="col-12 col-lg-6 cx-cxp-dose-text">
            {paragraphs.map((text) => (
              <p key={text} className="cx-cxp-dose-p">{text}</p>
            ))}
          </div>

          {/* Right Column: Photo with caption note */}
          <div className="col-12 col-lg-6">
            <figure className="cx-cxp-dose-figure">
              <div className="cx-cxp-dose-img">
                <Image
                  src="/images/When should you take Canxiol.png"
                  alt="Two friends chatting and smiling outdoors"
                  fill
                  sizes="(max-width: 991px) 100vw, 50vw"
                />
              </div>
              <figcaption className="cx-cxp-dose-note">
                Do not change your dose or how you take Canxiol unless your psychiatrist advises
                you to do so.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
