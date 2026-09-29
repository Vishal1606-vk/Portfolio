import { useEffect } from "react";

// 3D tilt: the boxes below lean toward your cursor, lift up, and get a moving glow and shadow.
// Add more boxes by adding their CSS class to SELECTORS. Tilt strength: change MAX_DEG.
const SELECTORS = ".project, .skills .group, .fact, .step, .dash";
const MAX_DEG = 12;

const css = `
html .tilt3d{position:relative;transform-style:preserve-3d;will-change:transform;
  transition:transform .5s cubic-bezier(.2,.8,.2,1),box-shadow .4s,border-color .25s}
html .tilt3d.hov{transition:transform .12s ease-out,box-shadow .3s,border-color .25s}
html .project.tilt3d{overflow:visible}
.project.tilt3d::before{border-radius:16px 16px 0 0}
.tilt3d::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;
  background:radial-gradient(360px circle at var(--gx,50%) var(--gy,50%),color-mix(in srgb,var(--cyan) 20%,transparent),transparent 55%)}
.tilt3d.hov::after{opacity:1}
.tilt3d > *{transition:transform .3s}
.tilt3d.hov > *{transform:translateZ(22px)}
`;

export default function Tilt() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = document.querySelectorAll(SELECTORS);
    els.forEach((el) => el.classList.add("tilt3d"));
    let cur = null;

    const reset = (el) => {
      el.classList.remove("hov");
      el.style.transform = "";
      el.style.boxShadow = "";
    };
    const inside = (el, e, pad) => {
      const r = el.getBoundingClientRect();
      return e.clientX >= r.left - pad && e.clientX <= r.right + pad && e.clientY >= r.top - pad && e.clientY <= r.bottom + pad;
    };
    const move = (e) => {
      // keep the current box while the cursor is near it (avoids flicker at the edges)
      if (cur && !inside(cur, e, 10)) { reset(cur); cur = null; }
      if (!cur) {
        const el = e.target.closest?.(SELECTORS);
        if (!el) return;
        cur = el;
      }
      const r = cur.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      const m = Math.max(3.5, Math.min(MAX_DEG, 5000 / r.width)); // big boxes tilt less
      const rY = (x - 0.5) * 2 * m, rX = -(y - 0.5) * 2 * m;
      cur.classList.add("hov");
      cur.style.transform = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.03,1.03,1.03)`;
      cur.style.boxShadow = `${-rY * 1.5}px ${rX * 1.5 + 16}px 36px rgba(0,0,0,.32), 0 0 28px color-mix(in srgb,var(--cyan) 22%,transparent)`;
      cur.style.setProperty("--gx", e.clientX - r.left + "px");
      cur.style.setProperty("--gy", e.clientY - r.top + "px");
    };
    const clear = () => { if (cur) { reset(cur); cur = null; } };

    window.addEventListener("pointermove", move);
    window.addEventListener("scroll", clear, { passive: true });
    document.addEventListener("pointerleave", clear);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", clear);
      document.removeEventListener("pointerleave", clear);
      els.forEach((el) => { reset(el); el.classList.remove("tilt3d"); });
    };
  }, []);

  return <style>{css}</style>;
}
