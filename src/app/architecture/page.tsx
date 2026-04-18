"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
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
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="space-y-5" staggerDelay={0.08}>
            {layers.map((l, i) => (
              <StaggerItem key={l.title}>
                <div className="glass-card-hover rounded-2xl p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="font-mono text-accent text-sm w-6">{String(i + 1).padStart(2, "0")}</span>
                      <div className="w-12 h-12 rounded-xl bg-accent-subtle flex items-center justify-center">
                        <l.icon size={24} className="text-accent" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-h2 text-foreground mb-2">{l.title}</h3>
                      <p className="text-muted text-body leading-relaxed mb-4">{l.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {l.tech.map((t) => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
