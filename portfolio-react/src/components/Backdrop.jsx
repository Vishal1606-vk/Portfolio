import { useEffect, useRef } from "react";
import * as THREE from "three";

// 3D background (three.js). As you scroll, the shapes rotate and move and the colors shift:
// a wireframe core, floating data shapes, 3D bars and a particle field.
// Edit the numbers in the "look" section below to change how it feels.
export default function Backdrop() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      return; // no WebGL: page still works without the background
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 14;

    // theme colors
    const C = { a: new THREE.Color(), b: new THREE.Color(), c: new THREE.Color() };
    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      C.a.set(s.getPropertyValue("--cyan").trim());
      C.b.set(s.getPropertyValue("--violet").trim());
      C.c.set(s.getPropertyValue("--pink").trim());
    };
    readColors();
    const setPal = (target, p, shift = 0) => {
      const x = (((p + shift) % 1) + 1) % 1 * 3, i = Math.floor(x);
      const L = [C.a, C.b, C.c, C.a];
      target.lerpColors(L[i], L[i + 1], x - i);
    };

    // ---- look ----
    const wire = (o) => new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: o });

    const hero = new THREE.Mesh(new THREE.IcosahedronGeometry(3.2, 1), wire(0.35));
    const inner = new THREE.Mesh(new THREE.OctahedronGeometry(1.6), wire(0.5));
    scene.add(hero, inner);

    const N = 1600, pos = new Float32Array(N * 3);
    for (let i = 0; i < N * 3; i++) pos[i] = (Math.random() - 0.5) * 60;
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const points = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.09, transparent: true, opacity: 0.7, depthWrite: false }));
    scene.add(points);

    const bars = new THREE.Group();
    const barGeo = new THREE.BoxGeometry(0.7, 1, 0.7);
    for (let i = 0; i < 7; i++) {
      const m = new THREE.Mesh(barGeo, wire(0.45));
      m.position.x = (i - 3) * 1.2;
      m.userData = { h: 1.5 + Math.random() * 3.5, ph: Math.random() * 6 };
      bars.add(m);
    }
    bars.position.z = -6;
    scene.add(bars);

    const geos = [new THREE.BoxGeometry(1, 1, 1), new THREE.TetrahedronGeometry(0.9), new THREE.TorusGeometry(0.7, 0.22, 8, 20)];
    const floaters = Array.from({ length: 12 }, (_, i) => {
      const m = new THREE.Mesh(geos[i % 3], wire(0.4));
      m.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 22, (Math.random() - 0.5) * 20 - 4);
      m.userData = { y0: m.position.y, s: 0.003 + Math.random() * 0.01, i };
      scene.add(m);
      return m;
    });

    // ---- animation ----
    let t = 0, cur = 0, target = 0, mx = 0, my = 0, raf = 0;
    const readScroll = () => {
      const m = document.documentElement.scrollHeight - window.innerHeight;
      target = m > 0 ? Math.min(1, Math.max(0, window.scrollY / m)) : 0;
    };
    const frame = () => {
      const p = cur, k = Math.min(1, camera.aspect / 1.6);
      hero.position.set(Math.cos(p * Math.PI * 2) * 5.5 * k, Math.sin(p * Math.PI * 3) * 1.5, -2);
      hero.rotation.set(p * Math.PI * 4 + t * 0.1, p * Math.PI * 6 + t * 0.15, 0);
      inner.position.copy(hero.position);
      inner.rotation.set(-p * Math.PI * 6 - t * 0.2, t * 0.1, 0);
      points.rotation.y = p * Math.PI * 1.5 + t * 0.02;
      points.position.y = p * 12;
      bars.position.set((-9 + p * 14) * k, -4 + p * 2, -6);
      bars.rotation.y = p * Math.PI * 1.2;
      bars.children.forEach((m) => {
        const sy = m.userData.h * (0.55 + 0.45 * Math.sin(t * 0.8 + m.userData.ph + p * 8));
        m.scale.y = sy; m.position.y = sy / 2;
      });
      floaters.forEach((m) => {
        const { y0, s, i } = m.userData;
        m.rotation.x = p * (3 + (i % 4)) + t * s * 20;
        m.rotation.y = p * (2 + (i % 3)) + t * s * 14;
        m.position.y = y0 + p * (6 + (i % 5) * 1.5);
        setPal(m.material.color, p, i / 12);
      });
      setPal(hero.material.color, p);
      setPal(inner.material.color, p, 0.33);
      setPal(points.material.color, p, 0.5);
      setPal(bars.children[0].material.color, p, 0.15);
      bars.children.forEach((m, i) => i && m.material.color.copy(bars.children[0].material.color));
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
      scene.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.(); });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }} />;
}
