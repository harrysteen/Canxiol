import Image from 'next/image';
import { PSY_IMAGES } from './psyImages';

const highlights = [
  {
    title: 'CANNABIDIOL (SYNTHETIC)',
    desc: 'No withdrawal symptoms. Non-psychoactive, with no known potential for dependence or addiction.',
  },
  {
    title: 'PROPRIETARY NANODISPERSION ORAL SOLUTION',
    desc: 'Rapid aqueous distribution upon mixing with water. Easy to use and titrate with no pill burden.',
  },
  {
    title: 'CLINICALLY TESTED',
    desc: '89% treatment response for Anxiety (HAM-A scale), 60% Improvement in Depression Symptoms (PHQ-9 score) and Sleep quality (PSQI score)',
  },
];

export default function PsyWhatIsSection() {
  return (
    <section className="cx-psy-whatis">
      <div className="cx-psy-whatis-img">
        <Image
          src={PSY_IMAGES.consultation}
          alt="Psychiatrist consulting with a patient about Canxiol"
          fill
          priority
          sizes="(max-width: 991px) 100vw, 60vw"
        />
      </div>

      <div className="container cx-psy-whatis-content">
        <div className="cx-psy-whatis-text">
          <h1 className="cx-psy-h1">What is Canxiol?</h1>
          <p className="cx-psy-whatis-lead">
            Canxiol is a Cannabidiol oral solution containing Cannabidiol 150mg/ml for the
            management of mild to moderate anxiety in conjunction with cognitive behavior therapy.
            To be prescribed by Psychiatrists only.
          </p>
        </div>

        <div className="cx-psy-whatis-cards">
          {highlights.map((item) => (
            <div key={item.title} className="cx-psy-whatis-card">
              <span className="cx-psy-teal-label">{item.title}</span>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
