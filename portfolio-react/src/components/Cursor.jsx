import { useEffect, useRef } from "react";

// Shooting star cursor: a bright star head with a glowing tail that follows your path.
// Click for a small meteor burst. Tail length: TAIL_MS. Turned off on touch screens.
const TAIL_MS = 380;
const css = `@media (pointer:fine){html,html *{cursor:none!important}}`;

export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const c = ref.current, ctx = c.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, pos = null, trail = [], burst = [], big = 0, bigT = 0;
    const col = {};
    const hex = (s) => { const n = parseInt(s.replace("#", "").slice(0, 6), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
    const read = () => {
      const st = getComputedStyle(document.documentElement);
      col.a = hex(st.getPropertyValue("--cyan").trim());
      col.b = hex(st.getPropertyValue("--violet").trim());
      col.h = hex(st.getPropertyValue("--ink").trim());
    };
    const resize = () => {
      const d = window.devicePixelRatio || 1;
      c.width = window.innerWidth * d; c.height = window.innerHeight * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const mix = (f) => col.b.map((v, i) => Math.round(v + (col.a[i] - v) * f)).join(",");

    const move = (e) => {
      pos = { x: e.clientX, y: e.clientY };
      trail.push({ x: pos.x, y: pos.y, t: performance.now() });
    };
    const over = (e) => { bigT = e.target.closest?.("a,button,input,textarea") ? 1 : 0; };
    const click = (e) => {
      if (still) return;
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * 6.283 + Math.random() * 0.4, v = 2 + Math.random() * 3;
        burst.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1 });
      }
    };
    const leave = () => { pos = null; trail = []; };

    const loop = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      trail = trail.filter((p) => now - p.t < TAIL_MS);
      big += (bigT - big) * 0.2;
      ctx.lineCap = "round"; ctx.lineJoin = "round";

      // tail
      if (!still && trail.length > 1) {
        ctx.shadowColor = `rgba(${col.a.join(",")},.9)`; ctx.shadowBlur = 12;
        for (let i = 1; i < trail.length; i++) {
          const f = i / (trail.length - 1);
          ctx.strokeStyle = `rgba(${mix(f)},${0.1 + 0.8 * f})`;
          ctx.lineWidth = 1 + f * 4 * (1 + big * 0.5);
          ctx.beginPath(); ctx.moveTo(trail[i - 1].x, trail[i - 1].y); ctx.lineTo(trail[i].x, trail[i].y); ctx.stroke();
        }
      }
      // meteor burst
      burst = burst.filter((b) => b.life > 0);
      burst.forEach((b) => {
        b.x += b.vx; b.y += b.vy; b.life -= 0.035;
        ctx.strokeStyle = `rgba(${mix(b.life)},${b.life})`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x - b.vx * 6, b.y - b.vy * 6); ctx.stroke();
      });
      // star head
      if (pos) {
        const r = 3.5 + big * 3, fl = 10 + big * 8;
        ctx.shadowColor = `rgba(${col.a.join(",")},1)`; ctx.shadowBlur = 16;
        ctx.fillStyle = `rgb(${col.h.join(",")})`;
        ctx.beginPath(); ctx.arc(pos.x, pos.y, r, 0, 6.283); ctx.fill();
        ctx.strokeStyle = `rgba(${col.h.join(",")},.8)`; ctx.lineWidth = 1.2; ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(pos.x - fl, pos.y); ctx.lineTo(pos.x + fl, pos.y);
        ctx.moveTo(pos.x, pos.y - fl); ctx.lineTo(pos.x, pos.y + fl);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(loop);
    };

    read(); resize(); loop();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("click", click);
    window.addEventListener("resize", resize);
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf); mo.disconnect();
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over);
      window.removeEventListener("click", click); window.removeEventListener("resize", resize);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <style>{css}</style>
      <canvas ref={ref} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9999 }} />
    </>
  );
}
