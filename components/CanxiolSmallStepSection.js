'use client';
import { useState } from 'react';

// Everyday self-help ideas, shown one at a time. Nothing the visitor picks is stored.
// Copy is general wellbeing guidance, not medical advice — have it reviewed before going live.
const MOODS = [
  {
    word: 'Restless',
    idea: 'Try slow breathing for one minute: breathe in gently for a count of 4, then out for a count of 6. A longer out-breath can help your body settle.',
  },
  {
    word: 'Heavy',
    idea: 'Step outside or stand by a window for five minutes. Notice three things you can see and one thing you can hear.',
  },
  {
    word: 'Scattered',
    idea: 'Write down everything that is on your mind, then circle just one small thing to do next. The rest can wait on the page for now.',
  },
  {
    word: 'Fine, just curious',
    idea: 'Make a short note of what helps you feel steady — a walk, music, a chat with someone — so it is easy to come back to on a harder day.',
  },
];

// Preparation tips adapted from NIMH, "Tips for Talking With a Health Care Provider About Your Mental Health"
const APPOINTMENT_TIPS = [
  'Write down what you have been noticing — how you feel, when it started and how it affects work, sleep or relationships.',
  'List any medicines, vitamins or supplements you take, including the dose.',
  'Note the questions you want to ask, most important first.',
  'Consider bringing a trusted friend or family member for support.',
  'Ask about your options and what the next steps are.',
  'Take notes during the visit, or ask if you can record the key points.',
];

const TABS = [
  { id: 'skill', label: 'Try One Small Skill Today' },
  { id: 'appointment', label: 'Make the Most of Your Appointment' },
];

export default function CanxiolSmallStepSection() {
  const [tab, setTab] = useState('skill');
  const [mood, setMood] = useState(null);
  const [checked, setChecked] = useState([]);

  const selected = MOODS.find((m) => m.word === mood);

  const toggleTip = (i) =>
    setChecked((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <section className="cx-step-section">
      <div className="container">
        <div className="cx-anx-section-head cx-step-head">
          <h2 className="cx-anx-h2 cx-step-h2">
            A Small Step Towards<br />Understanding Yourself
          </h2>
          <p className="cx-anx-section-lead cx-step-lead">
            Everyone has difficult days. Explore a small everyday activity or prepare for a
            conversation with a healthcare professional.
          </p>
        </div>

        <div className="cx-step-panel">
          <div className="cx-step-tabs" role="tablist" aria-label="Choose an activity">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`cx-step-tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`cx-step-pane-${t.id}`}
                className={`cx-step-tab ${tab === t.id ? 'is-active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'skill' ? (
            <div
              className="cx-step-pane"
              role="tabpanel"
              id="cx-step-pane-skill"
              aria-labelledby="cx-step-tab-skill"
            >
              <h3 className="cx-step-pane-title">Try one small skill today</h3>
              <p className="cx-step-pane-intro">
                Not feeling quite right today? Pick the word that fits best and try one small thing.
                Nothing is saved.
              </p>

              <div className="cx-step-chips">
                {MOODS.map((m) => (
                  <button
                    key={m.word}
                    type="button"
                    aria-pressed={mood === m.word}
                    className={`cx-step-chip ${mood === m.word ? 'is-active' : ''}`}
                    onClick={() => setMood(m.word)}
                  >
                    {m.word}
                  </button>
                ))}
              </div>

              <div className={`cx-step-result ${selected ? 'has-idea' : ''}`} aria-live="polite">
                {selected ? selected.idea : 'Choose a word above and one small idea will appear here.'}
              </div>
            </div>
          ) : (
            <div
              className="cx-step-pane"
              role="tabpanel"
              id="cx-step-pane-appointment"
              aria-labelledby="cx-step-tab-appointment"
            >
              <h3 className="cx-step-pane-title">Make the most of your appointment</h3>
              <p className="cx-step-pane-intro">
                A little preparation can make it easier to talk about how you have been feeling.
                Tick off what you have ready. Nothing is saved.
              </p>

              <ul className="cx-step-checklist">
                {APPOINTMENT_TIPS.map((tip, i) => (
                  <li key={tip}>
                    <label className={checked.includes(i) ? 'is-done' : ''}>
                      <input
                        type="checkbox"
                        checked={checked.includes(i)}
                        onChange={() => toggleTip(i)}
                      />
                      <span>{tip}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="cx-step-foot">
            <p className="cx-step-disclaimer">Everyday ideas, not medical advice.</p>
            <p className="cx-step-cite">
              NIMH. (2022). <em>Tips for Talking With a Health Care Provider About Your Mental Health</em>{' '}
              (NIH Publication No. 22-MH-8094).{' '}
              <a
                href="https://www.nimh.nih.gov/health/publications/tips-for-talking-with-your-health-care-provider"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.nimh.nih.gov/health/publications/tips-for-talking-with-your-health-care-provider
              </a>
              <br />
              Accessed October 2026.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
