import Image from 'next/image';

const values = [
  {
    letter: 'S',
    name: 'Symphony',
    text: 'Innovation is rarely a solo act. We bring different minds, disciplines, and strengths together in harmony around a shared purpose.',
  },
  {
    letter: 'M',
    name: 'Mindfulness',
    text: 'We approach every decision thoughtfully, mindful of the people it may touch and the difference it can make.',
  },
  {
    letter: 'I',
    name: 'Integrity',
    text: 'We do what is right — with openness, responsibility, and the courage to choose the right path, even when it is the harder one.',
  },
  {
    letter: 'L',
    name: 'Love',
    text: 'We bring passion to our science and genuine care for the people whose lives our work is intended to improve.',
  },
  {
    letter: 'E',
    name: 'Empathy',
    text: 'We stay connected to the human experience behind every scientific endeavour we undertake, with the needs of patients and healthcare professionals guiding how we think, innovate, and create.',
  },
];

export default function AboutSmileSection() {
  return (
    <section id="discover-smile" className="cx-about-smile">
      <div className="container">
        <div className="cx-about-smile-head">
          <div className="cx-about-smile-intro">
            <h2 className="cx-about-smile-h2">The Culture Behind Every SMILE.</h2>
            <p className="cx-about-smile-p">
              For us, SMILE represents the culture that shapes how we work and the purpose
              behind what we create.
            </p>
            <p className="cx-about-smile-p">
              SMILE brings our science and our humanitarian purpose together. It shapes how we
              collaborate, innovate, and challenge what is possible — united by one purpose: to
              create science that becomes care.
            </p>
          </div>

          <div className="cx-about-smile-logo">
            <Image
              src="/images/smile.png"
              alt="SMILE — Culture, Innovation"
              width={1892}
              height={700}
              sizes="(max-width: 991px) 70vw, 280px"
            />
          </div>
        </div>

        <ul className="cx-about-smile-grid">
          {values.map((value) => (
            <li key={value.letter} className="cx-about-smile-card">
              <span className="cx-about-smile-letter" aria-hidden="true">{value.letter}</span>
              <h3 className="cx-about-smile-name">{value.name}</h3>
              <p className="cx-about-smile-text">{value.text}</p>
            </li>
          ))}
        </ul>

        <p className="cx-about-smile-closing">
          When science becomes care, scientific possibility becomes innovation, innovation
          becomes therapeutic progress — and progress becomes a SMILE.
        </p>
      </div>
    </section>
  );
}
