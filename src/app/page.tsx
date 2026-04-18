"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Brain,
  Rocket,
  Workflow,
  Shield,
  ArrowRight,
  Cpu,
  MessageSquare,
  FileSearch,
  ChevronRight,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import AnimatedCounter from "@/components/animated-counter";
import TextScramble from "@/components/text-scramble";
import MagneticButton from "@/components/magnetic-button";
import SectionDivider from "@/components/section-divider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
  loading: () => null,
});

const stats = [
  { value: 12, suffix: "+", label: "AI projects shipped" },
  { value: 30, suffix: "+", label: "Production n8n workflows" },
  { value: 105, suffix: "", label: "Telecom use cases mapped" },
  { value: 6, suffix: "", label: "Industries served" },
];

const pillars = [
  {
    icon: Brain,
    title: "Claude-centric architecture",
    desc: "Every system built with Claude as the reasoning core — not bolted on, but woven through.",
  },
  {
    icon: Rocket,
    title: "Production from day one",
    desc: "Real RAG pipelines, observability, evaluation harnesses. Not demos — systems that hold under load.",
  },
  {
    icon: Workflow,
    title: "Orchestrated automation",
    desc: "n8n + Claude + Supabase: a stack proven across telecom, tourism, and operations.",
  },
  {
    icon: Shield,
    title: "Enterprise-grade",
    desc: "Security, compliance, and audit trails baked in. Built for regulated GCC industries.",
  },
];

const projects = [
  {
    tag: "Telecom · Pilot",
    title: "TelecomGPT",
    desc: "Internal LLM assistant for a major GCC telecom — agent workflows over millions of records.",
    icon: Cpu,
    stack: ["Claude", "n8n", "Supabase"],
  },
  {
    tag: "Tourism · Deployed",
    title: "Luban Tours AI",
    desc: "Multilingual booking concierge with RAG over 2,000+ tour packages.",
    icon: MessageSquare,
    stack: ["Claude", "RAG", "WhatsApp"],
  },
  {
    tag: "Operations · Deployed",
    title: "AI Invoice System",
    desc: "End-to-end invoice extraction, validation, and ERP sync with Claude vision.",
    icon: FileSearch,
    stack: ["Claude Vision", "n8n", "ERP"],
  },
];

function HorizontalScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-50%"]);

  return (
    <section ref={containerRef} className="py-28 bg-base/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="section-label">Selected work</span>
              <h2 className="font-heading text-h1 mt-3">
                Systems shipping{" "}
                <span className="text-muted">in production.</span>
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden md:flex items-center gap-1 text-sm text-accent hover:text-accent-light transition-colors link-underline"
            >
              All projects <ChevronRight size={16} />
            </Link>
          </div>
        </FadeIn>

        {/* Desktop: horizontal scroll */}
        <div className="hidden md:block">
          <motion.div
            className="flex gap-5"
            style={{ x: reduced ? "0%" : x }}
          >
            {projects.map((proj) => (
              <Link
                key={proj.title}
                href="/projects"
                className="block glass-card-hover rounded-2xl p-8 group shrink-0 w-[400px]"
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="tech-tag">{proj.tag}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center mb-5">
                  <proj.icon size={20} className="text-accent" />
                </div>
                <h3 className="font-heading text-h3 text-foreground mb-2 group-hover:text-accent transition-colors">
                  {proj.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{proj.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.stack.map((t) => (
                    <span key={t} className="tech-tag text-[10px]">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Read case study <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Mobile: vertical stack */}
        <StaggerContainer className="grid md:hidden gap-5" staggerDelay={0.1}>
          {projects.map((proj) => (
            <StaggerItem key={proj.title}>
              <Link href="/projects" className="block glass-card-hover rounded-2xl p-8 group">
                <div className="flex items-center gap-2 mb-6">
                  <span className="tech-tag">{proj.tag}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center mb-5">
                  <proj.icon size={20} className="text-accent" />
                </div>
                <h3 className="font-heading text-h3 text-foreground mb-2 group-hover:text-accent transition-colors">
                  {proj.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{proj.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Read case study <ArrowRight size={14} />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-8 md:hidden text-center">
          <Link href="/projects" className="text-sm text-accent flex items-center justify-center gap-1">
            All projects <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="relative">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Three.js neural network background */}
        <HeroScene />

        {/* Radial vignette overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, #020203 70%)",
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] z-[1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <span className="section-label">AI Engineering Studio · Muscat · Srinagar · Kuala Lumpur</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-display-sm md:text-display leading-tight mb-6"
          >
            Enterprise AI systems,{" "}
            <TextScramble
              text="engineered."
              className="gradient-text-accent"
              delay={800}
              speed={40}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-muted text-body-lg max-w-2xl mx-auto mb-10"
          >
            We design, build, and deploy production-grade Claude-powered systems — agents, RAG, and automation — for the enterprises shaping the GCC.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton>
              <Link
                href="/contact?intent=prototype"
                className="glow-button px-8 py-3.5 rounded-xl font-medium text-sm flex items-center gap-2"
              >
                Request a prototype
                <ArrowRight size={16} />
              </Link>
            </MagneticButton>
            <Link
              href="/projects"
              className="px-8 py-3.5 rounded-xl text-sm font-medium text-muted border border-border hover:border-border-bright hover:text-foreground transition-all"
            >
              View projects
            </Link>
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep to-transparent z-[2]" />
      </section>

      {/* ─── STATS ─── */}
      <section className="relative py-12 -mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.1}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="stat-card p-6 text-center">
                  <div className="font-heading text-h1 text-foreground mb-1">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-muted text-sm">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ─── TRUST STRIP ─── */}
      <section className="py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <p className="text-center text-xs font-mono text-muted-dim uppercase tracking-widest mb-10">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {[
                { name: "Ooredoo", width: "w-28" },
                { name: "Anthropic", width: "w-24" },
                { name: "Luban Tours", width: "w-28" },
              ].map((logo) => (
                <div
                  key={logo.name}
                  className={`${logo.width} h-8 flex items-center justify-center`}
                >
                  <span className="text-muted/40 font-heading font-semibold text-lg tracking-wide">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-dim mt-8">
              Anthropic Claude Partner Network · Production systems across 6 industries
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionDivider />

      {/* ─── WHY ZAVIA ─── */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <span className="section-label">Why Zavia-AI</span>
            <h2 className="font-heading text-h1 mt-3 mb-16">
              Built like infrastructure,{" "}
              <span className="text-muted">not prototypes.</span>
            </h2>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-5" staggerDelay={0.1}>
            {pillars.map((p) => (
              <StaggerItem key={p.title}>
                <div className="glass-card-hover rounded-2xl p-8">
                  <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center mb-5">
                    <p.icon size={20} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-h3 text-foreground mb-2">{p.title}</h3>
                  <p className="text-muted text-body leading-relaxed">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      {/* ─── PROJECTS (horizontal scroll) ─── */}
      <HorizontalScrollGallery />

      <SectionDivider />

      {/* ─── PRODUCTS ─── */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <span className="section-label">Products</span>
            <h2 className="font-heading text-h1 mt-3 mb-16">
              Productized AI, <span className="text-muted">ready to deploy.</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5">
            <FadeIn delay={0.1}>
              <div className="glass-card rounded-2xl p-8 h-full border-accent/10 relative overflow-hidden">
                <div className="ambient-blob w-[200px] h-[200px] bg-accent top-[-50px] right-[-50px]" />
                <div className="relative">
                  <span className="section-label text-emerald">RAG-as-a-Service</span>
                  <div className="flex gap-2 mt-2 mb-4">
                    <span className="tech-tag">RAG chatbots</span>
                    <span className="tech-tag">Knowledge agents</span>
                  </div>
                  <p className="text-muted text-body leading-relaxed mb-6">
                    Deploy domain-specific chatbots grounded in your documents, data, and compliance rules.
                    Hybrid retrieval, observability, and human-in-the-loop included.
                  </p>
                  <Link
                    href="/contact?intent=prototype"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors link-underline"
                  >
                    Request a prototype <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="glass-card rounded-2xl p-8 h-full relative overflow-hidden">
                <div className="ambient-blob w-[200px] h-[200px] bg-emerald bottom-[-50px] left-[-50px]" />
                <div className="relative">
                  <span className="section-label text-emerald">AI Voice Agents</span>
                  <div className="flex gap-2 mt-2 mb-4 flex-wrap">
                    <span className="tech-tag">Inbound</span>
                    <span className="tech-tag">Outbound</span>
                    <span className="tech-tag">Multilingual</span>
                  </div>
                  <p className="text-muted text-body leading-relaxed mb-6">
                    Production voice agents that book, qualify, and resolve — wired into your CRM, calendar, and
                    ticketing. Arabic, English, and regional language support.
                  </p>
                  <Link
                    href="/contact?intent=prototype"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors link-underline"
                  >
                    Request a prototype <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ─── CTA ─── */}
      <section className="py-28 relative overflow-hidden">
        <div className="ambient-blob w-[400px] h-[400px] bg-accent top-[-100px] left-[30%] animate-glow-pulse" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <h2 className="font-heading text-h1 mb-4">
              Ready to ship a{" "}
              <TextScramble
                text="real AI system?"
                className="gradient-text-accent"
                delay={200}
                speed={35}
              />
            </h2>
            <p className="text-muted text-body-lg mb-10">
              Tell us your problem. We&apos;ll come back with a prototype plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link
                  href="/contact?intent=prototype"
                  className="glow-button px-8 py-3.5 rounded-xl font-medium text-sm flex items-center gap-2"
                >
                  Request a prototype <ArrowRight size={16} />
                </Link>
              </MagneticButton>
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-xl text-sm font-medium text-muted border border-border hover:border-border-bright hover:text-foreground transition-all"
              >
                Book a consultation
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
