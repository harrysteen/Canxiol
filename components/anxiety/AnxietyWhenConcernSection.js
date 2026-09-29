import Image from 'next/image';

// TODO: swap for the student photo once it is added to /public/images
const CONCERN_IMAGE = '/images/blog_img_1.jpg';

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

        {/* Disclaimer and sources */}
        <div className="cx-anx-when-notes">
          <div className="cx-anx-when-note">
            <span className="cx-anx-eyebrow">Medical disclaimer</span>
            <p>
              Medical disclaimer: This information is for general patient education and does not
              replace individual assessment, diagnosis or treatment by a qualified Psychiatrist.
            </p>
          </div>
          <div className="cx-anx-when-note">
            <span className="cx-anx-eyebrow">Information sources</span>
            <p>
              World Health Organization (WHO), Anxiety Disorders; National Institute of Mental
              Health and Neurosciences (NIMHANS), National Mental Health Survey (NMHS) of India
              2015-16; The Lancet Psychiatry, American Psychiatric Association, Diagnostic and
              Statistical Manual of Mental Disorders, Fifth Edition (DSM-5); Indian Journal of
              Psychiatry; Indian Psychiatry Association, General Psychiatry, Dialogues in Clinical
              Neuroscience.
            </p>
          </div>
        </div>

        <div className="cx-anx-next-wrap">
          <a href="#when-to-seek-help" className="cx-anx-next">
            Next: When to seek help
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
