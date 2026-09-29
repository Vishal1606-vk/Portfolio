const css = `
.about{display:grid;grid-template-columns:1.2fr 1fr;gap:44px;align-items:start}
.facts{display:grid;gap:12px}
.fact{padding:16px 20px}
.fact b{display:block;font-size:1.15rem}
.fact span{color:var(--muted);font-size:.92rem}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px}
.step{padding:22px}
.step h3{font-size:1.1rem;margin-bottom:8px;color:var(--cyan)}
.step p{margin:0;font-size:.95rem}
@media (max-width:900px){.about{grid-template-columns:1fr}.steps{grid-template-columns:1fr}}
`;

export default function About() {
  return (
    <>
      <style>{css}</style>
      <section className="section" id="about">
        <div className="container">
          <h2>About</h2>
          <div className="about">
            <div>
              <p>
                I'm a Computer Science and Engineering graduate (B.Tech, 2026) from Jain University in
                Bengaluru. I like the part of analytics where a pile of raw numbers turns into a clear
                answer that someone can act on.
              </p>
              <p>
                My work follows the same path each time: collect and clean the data, explore and model it
                with Python, SQL and Excel, then present the result as a dashboard in Power BI or Tableau
                that a manager can read quickly.
              </p>
              <p>
                I interned as a data analyst at Zintlr, where I prepared datasets, built dashboards and
                supported ad hoc analysis. I'm now looking for a data analyst or operations role where I can
                keep learning from real business problems.
              </p>
            </div>
            <div className="facts">
              <div className="fact glass"><b>B.Tech, Computer Science</b><span>Jain University, 2022 to 2026 · CGPA 7.6</span></div>
              <div className="fact glass"><b>Data Analyst Intern</b><span>Zintlr, Bengaluru · March to April 2025</span></div>
              <div className="fact glass"><b>2 projects</b><span>Loan risk scoring and a Power BI sales dashboard</span></div>
            </div>
          </div>
          <div className="steps">
            <div className="step glass"><h3>Collect and clean</h3><p>Pull data from different sources, fix the gaps and inconsistencies, and get it ready for analysis.</p></div>
            <div className="step glass"><h3>Analyze and model</h3><p>Explore patterns with EDA, apply statistics and basic machine learning, and check that the numbers hold up.</p></div>
            <div className="step glass"><h3>Visualize and explain</h3><p>Build interactive dashboards and explain the findings in plain language for the people who decide.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
