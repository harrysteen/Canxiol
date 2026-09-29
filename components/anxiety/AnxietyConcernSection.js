import Image from 'next/image';

// TODO: swap for the walking-man photo once it is added to /public/images
const CONCERN_IMAGE = '/images/anxiety-lifestyle.jpg';

export default function AnxietyConcernSection() {
  return (
    <section className="cx-anx-concern">
      <div className="container">
        <div className="row cx-anx-concern-row">
          {/* Left Column: Photo */}
          <div className="col-12 col-lg-6">
            <div className="cx-anx-concern-img">
              <Image
                src={CONCERN_IMAGE}
                alt="Man smiling while walking along a tree-lined park path"
                fill
                sizes="(max-width: 991px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Column: Context and pull quote */}
          <div className="col-12 col-lg-6 cx-anx-concern-text">
            <p className="cx-anx-concern-p">
              These conditions are among the most common mental health disorders across the
              lifespan, affecting both children and adults. Women are ~1.7x more likely than men
              to have an anxiety disorder. (The Lancet Psychiatry 2020)
            </p>
            <blockquote className="cx-anx-concern-quote">
              Anxiety becomes a health concern when it is excessive, persistent, difficult to
              control, out of proportion to the situation, or begins to disrupt day-to-day life.
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
