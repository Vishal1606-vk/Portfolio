import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

// Paste your three EmailJS values here (from emailjs.com). They are safe to be public.
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const css = `
.contact-card{padding:44px 36px;position:relative;overflow:hidden;display:grid;grid-template-columns:1fr 1.2fr;gap:44px;align-items:start}
.contact-card::before{content:"";position:absolute;inset:-40% 30% auto -10%;height:260px;background:radial-gradient(closest-side,rgba(139,92,246,.3),transparent);pointer-events:none}
.contact-card > *{position:relative}
.contact-card h2{margin-bottom:26px}
.links{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0 14px}
.form{display:grid;gap:16px}
.form label{display:grid;gap:6px;font-size:.92rem;color:var(--muted)}
.form input,.form textarea{width:100%;padding:12px 14px;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.05);color:var(--ink);font:inherit;transition:border-color .2s,box-shadow .2s}
.form textarea{min-height:150px;resize:vertical}
.form input:focus,.form textarea:focus{outline:none;border-color:var(--cyan);box-shadow:0 0 0 3px rgba(34,211,238,.18)}
.form button{justify-self:start;font:inherit;font-weight:700;cursor:pointer}
.form button:disabled{opacity:.6}
.status{margin:0;font-size:.95rem}
.status.ok{color:#4ADE80}
.status.err{color:#F87171}
@media (max-width:900px){.contact-card{grid-template-columns:1fr;padding:32px 22px}}
`;

export default function Contact() {
  const form = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const send = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, { publicKey: PUBLIC_KEY })
      .then(() => {
        setStatus("sent");
        form.current.reset();
      })
      .catch(() => setStatus("error"));
  };

  return (
    <>
      <style>{css}</style>
      <section className="section" id="contact">
        <div className="container">
          <div className="contact-card glass">
            <div>
              <h2>Contact</h2>
              <p>I'm open to data analyst and operations roles. Send me a message here, or reach me directly.</p>
              <div className="links">
                <a className="btn" href="mailto:vislog16@gmail.com">vislog16@gmail.com</a>
                <a className="btn" href="https://www.linkedin.com/in/vishal-kumar-p-7686a6327/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>

            <form className="form" ref={form} onSubmit={send}>
              <label>
                Your name
                <input type="text" name="from_name" required autoComplete="name" />
              </label>
              <label>
                Your email
                <input type="email" name="reply_to" required autoComplete="email" />
              </label>
              <label>
                Message
                <textarea name="message" required />
              </label>
              <button className="btn primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
              <p className="status ok" role="status" hidden={status !== "sent"}>
                Message sent. Thank you, I'll reply soon.
              </p>
              <p className="status err" role="alert" hidden={status !== "error"}>
                Something went wrong. Please email me directly at vislog16@gmail.com.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
