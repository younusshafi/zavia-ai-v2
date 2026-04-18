"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let frameCount = 0;

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth / 2);
      canvas.height = Math.floor(window.innerHeight / 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouseMove);

    const blobs = [
      { x: 0.2, y: 0.3, r: 0.35, color: [104, 114, 214], opacity: 0.05, phase: 0 },
      { x: 0.7, y: 0.2, r: 0.3, color: [52, 211, 153], opacity: 0.03, phase: 2 },
      { x: 0.5, y: 0.7, r: 0.4, color: [104, 114, 214], opacity: 0.04, phase: 4 },
      { x: 0.3, y: 0.8, r: 0.25, color: [251, 191, 36], opacity: 0.02, phase: 1 },
    ];

    const animate = (time: number) => {
      frameCount++;
      // Skip every other frame on mobile
      const isMobile = window.innerWidth < 768;
      if (isMobile && frameCount % 2 !== 0) {
        raf = requestAnimationFrame(animate);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const t = reduced ? 0 : time / 1000;

      for (const blob of blobs) {
        const offsetX = reduced ? 0 : Math.sin(t * 0.3 + blob.phase) * 0.05;
        const offsetY = reduced ? 0 : Math.cos(t * 0.25 + blob.phase) * 0.05;

        // Subtle mouse influence
        const mx = reduced ? 0 : (mouseRef.current.x - 0.5) * 0.03;
        const my = reduced ? 0 : (mouseRef.current.y - 0.5) * 0.03;

        const cx = (blob.x + offsetX + mx) * w;
        const cy = (blob.y + offsetY + my) * h;
        const radius = blob.r * Math.max(w, h);

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(${blob.color.join(",")}, ${blob.opacity})`);
        gradient.addColorStop(1, `rgba(${blob.color.join(",")}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      if (!reduced) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%", opacity: 0.3 }}
    />
  );
}
