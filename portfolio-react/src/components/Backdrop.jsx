import { useEffect, useRef } from "react";

// Scroll-driven background. As you scroll down the page it morphs through 4 scenes:
// 1 line graphs  ->  2 bar chart  ->  3 SQL code rain  ->  4 data network.
// The glow color also shifts (cyan -> violet -> pink -> cyan). Drawn lightly so text stays sharp.
const SQL = ["SELECT region, SUM(revenue)", "FROM sales s", "JOIN customers c ON c.id = s.cid", "WHERE year = 2025", "GROUP BY region", "HAVING SUM(revenue) > 1000", "ORDER BY revenue DESC;", "LIMIT 10;", "COUNT(DISTINCT order_id)", "AVG(profit_margin)"];
const GLOW = ["--cyan", "--violet", "--pink", "--cyan"];
const SCENES = 4;

const rgba = (hex, a) => {
  const n = parseInt(hex.replace("#", "").slice(0, 6), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
};

export default function Backdrop() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, t = 0, cur = 0, target = 0;
    const col = {};
    const read = () => {
      const st = getComputedStyle(document.documentElement);
      ["--cyan", "--violet", "--pink", "--line", "--muted"].forEach((k) => (col[k] = st.getPropertyValue(k).trim()));
    };
    const nodes = Array.from({ length: 38 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.02, vy: (Math.random() - 0.5) * 0.02 }));
    const snips = Array.from({ length: 16 }, (_, i) => ({ text: SQL[i % SQL.length], x: 0.03 + ((i * 0.137) % 0.88), y: (i * 0.31) % 1, v: 0.008 + (i % 4) * 0.004 }));
    const readScroll = () => {
      const m = document.documentElement.scrollHeight - window.innerHeight;
      target = m > 0 ? Math.min(1, Math.max(0, window.scrollY / m)) : 0;
    };

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const x = cur * (SCENES - 1);
      const wt = (i) => Math.max(0, 1 - Math.abs(x - i));

      // glow that changes color while scrolling
      GLOW.forEach((k, i) => {
        const a = wt(i); if (a < 0.01) return;
        const gx = w * (i % 2 ? 0.2 : 0.8), gy = h * (0.25 + 0.2 * i % 1 + 0.15 * i);
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.6);
        g.addColorStop(0, rgba(col[k], 0.2 * a)); g.addColorStop(1, rgba(col[k], 0));
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      });

      // grid slides as you scroll
      ctx.lineWidth = 1; ctx.strokeStyle = col["--line"]; ctx.globalAlpha = 0.3;
      const off = (cur * h * 3) % 64;
      for (let gx = 0; gx < w; gx += 64) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); }
      for (let gy = -64 + off; gy < h; gy += 64) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }

      // scene 1: line graphs
      if (wt(0) > 0.01) {
        ctx.lineWidth = 2; ctx.globalAlpha = 0.32 * wt(0);
        [["--cyan", 0.62, 0.09, 0.004, 0.6], ["--violet", 0.42, 0.07, 0.006, 0.4]].forEach(([k, yy, a, f, s]) => {
          ctx.beginPath();
          for (let px = 0; px <= w; px += 8) {
            const py = h * yy + Math.sin((px + t * s * 40) * f) * h * a + Math.sin((px + t * s * 24) * f * 2.3) * h * a * 0.4;
            px ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
          }
          ctx.strokeStyle = col[k]; ctx.stroke();
        });
      }
      // scene 2: bar chart
      if (wt(1) > 0.01) {
        ctx.globalAlpha = 0.2 * wt(1);
        for (let i = 0, n = Math.ceil(w / 48); i < n; i++) {
          const bh = h * (0.12 + 0.3 * (0.5 + 0.5 * Math.sin(i * 0.65 + t * 0.6)));
          ctx.fillStyle = col[i % 3 ? "--cyan" : "--violet"];
          ctx.fillRect(i * 48 + 8, h - bh, 28, bh);
        }
      }
      // scene 3: SQL code rain
      if (wt(2) > 0.01) {
        ctx.font = '14px "IBM Plex Mono", monospace'; ctx.fillStyle = col["--cyan"]; ctx.globalAlpha = 0.34 * wt(2);
        snips.forEach((n) => ctx.fillText(n.text, n.x * w, ((((n.y - t * n.v) % 1) + 1) % 1) * h));
      }
      // scene 4: data network
      if (wt(3) > 0.01) {
        nodes.forEach((n) => { n.x = (n.x + n.vx / 60 + 1) % 1; n.y = (n.y + n.vy / 60 + 1) % 1; });
        ctx.lineWidth = 1; ctx.strokeStyle = col["--pink"]; ctx.globalAlpha = 0.28 * wt(3);
        for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
          const dx = (nodes[i].x - nodes[j].x) * w, dy = (nodes[i].y - nodes[j].y) * h;
          if (dx * dx + dy * dy < 24000) { ctx.beginPath(); ctx.moveTo(nodes[i].x * w, nodes[i].y * h); ctx.lineTo(nodes[j].x * w, nodes[j].y * h); ctx.stroke(); }
        }
        ctx.fillStyle = col["--cyan"]; ctx.globalAlpha = 0.6 * wt(3);
        nodes.forEach((n) => { ctx.beginPath(); ctx.arc(n.x * w, n.y * h, 3, 0, 6.283); ctx.fill(); });
      }
      ctx.globalAlpha = 1;
    }

    const resize = () => {
      const d = window.devicePixelRatio || 1;
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      readScroll(); if (still) cur = target; draw();
    };
    const loop = () => { t += 1 / 60; cur += (target - cur) * 0.08; draw(); raf = requestAnimationFrame(loop); };
    const onScroll = () => { readScroll(); if (still) { cur = target; draw(); } };

    read(); resize();
    if (!still) loop();
    const mo = new MutationObserver(() => { read(); if (still) draw(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden && !still) loop(); };
    document.addEventListener("visibilitychange", vis);
    return () => {
      cancelAnimationFrame(raf); mo.disconnect();
      window.removeEventListener("resize", resize); window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none" }} />;
}
