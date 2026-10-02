import Image from 'next/image';
import Link from 'next/link';

export default function CanxiolWhatIsSection() {
  return (
    <section id="discover-more" className="cx-cxp-whatis">
      <div className="container">
        <h2 className="cx-cxp-whatis-h2">
          What is Canxiol<sup>®</sup>?
        </h2>

        <div className="row cx-cxp-whatis-row">
          {/* Left Column: Product photo */}
          <div className="col-12 col-lg-6">
            <div className="cx-cxp-whatis-img">
              <Image
                src="/images/canxiol page img1.png"
                alt="Canxiol 28 mL bottle with its packaging"
                fill
                sizes="(max-width: 991px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Column: Summary and CTA */}
          <div className="col-12 col-lg-6 cx-cxp-whatis-text">
            <h3 className="cx-cxp-whatis-lead">
              Canxiol<sup>®</sup> is an oral solution containing cannabidiol 150 mg/mL.
            </h3>
            <p className="cx-cxp-whatis-p">
              Canxiol<sup>®</sup> is a prescription oral solution containing cannabidiol 150 mg/mL.
              If your psychiatrist has prescribed Canxiol<sup>®</sup>, this page helps you
              understand your medicine, how to take it and where to find important information.
            </p>
            <Link href="/contact" className="cx-btn-discover cx-cxp-whatis-btn">
              <span>CONNECT WITH US</span>
              <Image
                src="/images/contact-us-arrow.png"
                alt=""
                width={14}
                height={14}
                className="cx-btn-discover-arrow"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
