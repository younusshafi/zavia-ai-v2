"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function SectionDivider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="flex justify-center py-4">
      <motion.div
        className="h-px w-[200px] bg-accent/20"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: reduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "center" }}
      />
    </div>
  );
}
