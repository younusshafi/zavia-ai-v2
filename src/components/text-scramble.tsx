"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const CHARS = "01_-~=+<>|/\\{}[]";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function TextScramble({
  text,
  className = "",
  delay = 100,
  speed = 18,
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
    const timer = setTimeout(() => setStarted(true), Math.min(delay, 100));
    return () => clearTimeout(timer);
  }, [inView, delay, reduced, started, text]);

  // Resolve characters left to right with weighted timing
  useEffect(() => {
    if (!started || done || reduced) return;

    // Build schedule: char index -> delay from start
    const schedule: { index: number; time: number }[] = [];
    let cumulative = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") continue;
      if (i === 0) {
        cumulative = 50; // first char resolves at 50ms
      } else if (i === 1) {
        cumulative = 80; // second char at 80ms
      } else {
        cumulative += speed;
      }
      schedule.push({ index: i, time: cumulative });
    }

    const timers = schedule.map(({ index, time }) =>
      setTimeout(() => {
        setResolved((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
        setDisplay((prev) => {
          const next = [...prev];
          next[index] = text[index];
          return next;
        });
        // Check if this is the last one
        if (index === schedule[schedule.length - 1].index) {
          setDone(true);
        }
      }, time)
    );

    return () => timers.forEach(clearTimeout);
  }, [started, done, text, speed, reduced]);

  // Cycle unresolved chars
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!started || done) return;
    let lastTime = 0;
    const animate = (time: number) => {
      if (time - lastTime > 40) {
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
          style={
            resolved[i]
              ? { transition: "opacity 0.15s" }
              : {
                  fontFamily: "'JetBrains Mono', monospace",
                  opacity: 0.4,
                  transition: "opacity 0.15s, font-family 0.1s",
                }
          }
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
