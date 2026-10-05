import Image from 'next/image';

// TODO: swap for the doctor-consultation photo once it is added to /public/images
const CONSULT_IMAGE = '/images/when to seek help img3.png';

export default function SeekProfessionalSection() {
  return (
    <section className="cx-seek-pro">
      <div className="container">
        {/* GAD callout */}
        <div className="cx-seek-callout">
          <span className="cx-seek-callout-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4.75V8l2.25 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="cx-seek-callout-text">
            The symptoms and their pattern can vary depending on the type of anxiety disorder. For
            example, <span className="cx-seek-callout-hl">Generalized Anxiety Disorder (GAD)</span>{' '}
            which is characterized by excessive anxiety and worry about a number of activities or
            events that are present more days than not for <strong>&ge; 6 months</strong>.
          </p>
        </div>

        <div className="row cx-seek-pro-row">
          {/* Left Column: When to seek help */}
          <div className="col-12 col-lg-6">
            <span className="cx-anx-eyebrow">Timely intervention</span>
            <h2 className="cx-anx-h2 cx-seek-pro-h2">When should you seek professional help?</h2>
            <p className="cx-seek-pro-lead">
              Anxiety disorders are real health conditions that can affect both mind and body.
              You do not need to wait for a crisis.
            </p>
            <p className="cx-seek-pro-p">
              Consider it a concern, if anxiety has persisted for weeks or months, is worsening or
              difficult to control, repeatedly disrupts sleep, affects concentration or
              performance, interferes with relationships, causes avoidance of normal activities,
              produces recurring panic attacks, or substantially reduces quality of life.
            </p>
          </div>

          {/* Right Column: Photo */}
          <div className="col-12 col-lg-6">
            <div className="cx-seek-pro-img">
              <Image
                src={CONSULT_IMAGE}
                alt="Young woman listening as a doctor explains notes during a consultation"
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
