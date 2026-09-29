import { useEffect, useRef } from "react";

// Glowing dot cursor with a glitter trail. Click for a star burst.
// Change the colors in COLORS, or the star shape in STAR ("✦", "★", "✧", "•").
const COLORS = ["var(--cyan)", "var(--violet)", "var(--pink)", "var(--ink)"];
const STAR = "✦";

const css = `
.cur-dot{position:fixed;left:0;top:0;width:12px;height:12px;border-radius:50%;background:var(--ink);
  box-shadow:0 0 12px 3px var(--cyan),0 0 26px 6px var(--violet);pointer-events:none;z-index:9999;
  transform:translate(-50%,-50%);opacity:0;transition:width .15s,height .15s,opacity .2s}
.cur-dot.big{width:28px;height:28px}
.spark{position:fixed;pointer-events:none;z-index:9998;font-size:14px;line-height:1;
  animation:spark .85s ease-out forwards}
@keyframes spark{
  from{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(0)}
  to{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(.2) rotate(140deg)}}
@media (pointer:fine){html,html *{cursor:none!important}}
@media (pointer:coarse){.cur-dot{display:none}}
@media (prefers-reduced-motion:reduce){.spark{display:none}}
`;

export default function Cursor() {
  const dot = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let lastX = -100, lastY = -100;

    const spark = (x, y, spread = 1) => {
      const s = document.createElement("span");
      s.className = "spark";
      s.textContent = STAR;
      const c = COLORS[Math.floor(Math.random() * COLORS.length)];
      s.style.cssText = `left:${x}px;top:${y}px;color:${c};text-shadow:0 0 8px ${c};` +
        `font-size:${10 + Math.random() * 10}px;` +
        `--dx:${(Math.random() - 0.5) * 60 * spread}px;--dy:${10 + Math.random() * 40 * spread}px`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 900);
    };

    const move = (e) => {
      const d = dot.current;
      if (!d) return;
      d.style.opacity = 1;
      d.style.left = e.clientX + "px";
      d.style.top = e.clientY + "px";
      if (Math.hypot(e.clientX - lastX, e.clientY - lastY) > 18) {
        spark(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    const over = (e) => dot.current?.classList.toggle("big", !!e.target.closest?.("a,button"));
    const click = (e) => { for (let i = 0; i < 10; i++) spark(e.clientX, e.clientY, 2); };
    const leave = () => { if (dot.current) dot.current.style.opacity = 0; };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("click", click);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("click", click);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="cur-dot" ref={dot} aria-hidden="true" />
    </>
  );
}
