// The .tl (timeline) styles here are also used by Education.jsx.
const css = `
.tl{position:relative;padding:0 0 0 30px;border-left:2px solid var(--line)}
.tl::before{content:"";position:absolute;left:-7px;top:6px;width:12px;height:12px;border-radius:50%;background:var(--cyan);box-shadow:0 0 14px var(--cyan)}
.tl+.tl{margin-top:34px}
.tl h3{font-size:1.4rem;margin-bottom:4px}
.tl h4{margin:20px 0 6px;font-size:.9rem;color:var(--muted);font-weight:500}
.tl ul{margin:8px 0 0;padding-left:1.2em;color:var(--soft)}
.tl li{margin-bottom:8px;max-width:80ch}
.tl .chips{display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:0;margin:8px 0 0}
.tl .chips li{margin:0;padding:3px 12px;border:1px solid var(--line);border-radius:99px;font:.82rem "IBM Plex Mono",monospace;color:var(--cyan)}
.when{color:var(--cyan);font:.9rem "IBM Plex Mono",monospace;margin-bottom:6px}
`;

export default function Experience() {
  return (
    <>
      <style>{css}</style>
      <section className="section" id="experience">
        <div className="container">
          <h2>Experience</h2>
          <div className="tl">
            <div className="when">March – April 2025</div>
            <h3>Data Analyst Intern, Zintlr</h3>
            <div style={{ color: "var(--muted)" }}>Bengaluru, India</div>
            <p style={{ marginTop: 12 }}>
              My first hands-on role as an analyst, working with the analytics team on real business data
              and presenting results to management.
            </p>
            <h4>What I did</h4>
            <ul>
              <li>Developed interactive dashboards and data visualizations in Tableau and Power BI to present findings to management.</li>
              <li>Worked with senior analysts on ad hoc analysis that supported business decisions and strategy.</li>
              <li>Helped collect, clean and prepare large datasets from diverse business sources so they were ready to analyze.</li>
            </ul>
            <h4>Tools and skills</h4>
            <ul className="chips"><li>Tableau</li><li>Power BI</li><li>Data cleaning</li><li>Ad hoc analysis</li><li>Reporting</li></ul>
          </div>
        </div>
      </section>
    </>
  );
}
