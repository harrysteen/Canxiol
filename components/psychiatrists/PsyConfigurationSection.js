import Image from 'next/image';
import { PSY_IMAGES } from './psyImages';

export default function PsyConfigurationSection() {
  return (
    <section className="cx-psy-config">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-5">
            <div className="cx-psy-config-options">
              <div>
                <span className="cx-psy-teal-label">CONFIGURATION 01</span>
                <p className="cx-psy-config-size">14 mL bottle</p>
              </div>
              <div>
                <span className="cx-psy-teal-label">CONFIGURATION 02</span>
                <p className="cx-psy-config-size">28 mL bottle</p>
              </div>
            </div>
            <p className="cx-psy-body">
              Supplied with a tamper-resistant CRC cap and a calibrated 1 mL CRC dropper.
            </p>
            <p className="cx-psy-config-check">
              ✓ Precise volume gradations (0.25, 0.50, 0.75, 1.0 mL)
            </p>
          </div>

          <div className="col-12 col-lg-7">
            <div className="cx-psy-config-packs">
              <div className="cx-psy-config-pack">
                <Image
                  src={PSY_IMAGES.pack14}
                  alt="Canxiol 14 mL pack and bottle"
                  fill
                  sizes="(max-width: 991px) 50vw, 30vw"
                />
              </div>
              <div className="cx-psy-config-pack">
                <Image
                  src={PSY_IMAGES.pack28}
                  alt="Canxiol 28 mL pack and bottle"
                  fill
                  sizes="(max-width: 991px) 50vw, 30vw"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="cx-psy-divider" />

        <h2 className="cx-psy-h2 cx-psy-h2-sm">Storage Conditions</h2>
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <span className="cx-psy-teal-label">IN-USE PACK:</span>
            <p className="cx-psy-body cx-psy-storage-text">
              Use within 60 days of first opening the bottle, then discard any remainder.
            </p>
          </div>
          <div className="col-12 col-md-6">
            <span className="cx-psy-teal-label">UNOPENED PACK:</span>
            <p className="cx-psy-body cx-psy-storage-text">
              Store at a temperature not exceeding 30ºC. Do not freeze. Protect from light. Store
              the bottle upright. Keep out of reach of children. Keep the cap tightly closed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
