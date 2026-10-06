import Image from 'next/image';

const INTRO_IMAGE = '/images/when-to-seek-intro.png';

export default function SeekIntroSection() {
  return (
    <section className="cx-seek-intro">
      <div className="container">
        <h2 className="cx-anx-h2 cx-seek-intro-h2">
          When does anxiety become an anxiety disorder?
        </h2>

        <div className="row cx-seek-intro-row">
          {/* Left Column: Photo */}
          <div className="col-12 col-lg-5">
            <div className="cx-seek-intro-img">
              <Image
                src={INTRO_IMAGE}
                alt="Woman with eyes closed, smiling calmly in warm evening light"
                fill
                sizes="(max-width: 991px) 100vw, 42vw"
              />
            </div>
          </div>

          {/* Right Column: Context and pull quote */}
          <div className="col-12 col-lg-7 cx-seek-intro-text">
            <p className="cx-seek-intro-lead">
              Feeling anxious from time to time is a normal response to stress or challenging
              situations.
            </p>
            <p className="cx-seek-intro-p">
              However, anxiety may become an anxiety disorder when the fear or worry is excessive
              or persistent, is difficult to control, causes significant distress, or starts
              significantly interfering with quality of life, sleep, concentration,
              decision-making, relationships, academic or occupational performance and sexual,
              physical well-being.
            </p>
            <blockquote className="cx-seek-intro-quote">
              &ldquo;Avoidance is common, and repeated avoidance gradually restricts a normal way
              of life.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
