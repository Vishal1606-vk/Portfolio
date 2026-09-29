// The .job and .when styles here are also used by Education.jsx.
const css = `
.job{display:grid;grid-template-columns:200px 1fr;gap:28px}
.job h3{font-size:1.3rem;margin-bottom:4px}
.job ul{margin:0 0 16px;padding-left:1.2em}
.job li{margin-bottom:8px;max-width:70ch}
.job+.job{margin-top:36px}
.when{color:var(--muted);font-weight:600}
@media (max-width:760px){.job{grid-template-columns:1fr;gap:6px}}
`;

export default function Experience() {
  return (
    <>
      <style>{css}</style>
      <section id="experience">
        <h2>Experience</h2>
        <div className="job">
          <div className="when">March – April 2025</div>
          <div>
            <h3>Data Analyst Intern, Zintlr</h3>
            <div className="when" style={{ marginBottom: 12 }}>Bengaluru, India</div>
            <ul>
              <li>Developed interactive dashboards and visualizations in Tableau and Power BI to present findings to management.</li>
              <li>Worked with senior analysts on ad hoc analysis for business decisions and strategy.</li>
              <li>Helped collect, clean, and prepare large datasets from diverse business sources.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
