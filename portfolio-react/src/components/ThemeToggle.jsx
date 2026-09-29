import { useEffect, useState } from "react";

const css = `
.tt{position:relative;width:62px;height:30px;padding:0;border-radius:99px;cursor:pointer;border:1px solid var(--cyan);
  background:linear-gradient(90deg,color-mix(in srgb,var(--violet) 25%,transparent),color-mix(in srgb,var(--cyan) 25%,transparent));
  box-shadow:0 0 14px color-mix(in srgb,var(--cyan) 40%,transparent),inset 0 0 8px color-mix(in srgb,var(--cyan) 25%,transparent);transition:box-shadow .3s}
.tt:hover{box-shadow:0 0 22px color-mix(in srgb,var(--cyan) 65%,transparent),inset 0 0 8px color-mix(in srgb,var(--cyan) 25%,transparent)}
.tt .knob{position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;color:var(--on);
  background:linear-gradient(135deg,var(--cyan),var(--violet));box-shadow:0 0 10px var(--cyan);transition:transform .3s cubic-bezier(.3,1.4,.5,1)}
.tt[aria-checked="true"] .knob{transform:translateX(32px)}
.tt svg{width:14px;height:14px}
@media (prefers-reduced-motion:reduce){.tt .knob{transition:none}}
`;

const Moon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" /></svg>;
const Sun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" fill="currentColor" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
  </svg>
);

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch (e) { /* ignore */ }
  }, [theme]);
  const light = theme === "light";
  return (
    <>
      <style>{css}</style>
      <button className="tt" role="switch" aria-checked={light} aria-label="Switch between dark and light theme" onClick={() => setTheme(light ? "dark" : "light")}>
        <span className="knob">{light ? <Sun /> : <Moon />}</span>
      </button>
    </>
  );
}
