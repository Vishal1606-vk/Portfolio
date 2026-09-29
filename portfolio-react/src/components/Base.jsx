// Colors, fonts and styles shared by every section (buttons, headings, spacing).
// Change the colors here and the whole page updates.
const css = `
:root{
  --bg:#F3F6F9;--surface:#FFFFFF;--ink:#1B2733;--muted:#5A6B7B;--line:#D6DEE6;--accent:#0E5A8A;--accent-ink:#FFFFFF;--warm:#E8A33D;
  box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);
}
@media (prefers-color-scheme:dark){:root{--bg:#101A24;--surface:#182533;--ink:#E7EDF3;--muted:#98A8B8;--line:#2A3A4B;--accent:#6BB7E8;--accent-ink:#0B1620;--warm:#F0B44F}}
*,*::before,*::after{box-sizing:inherit}
html{scroll-behavior:smooth;scroll-padding-top:env(safe-area-inset-top,0px)}
body{margin:0;background:var(--bg);color:var(--ink);font:400 17px/1.65 "Source Sans 3",system-ui,sans-serif}
h1,h2,h3{font-family:"Bricolage Grotesque",system-ui,sans-serif;line-height:1.1;margin:0}
a{color:var(--accent)}
:focus-visible{outline:3px solid var(--warm);outline-offset:3px;border-radius:4px}
.wrap{max-width:1000px;margin:0 auto;padding:0 24px}
section{padding:72px 0;border-top:1px solid var(--line)}
h2{font-size:clamp(1.8rem,4vw,2.4rem);font-weight:700;margin-bottom:28px}
p{max-width:64ch;margin:0 0 1em}
.btn{display:inline-block;padding:12px 22px;border-radius:8px;font-weight:600;text-decoration:none;border:2px solid var(--accent)}
.btn.primary{background:var(--accent);color:var(--accent-ink)}
.btn.ghost{color:var(--accent)}
.btn:hover{transform:translateY(-2px)}
@media (max-width:760px){section{padding:52px 0}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.btn:hover{transform:none}}
`;

export default function Base() {
  return <style>{css}</style>;
}
