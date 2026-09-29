const css = `
.projects{display:grid;gap:22px}
.project{background:var(--surface);border:1px solid var(--line);border-left:6px solid var(--accent);border-radius:10px;padding:28px}
.project:nth-child(2){border-left-color:var(--warm)}
.project h3{font-size:1.5rem;margin-bottom:12px}
.project > ul:not(.tags){margin:0 0 16px;padding-left:1.2em}
.project li{margin-bottom:8px;max-width:70ch}
.tags{display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:0;margin:0}
.project .tags li{margin:0;padding:3px 12px;border:1px solid var(--line);border-radius:99px;font-size:.88rem;color:var(--muted)}
`;

// To add a project, copy one object below and change the text.
// Optional: add  link: "https://github.com/..."  to show a "View project" button.
const projects = [
  {
    title: "Smart Loan Lending Ally",
    points: [
      "Built a loan eligibility and risk-assessment tool that analyzes applicant financial data to predict approval likelihood and flag risk factors.",
      "Applied statistical modeling and basic machine learning for credit risk scoring, with EDA and preprocessing to clean and structure applicant datasets.",
      "Designed dashboards showing lending trends, approval rates, and risk segments.",
    ],
    tags: ["Python", "Machine learning", "EDA", "Dashboards"],
  },
  {
    title: "Power BI Sales & Business Performance Dashboard",
    points: [
      "Built an interactive dashboard that tracks sales, revenue, and business performance across regions and time periods.",
      "Connected and transformed data from multiple sources with Power Query, and modeled relationships for accurate cross-filtering.",
      "Created DAX measures for KPIs such as revenue growth, profit margin, and customer retention.",
    ],
    tags: ["Power BI", "Power Query", "DAX", "KPIs"],
  },
];

export default function Projects() {
  return (
    <>
      <style>{css}</style>
      <section id="projects">
        <h2>Projects</h2>
        <div className="projects">
          {projects.map((p) => (
            <article className="project" key={p.title}>
              <h3>{p.title}</h3>
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <ul className="tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              {p.link && (
                <p style={{ marginTop: 16 }}>
                  <a className="btn ghost" href={p.link} target="_blank" rel="noopener noreferrer">
                    View project
                  </a>
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
