'use client';
import { useState } from 'react';

// Everyday self-help ideas, shown one at a time. Nothing the visitor picks is stored.
const MOODS = [
  {
    word: 'Restless',
    heading: 'Slow things down',
    steps: [
      'Breathe in slowly through your nose.',
      'Breathe out slowly through your mouth.',
      'Keep going for about a minute.',
    ],
  },
  {
    word: 'Heavy',
    heading: 'Start small',
    steps: [
      'Have a glass of water.',
      'Step outside or take a short walk.',
      'Send a friendly message to someone.',
    ],
  },
  {
    word: 'Scattered',
    heading: 'Get it out of your head',
    steps: [
      'Write down everything on your mind.',
      'Circle the one thing that matters most today.',
    ],
  },
  {
    word: 'Fine, just curious',
    heading: 'Make it a habit',
    steps: [
      'Pick one thing that helps you: a walk, some water, a few slow breaths or a chat with a friend.',
      'Notice how it feels and adjust it to suit you',
    ],
  },
];

// "Make the most of your appointment": things the visitor may have noticed, and the note
// they can take along (adapted from NIMH, "Tips for Talking With a Health Care Provider
// About Your Mental Health"). Nothing is saved.
const SYMPTOMS = [
  'Sleep changes',
  'Feeling restless',
  'Low energy',
  'Trouble concentrating',
  'Aches or pains',
  'Irritability',
];

const TELL_DOCTOR = [
  'When it started, how strong it is and how often it happens',
  'Any medicines or supplements I take',
  'Any big changes or stress lately',
];

const QUESTIONS = [
  'Can you explain what you suggest, and why?',
  'What are my options if I am not comfortable with this one?',
];

const TABS = [
  { id: 'skill', label: 'Try One Small Skill Today' },
  { id: 'appointment', label: 'Make the Most of Your Appointment' },
];

export default function CanxiolSmallStepSection() {
  const [tab, setTab] = useState('skill');
  const [mood, setMood] = useState(null);
  const [noticed, setNoticed] = useState([]);

  const selected = MOODS.find((m) => m.word === mood);

  const toggleSymptom = (s) =>
    setNoticed((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  // Downloads the note as a PDF. jsPDF is loaded only when the button is clicked.
  const [downloading, setDownloading] = useState(false);
  const downloadNote = async () => {
    setDownloading(true);
    try {
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
      const left = 20;
      const width = 170;
      let y = 24;

      const line = (text, { bold = false, size = 12, gap = 6.5 } = {}) => {
        pdf.setFont('helvetica', bold ? 'bold' : 'normal');
        pdf.setFontSize(size);
        pdf.splitTextToSize(text, width).forEach((part) => {
          if (y > 280) {
            pdf.addPage();
            y = 24;
          }
          pdf.text(part, left, y);
          y += gap;
        });
      };
      const section = (title, items) => {
        line(title, { bold: true });
        items.forEach((item) => line(`- ${item}`));
        y += 4;
      };

      line('My appointment note', { bold: true, size: 18, gap: 10 });
      line(`Prepared on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, { size: 10, gap: 10 });
      section('Things I have noticed:', noticed);
      section('To tell my doctor or therapist:', TELL_DOCTOR);
      section('Questions to ask:', QUESTIONS);
      line('It can help to bring a friend or relative to take notes.');
      y += 6;
      line('Everyday preparation ideas, not medical advice. Adapted from NIMH, "Tips for Talking With a Health Care Provider About Your Mental Health" (2022).', { size: 9, gap: 4.5 });

      pdf.save('my-appointment-note.pdf');
    } finally {
      setDownloading(false);
    }
  };

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
                {selected ? (
                  <>
                    <p className="cx-step-result-title">
                      {selected.word} &rarr; {selected.heading}
                    </p>
                    <ul className="cx-step-result-list">
                      {selected.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  'Choose a word above and one small idea will appear here.'
                )}
              </div>
            </div>
          ) : (
            <div
              className="cx-step-pane"
              role="tabpanel"
              id="cx-step-pane-appointment"
              aria-labelledby="cx-step-tab-appointment"
            >
              <div className="cx-step-appt">
                <div className="cx-step-appt-left">
                  <h3 className="cx-step-pane-title cx-step-appt-title">Make the most of your appointment</h3>
                  <p className="cx-step-pane-intro">
                    Seeing a doctor or therapist soon? Click what you have noticed, and we build a short
                    list to take along. Nothing is saved.
                  </p>

                  <div className="cx-step-chips cx-step-chips--symptoms">
                    {SYMPTOMS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={noticed.includes(s)}
                        className={`cx-step-chip ${noticed.includes(s) ? 'is-active' : ''}`}
                        onClick={() => toggleSymptom(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <div className="cx-step-appt-actions">
                    <h4 className="cx-step-appt-sub">Download or clear the checklist</h4>
                    <div className="cx-step-appt-btns">
                      <button
                        type="button"
                        className="cx-step-print"
                        onClick={downloadNote}
                        disabled={!noticed.length || downloading}
                        title={noticed.length ? undefined : 'Select what you have noticed first'}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 3v12M7 10l5 5 5-5" />
                          <path d="M4 17v3h16v-3" />
                        </svg>
                        {downloading ? 'Preparing…' : 'Download My Note (PDF)'}
                      </button>
                      <button type="button" className="cx-step-clear" onClick={() => setNoticed([])}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
                          <path d="M21 3v5h-5" />
                        </svg>
                        Clear Selections
                      </button>
                    </div>
                  </div>
                </div>

                {/* The note that builds as symptoms are clicked; this is what goes in the PDF */}
                <div className="cx-step-note" aria-live="polite">
                  <p className="cx-step-note-head">Things I have noticed:</p>
                  <ul>
                    {noticed.length ? (
                      noticed.map((s) => <li key={s}>{s}</li>)
                    ) : (
                      <li className="is-empty">Click what you have noticed</li>
                    )}
                  </ul>

                  <p className="cx-step-note-head">To tell my doctor or therapist:</p>
                  <ul>
                    {TELL_DOCTOR.map((t) => <li key={t}>{t}</li>)}
                  </ul>

                  <p className="cx-step-note-head">Questions to ask:</p>
                  <ul>
                    {QUESTIONS.map((q) => <li key={q}>{q}</li>)}
                  </ul>

                  <p className="cx-step-note-tip">It can help to bring a friend or relative to take notes.</p>
                </div>
              </div>
            </div>
          )}

          <div className="cx-step-foot">
            {tab === 'skill' && <p className="cx-step-disclaimer">Everyday ideas, not medical advice.</p>}
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
