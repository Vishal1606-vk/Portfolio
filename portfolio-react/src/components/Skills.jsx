const css = `
.skills{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.skills h3{font-size:1.15rem;margin-bottom:12px}
.skills ul{list-style:none;margin:0;padding:0}
.skills li{padding:8px 0;border-bottom:1px solid var(--line)}
@media (max-width:760px){.skills{grid-template-columns:1fr}}
`;

const groups = [
  { title: "Data analysis", items: ["Python", "SQL", "Advanced Excel", "Google Sheets"] },
  { title: "Visualization and BI", items: ["Power BI", "Tableau", "Dashboard creation", "Reporting"] },
  { title: "Business support", items: ["Data storytelling", "Stakeholder reporting", "Process optimization", "Problem-solving"] },
];

export default function Skills() {
  return (
    <>
      <style>{css}</style>
      <section id="skills">
        <h2>Skills</h2>
        <div className="skills">
          {groups.map((g) => (
            <div key={g.title}>
              <h3>{g.title}</h3>
              <ul>
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
