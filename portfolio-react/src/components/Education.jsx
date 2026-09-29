// Styles (.tl, .when, .chips) come from Experience.jsx.
export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <h2>Education</h2>
        <div className="tl">
          <div className="when">2022 – 2026</div>
          <h3>B.Tech, Computer Science and Engineering</h3>
          <div style={{ color: "var(--muted)" }}>Jain University, Bengaluru, Karnataka · CGPA 7.6</div>
          <h4>What I've learned</h4>
          <ul>
            <li>Programming with Python and R to clean, explore and model data.</li>
            <li>SQL and databases: querying and combining data from different sources.</li>
            <li>Statistics and modeling, including basic machine learning for risk scoring.</li>
            <li>Data visualization and business intelligence with Power BI and Tableau, including Power Query and DAX.</li>
            <li>Turning analysis into clear recommendations and reports for stakeholders.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
