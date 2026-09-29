const css = `
.contact-card{padding:44px 36px;text-align:center;position:relative;overflow:hidden}
.contact-card::before{content:"";position:absolute;inset:-40% 20% auto;height:220px;background:radial-gradient(closest-side,rgba(139,92,246,.35),transparent);pointer-events:none}
.contact-card h2::after{margin-left:auto;margin-right:auto}
.contact-card p{margin-left:auto;margin-right:auto;font-size:1.1rem}
.links{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin:26px 0 12px;position:relative}
`;

export default function Contact() {
  return (
    <>
      <style>{css}</style>
      <section id="contact">
        <div className="contact-card glass">
          <h2>Contact</h2>
          <p>I'm open to data analyst and operations roles. Send me an email or connect on LinkedIn.</p>
          <div className="links">
            <a className="btn primary" href="mailto:vislog16@gmail.com">Email me</a>
            <a className="btn" href="https://www.linkedin.com/in/vishal-kumar-p-7686a6327/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <p className="mono" style={{ color: "var(--muted)", fontSize: ".95rem", marginBottom: 0 }}>vislog16@gmail.com</p>
        </div>
      </section>
    </>
  );
}
