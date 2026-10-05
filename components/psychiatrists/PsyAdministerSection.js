import Image from 'next/image';
import { PSY_IMAGES } from './psyImages';

const steps = [
  { title: 'Prescribed dose', desc: 'Verify the exact dose as directed by Psychiatrist to be administered 30 mins post meal.' },
  { title: 'Measure with calibrated dropper', desc: 'Use only the enclosed calibrated measuring dropper supplied with the pack to draw the accurate volume.' },
  { title: 'Add & stir rapidly', desc: 'Add to approx 150ml water and stir rapidly with a spoon or stirrer for at least 10 seconds.' },
  { title: 'Administer orally', desc: 'After stirring, immediately consume the entire contents orally.' },
];

export default function PsyAdministerSection() {
  return (
    <section className="cx-psy-admin">
      <div className="container">
        <div className="row g-4 g-lg-5">
          {/* On desktop the copy spans exactly the photo's height (top and bottom aligned) */}
          <div className="col-12 col-lg-6 cx-psy-admin-copy">
            <h2 className="cx-psy-h2">How to Administer Canxiol.</h2>
            <div className="cx-psy-admin-text">
              <p>Canxiol® should be administered at the dose prescribed by your psychiatrist.</p>
              <p>Administer the dose at consistent time with respect to meals preferably 30 minutes after food.</p>
              <p>
                It is recommended to use a calibrated measuring dropper provided along with the pack
                to measure and deliver the prescribed dose accurately. A household teaspoon or
                tablespoon is not an adequate measuring device.
              </p>
              <p>
                Measure the prescribed dose of Canxiol® into the calibrated dropper and add the
                measured dose to about 150 mL of water. Stir rapidly for at least 10 seconds using a
                spoon or stirrer and immediately administer the dose orally.
              </p>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <figure className="cx-psy-admin-figure">
              <div className="cx-psy-admin-img">
                <Image
                  src={PSY_IMAGES.administer}
                  alt="Woman measuring a dose of Canxiol with the dropper into a glass of water"
                  fill
                  sizes="(max-width: 991px) 100vw, 50vw"
                />
              </div>
              <figcaption>
                Take prescribed dose in the dropper, put into 150mL of water, stir will for 10sec &amp; consume oral.
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="cx-psy-steps">
          {steps.map((step, i) => (
            <div key={step.title} className="cx-psy-step">
              <span className="cx-psy-teal-label">STEP {String(i + 1).padStart(2, '0')}</span>
              <h3 className="cx-psy-step-title">{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="cx-psy-important">
          <h3 className="cx-psy-important-title">⚠ IMPORTANT</h3>
          <p>
            Do not allow the dropper to touch the water while adding the product. In instance, if
            the tip of the dropper touches the water, squeeze the dropper &amp; wipe the dropper with
            a clean absorbent tissue paper, clean cloth and place the dropper back into the bottle.
          </p>
          <p>After use, close the bottle tightly with dropper provided. Store at a temperature not exceeding 30ºC.</p>
          <p>Discard any unused Canxiol® remaining 60 days after first opening the bottle.</p>
        </div>
      </div>
    </section>
  );
}
