import Image from 'next/image';
import AnxietyNotes from './AnxietyNotes';

const CONCERN_IMAGE = '/images/image 2 in what anxity page.png';

export default function AnxietyWhenConcernSection() {
  return (
    <section className="cx-anx-when">
      <div className="container">
        <div className="row cx-anx-when-row">
          {/* Left Column: Eyebrow and statement */}
          <div className="col-12 col-lg-6">
            <span className="cx-anx-eyebrow">When anxiety becomes a concern</span>
            <h2 className="cx-anx-when-h2">
              What matters is not simply experiencing anxiety, but how persistent, distressing,
              and disruptive it becomes in everyday life.
            </h2>
          </div>

          {/* Right Column: Photo */}
          <div className="col-12 col-lg-6">
            <div className="cx-anx-when-img">
              <Image
                src={CONCERN_IMAGE}
                alt="Smiling student carrying books on a university campus"
                fill
                sizes="(max-width: 991px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        <AnxietyNotes nextHref="/anxiety/when-to-seek-help" nextLabel="Next: When to seek help" />
      </div>
    </section>
  );
}
