import { useEffect, useState } from "react";

const css = `
.hero{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center}
.hero h1{font-size:clamp(2.8rem,8vw,5.4rem);letter-spacing:-.03em;background:linear-gradient(90deg,#fff,var(--cyan) 60%,var(--violet));-webkit-background-clip:text;background-clip:text;color:transparent}
.type{font-size:1.25rem;color:var(--cyan);margin:20px 0 16px;min-height:1.6em}
.type::after{content:"";display:inline-block;width:2px;height:1.1em;margin-left:4px;vertical-align:-.15em;background:var(--cyan);animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.btns{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
.chart{padding:18px}
.chart svg{display:block;width:100%;height:auto}
.chart .line{stroke-dasharray:1;stroke-dashoffset:1;animation:draw 2.2s .3s ease-out forwards}
.chart .area{opacity:0;animation:fade 1s 1.6s forwards}
.chart .dot{opacity:0;animation:fade .4s forwards}
@keyframes draw{to{stroke-dashoffset:0}}
@keyframes fade{to{opacity:1}}
@media (prefers-reduced-motion:reduce){.chart .line{animation:none;stroke-dashoffset:0}.chart .area,.chart .dot{animation:none;opacity:1}.type::after{animation:none}}
@media (max-width:760px){.hero{grid-template-columns:1fr}}
`;

const roles = ["Data Analyst", "Dashboard Builder", "Python and SQL Problem Solver"];

function useTypewriter(words) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) { setText(words[0]); return; }
    const t = setTimeout(
      () => {
        if (!del && text === word) return setDel(true);
        if (del && text === "") { setDel(false); return setI(i + 1); }
        setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      },
      !del && text === word ? 1400 : del ? 35 : 70
    );
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

export default function Hero() {
  const role = useTypewriter(roles);
  return (
    <>
      <style>{css}</style>
      <section className="section" id="top"><div className="container hero">
        <div>
          <h1>Vishal Kumar P</h1>
          <div className="type mono" aria-label="Data Analyst">{role}</div>
          <p>
            I turn messy business data into dashboards and clear recommendations, using Python,
            SQL, Excel, Power BI and Tableau. Based in Bengaluru.
          </p>
          <div className="btns">
            <a className="btn primary" href="#projects">See my projects</a>
            <a className="btn" href="#contact">Contact me</a>
          </div>
        </div>
        <div className="chart glass" aria-hidden="true">
          <svg viewBox="0 0 400 260">
            <defs>
              <linearGradient id="ln" x1="0" x2="1"><stop offset="0" stopColor="#22D3EE" /><stop offset="1" stopColor="#8B5CF6" /></linearGradient>
              <linearGradient id="ar" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#22D3EE" stopOpacity=".3" /><stop offset="1" stopColor="#22D3EE" stopOpacity="0" /></linearGradient>
              <filter id="gl"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            {[50, 100, 150, 200].map((y) => (
              <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(255,255,255,.08)" />
            ))}
            <path className="area" d="M0 210 C40 200 70 150 110 160 S180 90 220 110 S300 40 340 60 S380 30 400 20 L400 260 L0 260Z" fill="url(#ar)" />
            <path className="line" pathLength="1" d="M0 210 C40 200 70 150 110 160 S180 90 220 110 S300 40 340 60 S380 30 400 20" fill="none" stroke="url(#ln)" strokeWidth="4" strokeLinecap="round" filter="url(#gl)" />
            {[[110, 160, 1.2], [220, 110, 1.7], [340, 60, 2.1]].map(([x, y, d]) => (
              <circle key={x} className="dot" cx={x} cy={y} r="6" fill="#070B1A" stroke="#22D3EE" strokeWidth="3" style={{ animationDelay: d + "s" }} />
            ))}
          </svg>
        </div>
      </div></section>
    </>
  );
}
