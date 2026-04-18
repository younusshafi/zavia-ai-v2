"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const blobs = [
  { size: "w-[600px] h-[600px]", color: "bg-accent", top: "5%", left: "-5%", pulse: true, parallax: [-150, 0] as [number, number] },
  { size: "w-[500px] h-[500px]", color: "bg-emerald", top: "25%", left: "70%", pulse: false, parallax: [0, 120] as [number, number] },
  { size: "w-[400px] h-[400px]", color: "bg-accent", top: "50%", left: "30%", pulse: true, parallax: [0, -100] as [number, number] },
  { size: "w-[350px] h-[350px]", color: "bg-emerald", top: "70%", left: "-8%", pulse: false, parallax: [50, -80] as [number, number] },
  { size: "w-[300px] h-[300px]", color: "bg-accent", top: "85%", left: "60%", pulse: true, parallax: [0, 150] as [number, number] },
];

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();

  const y0 = useTransform(scrollYProgress, [0, 1], [`${blobs[0].parallax[0]}px`, `${blobs[0].parallax[1]}px`]);
  const y1 = useTransform(scrollYProgress, [0, 1], [`${blobs[1].parallax[0]}px`, `${blobs[1].parallax[1]}px`]);
  const y2 = useTransform(scrollYProgress, [0, 1], [`${blobs[2].parallax[0]}px`, `${blobs[2].parallax[1]}px`]);
  const y3 = useTransform(scrollYProgress, [0, 1], [`${blobs[3].parallax[0]}px`, `${blobs[3].parallax[1]}px`]);
  const y4 = useTransform(scrollYProgress, [0, 1], [`${blobs[4].parallax[0]}px`, `${blobs[4].parallax[1]}px`]);

  const transforms = [y0, y1, y2, y3, y4];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[120px] opacity-[0.05] ${blob.size} ${blob.color} ${blob.pulse ? "animate-glow-pulse" : ""}`}
          style={{
            top: blob.top,
            left: blob.left,
            y: transforms[i],
          }}
        />
      ))}
    </div>
  );
}
