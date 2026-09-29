import { useEffect, useState } from "react";
import Dashboard from "./Dashboard.jsx";

const css = `
.hero{display:grid;grid-template-columns:1.05fr 1fr;gap:48px;align-items:center}
.hero h1{font-size:clamp(2.8rem,7vw,5.2rem);letter-spacing:-.03em;background:linear-gradient(90deg,var(--ink),var(--cyan) 60%,var(--violet));-webkit-background-clip:text;background-clip:text;color:transparent}
.type{font-size:1.25rem;color:var(--cyan);margin:20px 0 16px;min-height:1.6em}
.type::after{content:"";display:inline-block;width:2px;height:1.1em;margin-left:4px;vertical-align:-.15em;background:var(--cyan);animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.btns{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
@media (prefers-reduced-motion:reduce){.type::after{animation:none}}
@media (max-width:900px){.hero{grid-template-columns:1fr}}
`;

const roles = ["Data Analyst", "Dashboard Builder", "Python and SQL Problem Solver"];

function useTypewriter(words) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(words[0]); return; }
    const t = setTimeout(() => {
      if (!del && text === word) return setDel(true);
      if (del && text === "") { setDel(false); return setI(i + 1); }
      setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, !del && text === word ? 1400 : del ? 35 : 70);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

export default function Hero() {
  const role = useTypewriter(roles);
  return (
    <>
      <style>{css}</style>
      <section className="section" id="top">
        <div className="container hero">
          <div>
            <h1>Vishal Kumar P</h1>
            <div className="type mono" aria-label="Data Analyst">{role}</div>
            <p>
              I turn messy business data into dashboards and clear recommendations. I work with Python,
              SQL, Excel, Power BI and Tableau, and I'm based in Bengaluru.
            </p>
            <p>Scroll down to see my projects, my internship at Zintlr, and how I work with data.</p>
            <div className="btns">
              <a className="btn primary" href="#projects">See my projects</a>
              <a className="btn" href="#contact">Contact me</a>
            </div>
          </div>
          <Dashboard />
        </div>
      </section>
    </>
  );
}
