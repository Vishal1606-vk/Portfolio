import { useEffect } from "react";

// Colors, fonts, glass panels and buttons shared by every section.
const css = `
:root{
  --bg:#070B1A;--panel:rgba(255,255,255,.04);--line:rgba(255,255,255,.11);
  --ink:#E6ECFF;--muted:#8A97B8;--cyan:#22D3EE;--violet:#8B5CF6;--pink:#F472B6;
  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);
}
*,*::before,*::after{box-sizing:inherit}
html{scroll-behavior:smooth;scroll-padding-top:80px;background:var(--bg)}
body{margin:0;color:var(--ink);font:400 17px/1.65 "Space Grotesk",system-ui,sans-serif;
  background:
    radial-gradient(600px circle at var(--mx,70%) var(--my,10%),rgba(34,211,238,.13),transparent 60%),
    radial-gradient(900px circle at 10% 0%,rgba(139,92,246,.18),transparent 55%),
    linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px) 0 0/48px 48px,
    linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px) 0 0/48px 48px,
    var(--bg);
  background-attachment:fixed}
h1,h2,h3{line-height:1.1;margin:0;font-weight:700}
a{color:var(--cyan)}
:focus-visible{outline:2px solid var(--cyan);outline-offset:3px;border-radius:6px}
/* Every section: full width, 5% left/right, top/bottom 100px > 80px > 60px > 40px */
.section{padding:100px 5%}
/* Content box inside each section */
.container{width:100%;max-width:1440px;margin:0 auto}
h2{font-size:clamp(1.8rem,4vw,2.5rem);margin-bottom:34px}
h2::after{content:"";display:block;width:56px;height:3px;margin-top:14px;border-radius:3px;background:linear-gradient(90deg,var(--cyan),var(--violet));box-shadow:0 0 14px var(--cyan)}
p{max-width:64ch;margin:0 0 1em;color:#C3CCE6}
.glass{background:var(--panel);border:1px solid var(--line);border-radius:16px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.mono{font-family:"IBM Plex Mono",ui-monospace,monospace}
.btn{display:inline-block;padding:12px 24px;border-radius:10px;font-weight:700;text-decoration:none;border:1px solid var(--line);color:var(--ink);transition:box-shadow .2s,transform .2s}
.btn.primary{border:0;color:#04101A;background:linear-gradient(90deg,var(--cyan),var(--violet))}
.btn:hover{box-shadow:0 0 22px rgba(34,211,238,.45);transform:translateY(-2px)}
@media (max-width:1200px){.section{padding-top:80px;padding-bottom:80px}}
@media (max-width:992px){.section{padding-top:60px;padding-bottom:60px}}
@media (max-width:600px){.section{padding-top:40px;padding-bottom:40px}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.btn:hover{transform:none}}
`;

export default function Base() {
  // Soft glow that follows the mouse
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e) => {
      document.body.style.setProperty("--mx", e.clientX + "px");
      document.body.style.setProperty("--my", e.clientY + "px");
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <style>{css}</style>;
}
