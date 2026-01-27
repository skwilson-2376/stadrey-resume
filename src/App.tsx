import { useMemo, useState } from "react";
import { resumeData } from "./resumeData";
import "./styles.css";

type SectionKey = "summary" | "skills" | "experience" | "education";

export default function App() {
  const d = resumeData;

  const [query, setQuery] = useState("");
  const [active, setActive] = useState<SectionKey>("summary");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return d;

    const includesAny = (text: string) => text.toLowerCase().includes(q);

    return {
      ...d,
      skills: d.skills
        .map((s) => ({
          ...s,
          items: s.items.filter((i) => includesAny(i) || includesAny(s.label)),
        }))
        .filter((s) => s.items.length > 0 || includesAny(s.label)),
      experience: d.experience
        .map((e) => ({
          ...e,
          bullets: e.bullets.filter(
            (b) => includesAny(b) || includesAny(e.company) || includesAny(e.role)
          ),
        }))
        .filter((e) => e.bullets.length > 0 || includesAny(e.company) || includesAny(e.role)),
      education: d.education.filter((ed) => includesAny(ed.school) || includesAny(ed.degree)),
    };
  }, [d, query]);

  const nav = [
    { key: "summary" as const, label: "Summary" },
    { key: "skills" as const, label: "Skills" },
    { key: "experience" as const, label: "Experience" },
    { key: "education" as const, label: "Education" },
  ];

  return (
    <div className="page">
      <header className="header">
        <div className="nameBlock">
          <h1 className="name">{d.name}</h1>
          <div className="title">{d.title}</div>
          <div className="meta">
            <span>{d.location}</span>
            <span className="dot">•</span>
            <a href={`mailto:${d.email}`}>{d.email}</a>
            <span className="dot">•</span>
            <span>{d.phone}</span>
            <span className="dot">•</span>
            <a href={d.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="actions">
          <input
            className="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills / tools / keywords…"
            aria-label="Search resume"
          />
          <button className="btn" onClick={() => window.print()}>
            Print / Save PDF
          </button>
        </div>
      </header>

      <nav className="nav">
        {nav.map((n) => (
          <button
            key={n.key}
            className={`tab ${active === n.key ? "active" : ""}`}
            onClick={() => setActive(n.key)}
          >
            {n.label}
          </button>
        ))}
      </nav>

      <main className="content">
        {active === "summary" && (
          <section className="card">
            <h2>Summary</h2>
            <p className="p">{filtered.summary}</p>
          </section>
        )}

        {active === "skills" && (
          <section className="card">
            <h2>Core Skills</h2>
            <div className="grid">
              {filtered.skills.map((s) => (
                <div key={s.label} className="panel">
                  <h3>{s.label}</h3>
                  <ul>
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {filtered.skills.length === 0 && <p className="muted">No matches.</p>}
            </div>
          </section>
        )}

        {active === "experience" && (
          <section className="card">
            <h2>Professional Experience</h2>
            {filtered.experience.map((e) => (
              <article key={`${e.company}-${e.role}-${e.start}`} className="role">
                <div className="roleTop">
                  <div>
                    <div className="roleTitle">
                      <span className="company">{e.company}</span>{" "}
                      <span className="dash">—</span>{" "}
                      <span className="position">{e.role}</span>
                    </div>
                    <div className="dates">
                      {e.start} – {e.end}
                    </div>
                  </div>
                </div>
                <ul className="bullets">
                  {e.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
            {filtered.experience.length === 0 && <p className="muted">No matches.</p>}
          </section>
        )}

        {active === "education" && (
          <section className="card">
            <h2>Education</h2>
            {filtered.education.map((ed) => (
              <div key={ed.school} className="edu">
                <div className="eduSchool">{ed.school}</div>
                <div className="eduDegree">{ed.degree}</div>
              </div>
            ))}
            {filtered.education.length === 0 && <p className="muted">No matches.</p>}
          </section>
        )}
      </main>

      <footer className="footer">
        <span className="muted">
          Tip: Use the “Print / Save PDF” button to export a clean PDF from your browser.
        </span>
      </footer>
    </div>
  );
}
