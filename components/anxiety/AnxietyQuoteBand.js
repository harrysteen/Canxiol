// Pass `lines` to fix the line breaks as in the design (one line per entry),
// or `children` for a quote that wraps naturally.
const DEFAULT_LINES = [
  'A person may also appear',
  'successful and capable on the outside',
  'while privately struggling with',
  'persistent worry, poor sleep,',
  'tension, or exhaustion.',
];

export default function AnxietyQuoteBand({ children, lines = children ? null : DEFAULT_LINES }) {
  return (
    <section className="cx-anx-quote-band">
      <div className="container cx-anx-quote-band-inner">
        <span className="cx-anx-quote-mark" aria-hidden="true">&ldquo;</span>
        <blockquote className="cx-anx-quote-text">
          {lines
            ? lines.map((line, i) => (
                <span key={line} className="cx-anx-quote-line">
                  {line}
                  {i < lines.length - 1 ? ' ' : ''}
                </span>
              ))
            : children}
        </blockquote>
      </div>
    </section>
  );
}
