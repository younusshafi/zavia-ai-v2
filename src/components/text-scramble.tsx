"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function TextScramble({
  text,
  className = "",
  delay = 0,
  speed = 30,
}: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState<string[]>(() => text.split("").map(() => "\u00A0"));
  const [resolved, setResolved] = useState<boolean[]>(() => text.split("").map(() => false));
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  // Start after delay when in view
  useEffect(() => {
    if (!inView || started) return;
    if (reduced) {
      setDisplay(text.split(""));
      setResolved(text.split("").map(() => true));
      setDone(true);
      setStarted(true);
      return;
    }
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [inView, delay, reduced, started, text]);

  // Resolve characters left to right
  useEffect(() => {
    if (!started || done || reduced) return;
    let resolveIndex = 0;
    const interval = setInterval(() => {
      // Skip spaces
      while (resolveIndex < text.length && text[resolveIndex] === " ") {
        resolveIndex++;
      }
      if (resolveIndex >= text.length) {
        setDone(true);
        clearInterval(interval);
        return;
      }
      setResolved((prev) => {
        const next = [...prev];
        next[resolveIndex] = true;
        return next;
      });
      setDisplay((prev) => {
        const next = [...prev];
        next[resolveIndex] = text[resolveIndex];
        return next;
      });
      resolveIndex++;
    }, speed);
    return () => clearInterval(interval);
  }, [started, done, text, speed, reduced]);

  // Cycle unresolved chars
  const rafRef = useRef<number>(0);
  const cycleUnresolved = useCallback(() => {
    if (done) return;
    setDisplay((prev) =>
      prev.map((ch, i) => {
        if (resolved[i] || text[i] === " ") return text[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
    );
    rafRef.current = requestAnimationFrame(cycleCallback);
  }, [done, resolved, text]);

  const cycleCallback = useCallback(() => {
    cycleUnresolved();
  }, [cycleUnresolved]);

  useEffect(() => {
    if (!started || done) return;
    let lastTime = 0;
    const animate = (time: number) => {
      if (time - lastTime > 50) {
        setDisplay((prev) =>
          prev.map((ch, i) => {
            if (resolved[i] || text[i] === " ") return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
        );
        lastTime = time;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, done, resolved, text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display.map((ch, i) => (
        <span
          key={i}
          className={resolved[i] ? "" : "text-muted"}
          style={{ transition: "color 0.1s" }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
