import ThemeToggle from "./ThemeToggle.jsx";
import logo from "../assets/vk-logo.png";

const css = `
.nav-outer{position:sticky;top:12px;z-index:10;padding:16px 5% 0}
.nav{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 18px;background:var(--navbg)}
.nav .left{display:flex;align-items:center;gap:18px}
.nav .brand{display:flex;align-items:center;text-decoration:none}
.nav .brand img{display:block;height:36px;width:auto;filter:drop-shadow(0 0 8px rgba(255,190,60,.35))}
.nav .links{display:flex;gap:20px;flex-wrap:wrap}
.nav .links a{color:var(--muted);text-decoration:none;font-size:.95rem}
.nav .links a:hover{color:var(--cyan)}
@media (max-width:760px){.nav .links{display:none}}
`;

const links = [["Projects", "#projects"], ["Skills", "#skills"], ["Experience", "#experience"], ["Education", "#education"], ["Contact", "#contact"]];

export default function Nav() {
  return (
    <>
      <style>{css}</style>
      <div className="nav-outer">
        <div className="container">
          <nav className="nav glass" aria-label="Sections">
            <div className="left">
              <ThemeToggle />
              <a className="brand" href="#top" aria-label="Vishal Kumar P, back to top"><img src={logo} alt="VK" /></a>
            </div>
            <div className="links">{links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</div>
          </nav>
        </div>
      </div>
    </>
  );
}
