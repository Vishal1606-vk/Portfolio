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
    title: "Retail Sales Analytics",
    summary: "An end-to-end analysis of retail sales, from raw data to findings and business recommendations.",
    points: [
      "Cleans and prepares the raw data with pandas and analyzes it with SQL.",
      "Excel summaries and an interactive Power BI dashboard present the sales performance.",
      "Documents the data cleaning steps, key findings and recommendations.",
    ],
    tags: ["SQL", "pandas", "Excel", "Power BI"],
  },
  {
    title: "Customer Churn Analysis",
    summary: "Finds what is linked to customers leaving and predicts who is likely to leave.",
    points: [
      "Analyzes customer data with SQL and Python to identify the factors linked to churn.",
      "A logistic regression model predicts which customers are likely to leave, going beyond reporting to prediction.",
      "Findings are presented with recommendations for improving customer retention.",
    ],
    tags: ["SQL", "Python", "Logistic regression"],
  },
  {
    title: "Retail Sales KPI Dashboard",
    summary: "An interactive Power BI dashboard that tracks the key retail sales and business performance KPIs.",
    points: [
      "Tracks key retail sales and business performance KPIs in one report.",
      "DAX measures calculate the KPIs, and the report is designed so results can be filtered and compared.",
    ],
    tags: ["Power BI", "DAX", "KPIs"],
  },
  {
    title: "SQL Data Warehouse & ETL",
    summary: "A SQL data warehouse with ETL processes that turn source data into analysis-ready tables.",
    points: [
      "ETL processes extract, clean and transform source data.",
      "The warehouse is structured so the data can be used directly for reporting and analysis.",
    ],
    tags: ["SQL", "ETL", "Data warehousing"],
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
