import { useEffect, useRef, useState } from "react";

// macOS dock: icons grow as the cursor gets close. Click one to glide to that section.
const css = `
.dock{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:30;display:flex;align-items:flex-end;gap:10px;padding:8px 12px;border-radius:24px;
  background:var(--bar);border:1px solid var(--line);backdrop-filter:blur(24px) saturate(1.6);-webkit-backdrop-filter:blur(24px) saturate(1.6);box-shadow:0 10px 30px rgba(0,0,0,.25)}
.dock a{position:relative;display:grid;place-items:center;width:50px;height:50px;border-radius:13px;font-size:26px;text-decoration:none;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 2px 6px rgba(0,0,0,.25);transition:transform .14s ease-out;transform-origin:bottom center}
.dock a::after{content:attr(data-label);position:absolute;bottom:calc(100% + 12px);left:50%;transform:translateX(-50%);padding:3px 10px;border-radius:8px;
  background:var(--bar);border:1px solid var(--line);color:var(--ink);font-size:.78rem;font-weight:500;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .15s}
.dock a:hover::after{opacity:1}
.dock a.on::before{content:"";position:absolute;bottom:-7px;left:50%;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--ink)}
@media (max-width:600px){.dock{gap:6px;padding:6px 8px}.dock a{width:40px;height:40px;font-size:21px;border-radius:11px}}
`;
const items = [
  ["top", "Home", "🏠", "#4FACFE,#00C6FB"],
  ["about", "About", "👤", "#F093FB,#F5576C"],
  ["projects", "Projects", "🗂️", "#FDC830,#F37335"],
  ["skills", "Skills", "⚡", "#A18CD1,#8E7CC3"],
  ["experience", "Experience", "💼", "#43E97B,#2BB89B"],
  ["education", "Education", "🎓", "#FA709A,#F9A03F"],
  ["contact", "Contact", "✉️", "#667EEA,#764BA2"],
];

export default function Dock() {
  const refs = useRef([]);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    items.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const fine = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
  const move = (e) => {
    if (!fine) return;
    refs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      const s = 1 + 0.7 * Math.exp(-(d * d) / (2 * 60 * 60));
      el.style.transform = `translateY(${-(s - 1) * 16}px) scale(${s})`;
    });
  };
  const leave = () => refs.current.forEach((el) => el && (el.style.transform = ""));

  return (
    <>
      <style>{css}</style>
      <nav className="dock" aria-label="Dock" onPointerMove={move} onPointerLeave={leave}>
        {items.map(([id, label, icon, grad], i) => (
          <a key={id} href={"#" + id} data-label={label} aria-label={label} className={active === id ? "on" : ""}
             ref={(el) => (refs.current[i] = el)} style={{ background: `linear-gradient(145deg,${grad.split(",")[0]},${grad.split(",")[1]})` }}>
            {icon}
          </a>
        ))}
      </nav>
    </>
  );
}
