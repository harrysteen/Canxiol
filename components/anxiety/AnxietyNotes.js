import Link from 'next/link';

// Medical disclaimer, information sources and the optional "Next" link that close each tab's page
export default function AnxietyNotes({ nextHref, nextLabel }) {
  return (
    <>
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

      {nextHref && (
        <div className="cx-anx-next-wrap">
          <Link href={nextHref} className="cx-anx-next">
            {nextLabel}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      )}
    </>
  );
}
