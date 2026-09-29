const css = `
.foot{color:var(--muted);font-size:.9rem;text-align:center}
.foot.section{padding-top:32px;padding-bottom:40px}
`;

export default function Footer() {
  return (
    <>
      <style>{css}</style>
      <footer className="section foot"><div className="container">© 2026 Vishal Kumar P</div></footer>
    </>
  );
}
