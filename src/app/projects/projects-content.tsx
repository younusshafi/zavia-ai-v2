"use client";

import { useState } from "react";
import Link from "next/link";
import { Plane, Car, GraduationCap, MessageSquare, FileSearch, Cpu, ShoppingCart, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "all", label: "All Projects", count: 7 },
  { id: "client", label: "Client & Commercial", count: 7 },
  { id: "telecom", label: "Enterprise Telecom", count: 2 },
  { id: "pipeline", label: "Upcoming Pipeline", count: 3 },
];

const projects = [
  {
    icon: Plane,
    categories: ["client", "pipeline"],
    tag: "Tourism · DMC",
    title: "Luban Tours & Travels Platform",
    status: "In Development",
    desc: "Full-scale DMC platform for an Oman-based tour operator: 16+ pages, 40+ dynamic tour listings, WP Travel Engine + Thawani payments, n8n automation, Arabic RTL, and a custom WordPress plugin (Docker deployment).",
    stack: ["WordPress", "Docker", "n8n", "Thawani", "Python FastAPI"],
  },
  {
    icon: Car,
    categories: ["client"],
    tag: "Fleet Management",
    title: "Car Rental Operating System (CROS)",
    status: "Pilot Phase",
    desc: "Executive-grade fleet management dashboard for North Kashmir operators. Real-time KPIs, RBAC, Supabase backend (15 tables, ~3K records). Mobile-first command center.",
    stack: ["React", "Tailwind", "Supabase", "Lovable"],
  },
  {
    icon: GraduationCap,
    categories: ["client"],
    tag: "Education",
    title: "SB Queen's International School",
    status: "Deployed",
    desc: "Premium institutional website built with React, Tailwind, and Framer Motion. Playfair typography, burgundy/gold theme, optimized for performance and accessibility.",
    stack: ["React", "Tailwind", "Framer Motion", "Vercel"],
  },
  {
    icon: MessageSquare,
    categories: ["client", "telecom"],
    tag: "Tourism",
    title: "Infinite Tours WhatsApp AI Agent",
    status: "Pilot Phase",
    desc: "Production 41-node n8n workflow integrating Meta WhatsApp Cloud API with a Supabase pgvector RAG system. Dynamic itinerary generation, session memory, human-in-the-loop escalation.",
    stack: ["n8n", "Supabase pgvector", "WhatsApp Cloud API", "Python"],
  },
  {
    icon: ShoppingCart,
    categories: ["client", "pipeline"],
    tag: "Procurement",
    title: "RFQ AI Processing System",
    status: "In Development",
    desc: "Automated RFQ ingestion, parsing, and vendor evaluation. Structured extraction and decision logic streamline procurement workflows end-to-end.",
    stack: ["n8n", "Python FastAPI", "Supabase"],
  },
  {
    icon: Cpu,
    categories: ["telecom"],
    tag: "Telecom",
    title: "TelecomGPT",
    status: "Pilot Phase",
    desc: "Domain-specific AI assistant for telecom operations, internal knowledge retrieval, and workflow automation. RAG architecture with structured document ingestion pipelines.",
    stack: ["React", "Supabase pgvector", "n8n", "Python FastAPI"],
  },
  {
    icon: FileSearch,
    categories: ["client"],
    tag: "Enterprise Operations",
    title: "AI Invoice Processing System",
    status: "Deployed",
    desc: "Extracts structured data from unstructured invoices (PDFs/images), validates fields, and integrates with internal ERP/accounting workflows for fully automated processing.",
    stack: ["Vision LLM", "n8n", "Supabase", "ERP API"],
  },
];

const statusColors: Record<string, string> = {
  Deployed: "text-emerald bg-emerald/10 border-emerald/20",
  "Pilot Phase": "text-amber bg-amber/10 border-amber/20",
  "In Development": "text-accent bg-accent/10 border-accent/20",
};

export default function ProjectsContent() {
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? projects
    : projects.filter((p) => p.categories.includes(active));

  return (
    <div className="pt-28">
      <section className="py-20 relative overflow-hidden">
        <div className="ambient-blob w-[500px] h-[500px] bg-emerald top-[-200px] right-[-100px] animate-glow-pulse" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn>
            <span className="section-label">Projects</span>
            <h1 className="font-heading text-display-sm mt-3 mb-6">
              Systems shipping{" "}
              <span className="gradient-text-accent">in production.</span>
            </h1>
            <p className="text-muted text-body-lg max-w-2xl">
              From telecom to tourism — real AI systems solving real business problems across the GCC.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === cat.id
                    ? "bg-accent text-white"
                    : "bg-surface text-muted hover:text-foreground border border-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <motion.div layout className="grid md:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="glass-card-hover rounded-2xl p-8 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-5">
                      <span className="tech-tag">{p.tag}</span>
                      <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${statusColors[p.status]}`}>
                        {p.status}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center mb-4">
                      <p.icon size={20} className="text-accent" />
                    </div>
                    <h3 className="font-heading text-h3 text-foreground mb-2">{p.title}</h3>
                    <p className="text-muted text-sm leading-relaxed flex-1">{p.desc}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <span key={t} className="text-[11px] font-mono text-muted-dim bg-surface px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom CTA */}
          <FadeIn delay={0.2}>
            <div className="mt-20 glass-card rounded-2xl p-8 md:p-10 text-center">
              <h3 className="font-heading text-h2 text-foreground mb-3">Want a prototype like these?</h3>
              <p className="text-muted text-body mb-6 max-w-lg mx-auto">
                Tell us the problem. We&apos;ll scope a working prototype — usually in 1–2 weeks.
              </p>
              <Link
                href="/contact?intent=prototype"
                className="glow-button px-8 py-3.5 rounded-xl font-medium text-sm inline-flex items-center gap-2"
              >
                Request a prototype <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
