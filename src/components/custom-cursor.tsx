"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type CursorState = "default" | "link" | "text";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isDesktop, setIsDesktop] = useState(false);

  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop || reduced) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      // Detect cursor state from element under cursor
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const isLink = el.closest("a, button, [role='button']");
        const isText = el.closest("p, h1, h2, h3, h4, h5, h6, span, li");
        if (isLink) setCursorState("link");
        else if (isText) setCursorState("text");
        else setCursorState("default");
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Ring lerp animation
    let raf: number;
    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        const size = cursorState === "link" ? 56 : cursorState === "text" ? 20 : 36;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, [isDesktop, reduced, cursorState]);

  if (!isDesktop || reduced) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{
          width: cursorState === "link" ? 4 : 8,
          height: cursorState === "link" ? 4 : 8,
          borderRadius: "50%",
          backgroundColor: "#6872D6",
          opacity: visible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, opacity 0.2s",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid #6872D6",
          backgroundColor: cursorState === "link" ? "rgba(104,114,214,0.06)" : "transparent",
          opacity: visible ? 0.8 : 0,
          transition: "width 0.3s, height 0.3s, opacity 0.2s, background-color 0.2s",
        }}
      />
    </>
  );
}
