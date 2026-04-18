"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });
  const rotateX = useSpring(0, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 100;

    if (dist < maxDist) {
      const factor = 1 - dist / maxDist;
      x.set(dx * factor * 0.15);
      y.set(dy * factor * 0.15);
      rotateX.set(-(dy * factor * 0.08));
      rotateY.set(dx * factor * 0.08);
    } else {
      x.set(0);
      y.set(0);
      rotateX.set(0);
      rotateY.set(0);
    }

    // Glow position relative to button
    const relX = ((e.clientX - rect.left) / rect.width) * 100;
    const relY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x: relX, y: relY });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={{ padding: "40px", margin: "-40px" }}
    >
      <motion.div
        ref={ref}
        className={`relative ${className}`}
        style={{
          x: reduced ? 0 : x,
          y: reduced ? 0 : y,
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          perspective: 600,
        }}
      >
        {children}
        {!reduced && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none opacity-0 hover-parent-glow transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(104,114,214,0.3) 0%, transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
