import { useEffect } from "react";
import Lenis from "lenis";

// Smooth (buttery) page scrolling with Lenis. It does not change the cursor.
// Slower/faster: change "duration" (seconds). Turned off for people who prefer reduced motion.
const css = `
html.lenis,html.lenis body{height:auto}
.lenis.lenis-smooth{scroll-behavior:auto!important}
.lenis.lenis-stopped{overflow:hidden}
`;

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let raf = 0;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    // nav links (#projects, #contact...) glide smoothly too
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      const id = a?.getAttribute("href");
      const el = id && id.length > 1 ? document.querySelector(id) : null;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <style>{css}</style>;
}
