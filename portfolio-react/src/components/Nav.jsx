const css = `
.nav-outer{position:sticky;top:12px;z-index:10;padding:16px 5% 0}
.nav{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 18px}
.nav .brand{font-weight:700;letter-spacing:.04em;color:var(--ink);text-decoration:none}
.nav .brand span{color:var(--cyan)}
.nav .links{display:flex;gap:20px;flex-wrap:wrap}
.nav .links a{color:var(--muted);text-decoration:none;font-size:.95rem}
.nav .links a:hover{color:var(--cyan)}
@media (max-width:760px){.nav .links{display:none}}
`;

const links = [
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Education", "#education"],
  ["Contact", "#contact"],
];

export default function Nav() {
  return (
    <>
      <style>{css}</style>
      <div className="nav-outer"><div className="container">
      <nav className="nav glass" aria-label="Sections">
        <a className="brand" href="#top">VK<span>.</span>analyst</a>
        <div className="links">
          {links.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
      </nav>
      </div></div>
    </>
  );
}
