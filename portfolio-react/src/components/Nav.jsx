const css = `
nav{display:flex;gap:22px;justify-content:flex-end;padding:20px 0;flex-wrap:wrap}
nav a{color:var(--muted);text-decoration:none;font-weight:600;font-size:.95rem}
nav a:hover{color:var(--accent)}
@media (max-width:760px){nav{justify-content:flex-start}}
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
      <nav aria-label="Sections">
        {links.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
    </>
  );
}
