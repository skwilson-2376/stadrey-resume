import { useMemo, useState, useEffect, useRef } from "react";
import { resumeData } from "./resumeData";
import "./styles.css";
import UAT from "./components/UAT"; 
import RTM from "./components/RTM";

type SectionKey = "summary" | "skills" | "experience" | "education" | "certificates" | "portfolio" | "uat" | "rtm"; // added uat section


export default function App() {
  const d = resumeData;

  const [query] = useState("");
  const [active, setActive] = useState<SectionKey>("summary");
  const prevActive = useRef<SectionKey>("summary");

  // support deep linking via hash (e.g. #uat or #rtm)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && hash in { uat: true, rtm: true }) {
      setActive(hash as SectionKey);
    }
  }, []);

  // keep previous section to know if we just left summary
  useEffect(() => {
    prevActive.current = active;
  }, [active]);

  const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();
  if (!q) return d;

  const includesAny = (text: string) => text.toLowerCase().includes(q);

  const skills = d.skills
    .map((s) => ({
      ...s,
      items: s.items.filter((i) => includesAny(i) || includesAny(s.label)),
    }))

    .filter((s) => s.items.length > 0 || includesAny(s.label));

  const experience = d.experience
    .map((e) => ({
      ...e,
      bullets: e.bullets.filter(
        (b) => includesAny(b) || includesAny(e.company) || includesAny(e.role)
      ),
    }))
    .filter((e) => e.bullets.length > 0 || includesAny(e.company) || includesAny(e.role));

  const education = d.education.filter(
    (ed) => includesAny(ed.school) || includesAny(ed.degree)
  );

  const certificates = d.certificates.filter(
    (ed) => includesAny(ed.name) || includesAny(ed.issuer)
  );
  const portfolio = d.portfolio.filter(
    (ed) => includesAny(ed.name) || includesAny(ed.description)
  );
  // NEW: summary only "matches" if it contains the query
  const summaryMatches = includesAny(d.summary);
  const summary = summaryMatches ? d.summary : "";

  return {
    ...d,
    summary,
    skills,
    experience,
    education,
    certificates,
    portfolio,
  };
}, [d, query]);

  const nav = [
    { key: "summary" as const, label: "Summary" },
    { key: "skills" as const, label: "Skills" },
    { key: "experience" as const, label: "Experience" },
    { key: "education" as const, label: "Education" },
    { key: "certificates" as const, label: "Certificates" },
    { key: "portfolio" as const, label: "Portfolio" },
    // the UAT section is not in the nav by default; it is reached via portfolio link
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
          {/* <input
            className="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills / tools / keywords…"
            aria-label="Search resume"
          /> */}
          {(active !== "summary" && prevActive.current === "summary") ||
            active === "experience" ||
            active === "education" ||
            active === "certificates" ||
            active === "portfolio" ? (
            <button className="btn" onClick={() => setActive("summary")}>Back</button>
          ) : null}
          {(active === "uat" || active === "rtm") && (
            <button className="btn" onClick={() => setActive("portfolio")}>Back to Portfolio</button>
          )}
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

        {active === "certificates" && (
          <section className="card">
            <h2>Certificates</h2>
            <ul className="certList">
              {filtered.certificates?.map((c) => (
                <li key={c.name}>
                  <strong>{c.name}</strong>
                  {c.issuer && <span className="muted"> — {c.issuer}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
       {active === "portfolio" && (
  <section className="card">
    <div className="portfolioHeader">
      <h2>Business Analysis Portfolio</h2>
      <p className="portfolioSub">
        Enterprise business analysis artifacts showcasing requirements, governance,
        and delivery frameworks.
      </p>
    </div>

    <div className="portfolioGrid">
      {(filtered.portfolio ?? []).map((p) => (
        <article className="portfolioCard" key={p.name}>
          <div className="portfolioCardTop">
            <h3 className="portfolioTitle">{p.name}</h3>
            {p.description && <p className="portfolioDesc">{p.description}</p>}
          </div>

          {!!p.tags?.length && (
            <div className="tagRow">
              {p.tags.map((t: string) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="portfolioActions">
            {p.linkUrl ? (
              <a
                className="btnSecondary"
                href={p.linkUrl}
                // internal anchors should not open a new tab and should trigger the app
                target={p.linkUrl && p.linkUrl.startsWith("#") ? undefined : "_blank"}
                rel={p.linkUrl && p.linkUrl.startsWith("#") ? undefined : "noreferrer"}
                onClick={(e) => {
                  if (p.linkUrl && p.linkUrl.startsWith("#")) {
                    e.preventDefault();
                    const section = p.linkUrl.slice(1) as SectionKey;
                    setActive(section);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                {p.linkLabel || "View"}
              </a>
            ) : (
              <span className="btnSecondary disabled" title="Add a linkUrl in resumeData.ts">
                Link coming soon
              </span>
            )}
          </div>
        </article>
      ))}
    </div>
  </section>
)}

        {active === "uat" && (
          <section className="card">
            <UAT />
          </section>
        )}

        {active === "rtm" && (
          <section className="card">
            <RTM />
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
