const css = `
.projects{display:grid;gap:22px}
.project{padding:30px;position:relative;overflow:hidden;transition:border-color .25s,box-shadow .25s}
.project::before{content:"";position:absolute;inset:0 0 auto 0;height:3px;background:linear-gradient(90deg,var(--cyan),var(--violet))}
.project:nth-child(2)::before{background:linear-gradient(90deg,var(--violet),var(--pink))}
.project:hover{border-color:var(--cyan)}
.project h3{font-size:1.5rem;margin-bottom:10px}
.project .sum{color:var(--ink);font-size:1.05rem;max-width:80ch}
.project h4{margin:18px 0 8px;font-size:.9rem;color:var(--muted);font-weight:500}
.project > ul:not(.tags){margin:0 0 18px;padding-left:1.2em;color:var(--soft)}
.project li{margin-bottom:8px;max-width:80ch}
.tags{display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:0;margin:0}
.project .tags li{margin:0;padding:3px 12px;border:1px solid var(--line);border-radius:99px;font:.82rem "IBM Plex Mono",monospace;color:var(--cyan);background:color-mix(in srgb,var(--cyan) 8%,transparent)}
`;

// To add a project, copy one object below and change the text.
// Optional: add  link: "https://github.com/..."  to show a "View project" button.
const projects = [
  {
    title: "Smart Loan Lending Ally",
    summary: "A tool that helps judge loan applications by scoring each applicant's risk and showing what drives approval.",
    points: [
      "Analyzes applicant financial data to predict how likely a loan is to be approved and to flag risk factors.",
      "Uses statistical modeling and basic machine learning for credit risk scoring.",
      "Includes exploratory data analysis and preprocessing to clean and structure the applicant datasets.",
      "Dashboards show lending trends, approval rates and risk segments, so decisions are easier to explain.",
    ],
    tags: ["Python", "Machine learning", "EDA", "Dashboards"],
  },
  {
    title: "Power BI Sales & Business Performance Dashboard",
    summary: "One interactive dashboard where a business can see sales, revenue and performance by region and over time.",
    points: [
      "Tracks sales, revenue and business performance across regions and time periods.",
      "Connects and transforms data from multiple sources with Power Query, then models the relationships so filters cross-filter correctly.",
      "DAX measures calculate KPIs such as revenue growth, profit margin and customer retention.",
      "Built to support data-driven decisions, with every visual updating together when you filter.",
    ],
    tags: ["Power BI", "Power Query", "DAX", "KPIs"],
  },
];

export default function Projects() {
  return (
    <>
      <style>{css}</style>
      <section className="section" id="projects">
        <div className="container">
          <h2>Projects</h2>
          <div className="projects">
            {projects.map((p) => (
              <article className="project glass" key={p.title}>
                <h3>{p.title}</h3>
                <p className="sum">{p.summary}</p>
                <h4>What it does</h4>
                <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                <h4>Tools used</h4>
                <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                {p.link && (
                  <p style={{ marginTop: 18 }}>
                    <a className="btn" href={p.link} target="_blank" rel="noopener noreferrer">View project</a>
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
