// The .tl (timeline) styles here are also used by Education.jsx.
const css = `
.tl{position:relative;padding:0 0 0 30px;border-left:2px solid var(--line)}
.tl::before{content:"";position:absolute;left:-7px;top:6px;width:12px;height:12px;border-radius:50%;background:var(--cyan);box-shadow:0 0 14px var(--cyan)}
.tl+.tl{margin-top:34px}
.tl h3{font-size:1.3rem;margin-bottom:4px}
.tl ul{margin:12px 0 0;padding-left:1.2em;color:#C3CCE6}
.tl li{margin-bottom:8px;max-width:70ch}
.when{color:var(--cyan);font:.9rem "IBM Plex Mono",monospace;margin-bottom:6px}
`;

export default function Experience() {
  return (
    <>
      <style>{css}</style>
      <section className="section" id="experience"><div className="container">
        <h2>Experience</h2>
        <div className="tl">
          <div className="when">March – April 2025</div>
          <h3>Data Analyst Intern, Zintlr</h3>
          <div style={{ color: "var(--muted)" }}>Bengaluru, India</div>
          <ul>
            <li>Developed interactive dashboards and visualizations in Tableau and Power BI to present findings to management.</li>
            <li>Worked with senior analysts on ad hoc analysis for business decisions and strategy.</li>
            <li>Helped collect, clean, and prepare large datasets from diverse business sources.</li>
          </ul>
        </div>
      </div></section>
    </>
  );
}
