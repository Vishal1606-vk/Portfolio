const css = `
.hero{display:grid;grid-template-columns:1.3fr 1fr;gap:40px;align-items:center;padding:40px 0 80px}
.hero h1{font-size:clamp(2.8rem,8vw,5.2rem);font-weight:800;letter-spacing:-.02em}
.role{font:700 1.3rem "Bricolage Grotesque",sans-serif;color:var(--accent);margin:18px 0 14px}
.btns{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}
.bars{display:flex;align-items:flex-end;gap:14px;height:260px;padding:0 8px;border-bottom:3px solid var(--ink)}
.bars i{flex:1;background:var(--accent);border-radius:6px 6px 0 0;height:0;animation:grow .9s cubic-bezier(.2,.8,.2,1) forwards}
.bars i:nth-child(1){--h:38%;animation-delay:.05s}.bars i:nth-child(2){--h:62%;animation-delay:.15s}
.bars i:nth-child(3){--h:50%;animation-delay:.25s}.bars i:nth-child(4){--h:84%;background:var(--warm);animation-delay:.35s}
.bars i:nth-child(5){--h:70%;animation-delay:.45s}.bars i:nth-child(6){--h:96%;animation-delay:.55s}
@keyframes grow{to{height:var(--h)}}
@media (prefers-reduced-motion:reduce){.bars i{animation:none;height:var(--h)}}
@media (max-width:760px){.hero{grid-template-columns:1fr}.bars{height:170px}}
`;

export default function Hero() {
  return (
    <>
      <style>{css}</style>
      <header className="hero">
        <div>
          <h1>Vishal Kumar P</h1>
          <div className="role">Data Analyst · Bengaluru</div>
          <p>
            I turn messy business data into dashboards and clear recommendations. I work with
            Python, SQL, Excel, Power BI and Tableau.
          </p>
          <div className="btns">
            <a className="btn primary" href="#projects">See my projects</a>
            <a className="btn ghost" href="#contact">Contact me</a>
          </div>
        </div>
        <div className="bars" aria-hidden="true">
          <i /><i /><i /><i /><i /><i />
        </div>
      </header>
    </>
  );
}
