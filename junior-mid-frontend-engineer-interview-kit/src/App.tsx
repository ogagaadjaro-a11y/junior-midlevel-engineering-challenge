export function App() {
  return (
    <main className="app-shell">
      <section className="intro">
        <p className="eyebrow">Junior/Mid Frontend Interview Kit</p>
        <h1>Practical 24-minute frontend challenges</h1>
        <p>
          Use the challenge READMEs for interview instructions. The coding
          challenges are intentionally incomplete or broken so candidates can
          drive them with tests.
        </p>
      </section>

      <section className="challenge-grid" aria-label="Available challenges">
        <article>
          <h2>Mini System Design</h2>
          <p>Design a transaction monitoring dashboard for fintech operations.</p>
        </article>
        <article>
          <h2>Mini App Completion</h2>
          <p>Complete an adtech campaign list with filters and spend warnings.</p>
        </article>
        <article>
          <h2>Bug Hunt</h2>
          <p>Fix search, filtering, empty state, and status badge bugs.</p>
        </article>
      </section>
    </main>
  );
}
