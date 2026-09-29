import { useEffect, useRef } from "react";
import * as THREE from "three";

// Stars only. Three layers of soft round stars (far, middle, near).
// When you scroll they turn, rise and fly toward you at different speeds, and their color shifts.
// Change LAYERS to make the sky denser (count), bigger (size) or brighter (opacity).
const LAYERS = [
  { count: 1400, size: 0.14, opacity: 0.6, spread: 70 },
  { count: 600, size: 0.22, opacity: 0.75, spread: 60 },
  { count: 180, size: 0.4, opacity: 0.9, spread: 45 },
];

export default function Backdrop() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 14;

    const C = { a: new THREE.Color(), b: new THREE.Color(), c: new THREE.Color() };
    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      C.a.set(s.getPropertyValue("--cyan").trim());
      C.b.set(s.getPropertyValue("--violet").trim());
      C.c.set(s.getPropertyValue("--pink").trim());
    };
    readColors();
    const setPal = (target, p, shift = 0) => {
      const x = ((((p + shift) % 1) + 1) % 1) * 3, i = Math.floor(x);
      const L = [C.a, C.b, C.c, C.a];
      target.lerpColors(L[i], L[i + 1], x - i);
    };

    // round, soft star texture
    const cv = document.createElement("canvas");
    cv.width = cv.height = 64;
    const g = cv.getContext("2d");
    const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rg.addColorStop(0, "rgba(255,255,255,1)");
    rg.addColorStop(0.25, "rgba(255,255,255,.8)");
    rg.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(cv);

    const layers = LAYERS.map((L) => {
      const pos = new Float32Array(L.count * 3);
      for (let i = 0; i < pos.length; i++) pos[i] = (Math.random() - 0.5) * L.spread;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: L.size, map: tex, transparent: true, opacity: L.opacity, depthWrite: false });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      return pts;
    });

    let t = 0, cur = 0, target = 0, mx = 0, my = 0, raf = 0;
    const readScroll = () => {
      const m = document.documentElement.scrollHeight - window.innerHeight;
      target = m > 0 ? Math.min(1, Math.max(0, window.scrollY / m)) : 0;
    };
    const frame = () => {
      const p = cur;
      layers.forEach((s, i) => {
        s.rotation.y = p * Math.PI * (0.6 + i * 0.4) + t * (0.008 + i * 0.006);
        s.rotation.x = p * 0.5 * (i + 1) * 0.5;
        s.position.y = p * (8 + i * 10);
        s.position.z = p * (2 + i * 5);
        s.material.opacity = LAYERS[i].opacity * (0.85 + 0.15 * Math.sin(t * (0.8 + i * 0.5)));
        setPal(s.material.color, p, i * 0.3);
      });
      camera.position.x += (mx * 1.2 - camera.position.x) * 0.05;
      camera.position.y += (-my * 0.8 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    const loop = () => { t += 0.016; cur += (target - cur) * 0.06; frame(); raf = requestAnimationFrame(loop); };

    const onScroll = () => { readScroll(); if (still) { cur = target; frame(); } };
    const onMove = (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (still) frame();
    };
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden && !still) loop(); };
    const mo = new MutationObserver(() => { readColors(); if (still) frame(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    readScroll(); cur = target;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    if (!still) { window.addEventListener("pointermove", onMove); document.addEventListener("visibilitychange", onVis); loop(); }
    else frame();

    return () => {
      cancelAnimationFrame(raf); mo.disconnect();
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove); document.removeEventListener("visibilitychange", onVis);
      layers.forEach((s) => { s.geometry.dispose(); s.material.dispose(); });
      tex.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }} />;
}
