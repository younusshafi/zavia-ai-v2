"use client";

import { useRef } from "react";
import { FadeIn } from "@/components/motion";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Brain, Database, Workflow, Eye, Shield, Gauge } from "lucide-react";
import TextScramble from "@/components/text-scramble";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const layers = [
  {
    icon: Brain,
    letter: "R",
    title: "Reasoning Layer",
    desc: "Claude sits at the core — handling reasoning, tool use, and multi-step orchestration. Every system is designed Claude-first, not LLM-agnostic.",
    tech: ["Claude Opus / Sonnet", "Tool use", "System prompts", "Structured output"],
  },
  {
    icon: Database,
    letter: "K",
    title: "Knowledge Layer",
    desc: "Hybrid retrieval combining vector search (pgvector) with keyword matching. Documents are chunked, embedded, and indexed with metadata for precision recall.",
    tech: ["Supabase pgvector", "Embeddings", "Hybrid search", "Metadata filtering"],
  },
  {
    icon: Workflow,
    letter: "O",
    title: "Orchestration Layer",
    desc: "n8n workflows handle the plumbing — triggers, routing, retries, and integrations. Config-driven so new use cases deploy without re-engineering.",
    tech: ["n8n", "Webhooks", "Queue management", "Error handling"],
  },
  {
    icon: Eye,
    letter: "B",
    title: "Observability Layer",
    desc: "Every LLM call is logged, every retrieval is scored, every decision is traceable. Built for debugging, evaluation, and continuous improvement.",
    tech: ["Logging", "Evaluation harnesses", "Cost tracking", "Latency monitoring"],
  },
  {
    icon: Shield,
    letter: "G",
    title: "Guardrails Layer",
    desc: "Input validation, output filtering, hallucination detection, and human-in-the-loop checkpoints. Enterprise-grade safety for regulated industries.",
    tech: ["Input sanitization", "Output filtering", "HITL checkpoints", "Audit trails"],
  },
  {
    icon: Gauge,
    letter: "D",
    title: "Delivery Layer",
    desc: "APIs, webhooks, WhatsApp, email, voice — systems meet users where they are. Multi-channel output with consistent quality.",
    tech: ["REST APIs", "WhatsApp", "Email", "Voice / Twilio"],
  },
];

function DiagramLayer({
  index,
  layer,
  isActive,
  isRevealed,
}: {
  index: number;
  layer: typeof layers[0];
  isActive: boolean;
  isRevealed: boolean;
}) {
  const y = 20 + index * 65;
  const reduced = useReducedMotion();

  return (
    <motion.g
      initial={{ opacity: 0, x: -30 }}
      animate={isRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Rounded rect */}
      <rect
        x={10}
        y={y}
        width={260}
        height={46}
        rx={12}
        fill={isActive ? "rgba(104, 114, 214, 0.12)" : "rgba(255, 255, 255, 0.03)"}
        stroke={isActive ? "#6872D6" : "rgba(255, 255, 255, 0.08)"}
        strokeWidth={isActive ? 1.5 : 1}
        style={{
          filter: isActive ? "drop-shadow(0 0 12px rgba(104,114,214,0.3))" : "none",
          transition: "all 0.4s ease",
        }}
      />
      {/* Icon circle */}
      <circle
        cx={36}
        cy={y + 23}
        r={12}
        fill="rgba(104, 114, 214, 0.15)"
        stroke="rgba(104, 114, 214, 0.3)"
        strokeWidth={1}
      />
      <text
        x={36}
        y={y + 27}
        textAnchor="middle"
        fill="#6872D6"
        fontSize={11}
        fontFamily="JetBrains Mono, monospace"
        fontWeight={500}
      >
        {layer.letter}
      </text>
      {/* Layer name */}
      <text
        x={60}
        y={y + 27}
        fill={isActive ? "#EDEDEF" : "#8A8F98"}
        fontSize={13}
        fontFamily="Outfit, sans-serif"
        fontWeight={isActive ? 600 : 400}
        style={{ transition: "fill 0.3s" }}
      >
        {layer.title}
      </text>
      {/* Number */}
      <text
        x={250}
        y={y + 27}
        textAnchor="end"
        fill="rgba(104, 114, 214, 0.3)"
        fontSize={11}
        fontFamily="JetBrains Mono, monospace"
      >
        {String(index + 1).padStart(2, "0")}
      </text>
      {/* Connecting line to next layer */}
      {index < 5 && isRevealed && (
        <motion.line
          x1={140}
          y1={y + 46}
          x2={140}
          y2={y + 65}
          stroke="#6872D6"
          strokeWidth={1.5}
          strokeOpacity={0.3}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: 0.3 }}
        />
      )}
    </motion.g>
  );
}

function ScrollLayerBlock({
  index,
  layer,
  onInView,
}: {
  index: number;
  layer: typeof layers[0];
  onInView: (i: number) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  const reduced = useReducedMotion();

  if (inView) {
    onInView(index);
  }

  return (
    <div ref={ref} className="min-h-[80vh] flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: reduced ? 0 : 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-accent text-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center">
            <layer.icon size={20} className="text-accent" />
          </div>
        </div>
        <h3 className="font-heading text-h2 text-foreground mb-3">{layer.title}</h3>
        <p className="text-muted text-body leading-relaxed mb-5 max-w-md">{layer.desc}</p>
        <div className="flex flex-wrap gap-2">
          {layer.tech.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function ArchitecturePage() {
  const activeRef = useRef(0);
  const reduced = useReducedMotion();

  // Use a state-like approach via a ref + forceUpdate trick
  // We'll use CSS-based approach instead for the diagram
  const setActive = (i: number) => {
    activeRef.current = i;
  };

  return (
    <div className="pt-28">
      <section className="py-20 relative overflow-hidden">
        <div className="ambient-blob w-[500px] h-[500px] bg-accent top-[-200px] left-[20%] animate-glow-pulse" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn>
            <span className="section-label">Architecture</span>
            <h1 className="font-heading text-display-sm mt-3 mb-6">
              Six layers.{" "}
              <TextScramble text="One system." className="gradient-text-accent" delay={400} speed={40} />
            </h1>
            <p className="text-muted text-body-lg max-w-2xl">
              Our reference architecture for production AI — from reasoning to delivery. Every layer is independently testable, observable, and replaceable.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Desktop: scroll-pinned reveal */}
      <section className="hidden lg:block py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-16">
            {/* Left: sticky SVG diagram */}
            <div className="relative">
              <div className="sticky top-[20vh]">
                <svg viewBox="0 0 280 420" className="w-full max-w-[320px]">
                  {layers.map((layer, i) => (
                    <DiagramLayer
                      key={layer.title}
                      index={i}
                      layer={layer}
                      isActive={true}
                      isRevealed={true}
                    />
                  ))}
                  {/* Traveling dot */}
                  {!reduced && (
                    <circle r={4} fill="#6872D6" opacity={0.8}>
                      <animate
                        attributeName="cy"
                        values="43;108;173;238;303;368;43"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.8;1;0.8;1;0.8;1;0.8"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="cx"
                        values="140;140;140;140;140;140;140"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </svg>
              </div>
            </div>

            {/* Right: scrolling content blocks */}
            <div>
              {layers.map((layer, i) => (
                <ScrollLayerBlock
                  key={layer.title}
                  index={i}
                  layer={layer}
                  onInView={setActive}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: sequential timeline */}
      <section className="lg:hidden py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/60 via-accent/30 to-accent/10" />

            <div className="space-y-16">
              {layers.map((l, i) => (
                <FadeIn key={l.title} delay={i * 0.08}>
                  <div className="relative pl-16">
                    <div className="absolute left-6 top-6 w-8 h-0.5 bg-accent/30" />
                    <div className="absolute left-[20px] top-[18px] w-3 h-3 rounded-full bg-deep border-2 border-accent/60" />

                    <span className="absolute right-0 top-[-8px] font-heading text-[4rem] font-bold text-accent/[0.06] leading-none select-none pointer-events-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center">
                          <l.icon size={20} className="text-accent" />
                        </div>
                        <h3 className="font-heading text-h2 text-foreground">{l.title}</h3>
                      </div>
                      <p className="text-muted text-body leading-relaxed mb-4">{l.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {l.tech.map((t) => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
