import Image from 'next/image';
import AnxietyNotes from './AnxietyNotes';

// TODO: swap for the psychiatrist-consultation photo once it is added to /public/images
const VISIT_IMAGE = '/images/treatment-psychiatrist-visit.png';

export default function TreatmentPsychiatristSection() {
  return (
    <section className="cx-treat-visit">
      <div className="container">
        <span className="cx-anx-eyebrow">Making a sensible health decision</span>

        <div className="row cx-treat-visit-row">
          {/* Left Column: Statement */}
          <div className="col-12 col-lg-6">
            <h2 className="cx-treat-visit-h2">
              Visit to a Psychiatrist is as easy as you visit any other healthcare specialist.
              Discussing and seeking help for anxiety from a Psychiatrist is a sensible health
              decision.
            </h2>
            <p className="cx-treat-visit-p">
              Anxiety is a common medical condition with established clinical pathways. Early
              consultation offers clarity, personalized evaluation, and compassionate medical care.
            </p>
          </div>

          {/* Right Column: Photo */}
          <div className="col-12 col-lg-6">
            <div className="cx-treat-visit-img">
              <Image
                src={VISIT_IMAGE}
                alt="A woman talking with her psychiatrist in a calm, homely consultation room"
                fill
                sizes="(max-width: 991px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Last tab: disclaimer and sources, no "Next" link */}
        <AnxietyNotes />
      </div>
    </section>
  );
}
