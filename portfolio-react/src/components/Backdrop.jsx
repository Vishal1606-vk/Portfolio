import { useEffect, useRef } from "react";

// Calm animated background: slow moving line graphs, a faint grid and drifting SQL lines.
// It is drawn very lightly behind the content, so text stays sharp and easy to read.
const SQL = ["SELECT region, SUM(revenue)", "FROM sales", "WHERE year = 2025", "GROUP BY region;", "ORDER BY revenue DESC;", "LIMIT 10;"];
const SERIES = [
  { c: "--cyan", y: 0.66, a: 0.09, f: 0.004, s: 0.6 },
  { c: "--violet", y: 0.46, a: 0.07, f: 0.006, s: 0.4 },
];

export default function Backdrop() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, t = 0;
    const col = {};
    const read = () => {
      const st = getComputedStyle(document.documentElement);
      ["--cyan", "--violet", "--line", "--muted"].forEach((k) => (col[k] = st.getPropertyValue(k).trim()));
    };
    const resize = () => {
      const d = window.devicePixelRatio || 1;
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * d; c.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      draw();
    };
    const snips = SQL.map((text, i) => ({ text, x: 0.08 + ((i * 0.17) % 0.85), y: i / SQL.length, v: 0.008 + (i % 3) * 0.004 }));
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1; ctx.strokeStyle = col["--line"]; ctx.globalAlpha = 0.35;
      for (let x = 0; x < w; x += 64) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      ctx.lineWidth = 2; ctx.globalAlpha = 0.3;
      SERIES.forEach((s) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y = h * s.y + Math.sin((x + t * s.s * 40) * s.f) * h * s.a + Math.sin((x + t * s.s * 24) * s.f * 2.3) * h * s.a * 0.4;
          x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.strokeStyle = col[s.c]; ctx.stroke();
      });
      ctx.font = '13px "IBM Plex Mono", monospace'; ctx.fillStyle = col["--muted"]; ctx.globalAlpha = 0.3;
      snips.forEach((n) => ctx.fillText(n.text, n.x * w, ((((n.y - t * n.v) % 1) + 1) % 1) * h));
      ctx.globalAlpha = 1;
    }
    const loop = () => { t += 1 / 60; draw(); raf = requestAnimationFrame(loop); };
    read(); resize();
    if (!still) loop();
    const mo = new MutationObserver(() => { read(); if (still) draw(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", resize);
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden && !still) loop(); };
    document.addEventListener("visibilitychange", vis);
    return () => { cancelAnimationFrame(raf); mo.disconnect(); window.removeEventListener("resize", resize); document.removeEventListener("visibilitychange", vis); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none" }} />;
}
