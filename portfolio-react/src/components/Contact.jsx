const css = `
.contact p{font-size:1.15rem}
.links{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0}
`;

export default function Contact() {
  return (
    <>
      <style>{css}</style>
      <section id="contact" className="contact">
        <h2>Contact</h2>
        <p>I'm open to data analyst and operations roles. Send me an email or connect on LinkedIn.</p>
        <div className="links">
          <a className="btn primary" href="mailto:vislog16@gmail.com">Email me</a>
          <a
            className="btn ghost"
            href="https://www.linkedin.com/in/vishal-kumar-p-7686a6327/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <p style={{ color: "var(--muted)" }}>vislog16@gmail.com</p>
      </section>
    </>
  );
}
