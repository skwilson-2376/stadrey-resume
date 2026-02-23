// Portfolio.tsx

export default function Portfolio() {
  return (
    <section className="card">
      <h2>Enterprise Business Analysis Portfolio</h2>

      <p>
        Demonstrating enterprise-level business analysis deliverables,
        governance models, and structured delivery frameworks.
      </p>

      <div className="portfolio-grid">

        <div className="portfolio-item">
          <h3>Business Requirements Document</h3>
          <p>Enterprise BRD with governance and KPI alignment.</p>
          <a href="#" target="_blank">View Document</a>
        </div>

        <div className="portfolio-item">
          <h3>RACI Governance Model</h3>
          <p>Stakeholder accountability framework.</p>
        </div>

        <div className="portfolio-item">
          <h3>User Stories</h3>
          <p>Agile-ready requirement breakdown.</p>
        </div>

        <div className="portfolio-item">
          <h3>UAT Framework</h3>
          <p>Business validation and testing strategy.</p>
        </div>

      </div>
    </section>
  );
}