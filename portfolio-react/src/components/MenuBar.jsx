import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import logo from "../assets/vk-logo.png";

// macOS menu bar: logo + name + section links on the left, theme switch and clock on the right.
const css = `
.menubar{position:fixed;top:0;left:0;right:0;z-index:30;height:30px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;
  background:var(--bar);border-bottom:1px solid var(--line);backdrop-filter:blur(24px) saturate(1.6);-webkit-backdrop-filter:blur(24px) saturate(1.6);font-size:.85rem}
.menubar .left,.menubar .right{display:flex;align-items:center;gap:18px}
.menubar .brand{display:flex;align-items:center;gap:8px;color:var(--ink);font-weight:700;text-decoration:none}
.menubar .brand img{height:20px;width:auto;display:block}
.menubar .links{display:flex;gap:16px}
.menubar .links a{color:var(--ink);text-decoration:none;opacity:.8}
.menubar .links a:hover{opacity:1}
.menubar time{color:var(--ink);font-weight:500;white-space:nowrap}
@media (max-width:800px){.menubar .links{display:none}}
@media (max-width:420px){.menubar time{display:none}}
`;
const links = [["About", "#about"], ["Projects", "#projects"], ["Skills", "#skills"], ["Experience", "#experience"], ["Education", "#education"], ["Contact", "#contact"]];

export default function MenuBar() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const clock = now.toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
  return (
    <>
      <style>{css}</style>
      <header className="menubar">
        <div className="left">
          <a className="brand" href="#top" aria-label="Vishal Kumar P, back to top"><img src={logo} alt="VK" />Vishal</a>
          <nav className="links" aria-label="Sections">{links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</nav>
        </div>
        <div className="right">
          <ThemeToggle />
          <time>{clock}</time>
        </div>
      </header>
    </>
  );
}
