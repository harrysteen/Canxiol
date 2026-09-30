import Image from 'next/image';
import AnxietyNotes from './AnxietyNotes';

// TODO: swap for the man-on-a-park-bench photo once it is added to /public/images
const UNTREATED_IMAGE = '/images/lifestyle-moments.png';

export default function SeekUntreatedSection() {
  return (
    <section className="cx-seek-untreated">
      <div className="container">
        <span className="cx-anx-eyebrow">The impact of delayed care</span>
        <h2 className="cx-anx-h2 cx-seek-untreated-h2">What happens when anxiety goes untreated</h2>

        <div className="row cx-seek-untreated-row">
          {/* Left Column: Photo */}
          <div className="col-12 col-lg-5">
            <div className="cx-seek-untreated-img">
              <Image
                src={UNTREATED_IMAGE}
                alt="Man sitting alone on a park bench, looking into the distance"
                fill
                sizes="(max-width: 991px) 100vw, 42vw"
              />
            </div>
          </div>

          {/* Right Column: Impact points */}
          <div className="col-12 col-lg-7">
            <ul className="cx-seek-untreated-card">
              <li className="is-lead">Anxiety left untreated rarely stays contained to mood.</li>
              <li>
                If left untreated, Anxiety can worsen overtime, leading to chronic stress, physical
                and mental health complications.
              </li>
              <li>
                NMHS data shows at least half of people living with a mental disorder report
                disability across work, social life, and family life, and the median duration of
                illness before someone with a neurotic or stress-related disorder reaches care runs
                to three years, with an eight-month gap between onset and first consultation. NMHS
                data show that anxiety disorders can affect daily life, yet 82.9% of people with
                anxiety disorders in India do not receive treatment.
              </li>
              <li>
                Mental health conditions cost the Indian economy an estimated{' '}
                <strong>&#8377;2.5 lakh crore a year</strong> in lost productivity (WHO estimate).
                Anxiety disorders can significantly affect daily life, including work,
                relationships, education and overall well-being, yet only about 1 in 4 people who
                need treatment receive it.
              </li>
            </ul>
          </div>
        </div>

        <AnxietyNotes nextHref="/anxiety/treatment" nextLabel="Next: Treatment" />
      </div>
    </section>
  );
}
