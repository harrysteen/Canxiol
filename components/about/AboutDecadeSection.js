import Image from 'next/image';

const paragraphs = [
  'Canxiol® is the culmination of more than a decade of focused research in cannabinoid science.',
  'The journey has focused on translating the potential of cannabidiol into a precisely designed therapy for patients with anxiety disorders.',
  'Canxiol® is a Cannabidiol Oral Solution 150 mg/mL, formulated with well-characterized, high-quality synthetic cannabidiol manufactured in GMP-compliant API facilities, with a US Drug Master File.',
  'Canxiol® does not use or contain cannabis plant material.',
  'Canxiol® is designed using proprietary nanodispersion technology, which is patented in multiple countries.',
  'Canxiol brings product innovation together with the practical needs of patients and prescribing psychiatrists.',
];

export default function AboutDecadeSection() {
  return (
    <section id="decade-of-science" className="cx-about-decade">
      <div className="container">
        <div className="row cx-about-decade-row">
          {/* Left Column: Eyebrow, headline and story */}
          <div className="col-12 col-lg-6 cx-about-decade-text">
            <span className="cx-about-eyebrow">A decade of science</span>
            <h2 className="cx-about-decade-h2">
              Translating cannabidiol research into Canxiol<sup>®</sup>.
            </h2>
            {paragraphs.map((text) => (
              <p key={text} className="cx-about-decade-p">{text}</p>
            ))}
          </div>

          {/* Right Column: Dropper photo */}
          <div className="col-12 col-lg-6 cx-about-decade-img-col">
            <div className="cx-about-decade-img">
              <Image
                src="/images/A DECADE OF SCIENCE.png"
                alt="Hands holding a Canxiol bottle and dropper"
                fill
                sizes="(max-width: 991px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
