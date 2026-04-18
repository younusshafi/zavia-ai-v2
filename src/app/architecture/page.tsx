"use client";

import { FadeIn } from "@/components/motion";
import { Brain, Database, Workflow, Eye, Shield, Gauge } from "lucide-react";

const layers = [
  {
    icon: Brain,
    title: "Reasoning Layer",
    desc: "Claude sits at the core — handling reasoning, tool use, and multi-step orchestration. Every system is designed Claude-first, not LLM-agnostic.",
    tech: ["Claude Opus / Sonnet", "Tool use", "System prompts", "Structured output"],
  },
  {
    icon: Database,
    title: "Knowledge Layer",
    desc: "Hybrid retrieval combining vector search (pgvector) with keyword matching. Documents are chunked, embedded, and indexed with metadata for precision recall.",
    tech: ["Supabase pgvector", "Embeddings", "Hybrid search", "Metadata filtering"],
  },
  {
    icon: Workflow,
    title: "Orchestration Layer",
    desc: "n8n workflows handle the plumbing — triggers, routing, retries, and integrations. Config-driven so new use cases deploy without re-engineering.",
    tech: ["n8n", "Webhooks", "Queue management", "Error handling"],
  },
  {
    icon: Eye,
    title: "Observability Layer",
    desc: "Every LLM call is logged, every retrieval is scored, every decision is traceable. Built for debugging, evaluation, and continuous improvement.",
    tech: ["Logging", "Evaluation harnesses", "Cost tracking", "Latency monitoring"],
  },
  {
    icon: Shield,
    title: "Guardrails Layer",
    desc: "Input validation, output filtering, hallucination detection, and human-in-the-loop checkpoints. Enterprise-grade safety for regulated industries.",
    tech: ["Input sanitization", "Output filtering", "HITL checkpoints", "Audit trails"],
  },
  {
    icon: Gauge,
    title: "Delivery Layer",
    desc: "APIs, webhooks, WhatsApp, email, voice — systems meet users where they are. Multi-channel output with consistent quality.",
    tech: ["REST APIs", "WhatsApp", "Email", "Voice / Twilio"],
  },
];

export default function ArchitecturePage() {
  return (
    <div className="pt-28">
      <section className="py-20 relative overflow-hidden">
        <div className="ambient-blob w-[500px] h-[500px] bg-accent top-[-200px] left-[20%] animate-glow-pulse" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn>
            <span className="section-label">Architecture</span>
            <h1 className="font-heading text-display-sm mt-3 mb-6">
              Six layers.{" "}
              <span className="gradient-text-accent">One system.</span>
            </h1>
            <p className="text-muted text-body-lg max-w-2xl">
              Our reference architecture for production AI — from reasoning to delivery. Every layer is independently testable, observable, and replaceable.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Pipeline layout */}
          <div className="relative">
            {/* Vertical glowing line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/60 via-accent/30 to-accent/10" />
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 blur-sm bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />

            {/* Animated traveling dot */}
            <div
              className="absolute left-[22px] md:left-[30px] w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(104,114,214,0.6)] animate-travel-dot"
            />

            {/* Layers */}
            <div className="space-y-16">
              {layers.map((l, i) => (
                <FadeIn key={l.title} delay={i * 0.08}>
                  <div className="relative pl-16 md:pl-24">
                    {/* Horizontal connector */}
                    <div className="absolute left-6 md:left-8 top-6 w-8 md:w-14 h-0.5 bg-accent/30" />
                    {/* Dot on the vertical line */}
                    <div className="absolute left-[20px] md:left-[28px] top-[18px] w-3 h-3 rounded-full bg-deep border-2 border-accent/60" />

                    {/* Background number */}
                    <span className="absolute right-0 top-[-8px] font-heading text-[4rem] md:text-[5rem] font-bold text-accent/[0.06] leading-none select-none pointer-events-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Content */}
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

      {/* Traveling dot animation */}
      <style jsx>{`
        @keyframes travel-dot {
          0% { top: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-travel-dot {
          animation: travel-dot 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
