import Image from 'next/image';
import AnimatedGradientBg from '../AnimatedGradientBg';
import { PSY_IMAGES } from './psyImages';

// Title and description are split into the same lines as the design;
// on desktop each line is its own block, on smaller screens they flow as text.
const highlights = [
  {
    title: ['CANNABIDIOL (SYNTHETIC)'],
    desc: [
      'No withdrawal symptoms. Non-',
      'psychoactive, with no known potential',
      'for dependence or addiction.',
    ],
  },
  {
    title: ['PROPRIETARY NANODISPERSION', 'ORAL SOLUTION'],
    desc: [
      'Rapid aqueous distribution upon',
      'mixing with water. Easy to use',
      'and titrate with no pill burden.',
    ],
  },
  {
    title: ['CLINICALLY TESTED'],
    desc: [
      '89% treatment response for Anxiety',
      '(HAM-A scale). 60% Improvement in',
      'Depression Symptoms (PHQ-9 score)',
      'and Sleep quality (PSQI score)',
    ],
  },
];

// A line ending in a hyphen joins the next line without a space ("Non-psychoactive")
function Lines({ lines }) {
  return lines.map((line, i) => (
    <span key={line} className="cx-psy-line">
      {line}
      {i < lines.length - 1 && !line.endsWith('-') ? ' ' : ''}
    </span>
  ));
}

export default function PsyWhatIsSection({
  // Shader controls (same defaults as the home hero)
  gradientSpeed      = 0.5,
  gradientDirection  = 0,
  gradientDistortion = 0.15,
  gradientScale      = 1.5,
}) {
  return (
    <section className="cx-psy-whatis">
      {/* Animated WebGL / WebGPU gradient background */}
      <AnimatedGradientBg
        speed={gradientSpeed}
        direction={gradientDirection}
        distortion={gradientDistortion}
        scale={gradientScale}
      />

      {/* Soft ambient vignette */}
      <div className="cx-hero-vignette" />

      <div className="cx-psy-whatis-img">
        <Image
          src={PSY_IMAGES.consultation}
          alt="Psychiatrist explaining Canxiol to a patient across his desk"
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
            <div key={item.title[0]} className="cx-psy-whatis-card">
              <span className="cx-psy-teal-label"><Lines lines={item.title} /></span>
              <p><Lines lines={item.desc} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
