"use client";

import Link from "next/link";
import { ArrowRight, Code2, Bot, Lightbulb, Plug, Globe } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

const services = [
  {
    icon: Code2,
    title: "AI System Development",
    desc: "Production RAG pipelines and Claude-powered LLM applications with evaluation, observability, and guardrails.",
    useCases: ["Knowledge assistants", "Document intelligence", "Search & retrieval"],
    stack: ["Claude", "Supabase pgvector", "TypeScript", "TanStack"],
  },
  {
    icon: Bot,
    title: "AI Agents & Automation",
    desc: "Multi-step agents and workflow orchestration using n8n and Claude — from inbox triage to ERP sync.",
    useCases: ["WhatsApp / chat agents", "Back-office automation", "Tool-using agents"],
    stack: ["n8n", "Claude tool use", "Webhooks", "Queues"],
  },
  {
    icon: Lightbulb,
    title: "Enterprise AI Consulting",
    desc: "From vision to roadmap: opportunity mapping, vendor strategy, and architecture for AI at scale.",
    useCases: ["AI strategy", "Architecture review", "Vendor selection"],
    stack: ["Claude", "OpenAI", "Anthropic API", "Cloud platforms"],
  },
  {
    icon: Plug,
    title: "Custom AI Integrations",
    desc: "Plug AI into the systems you already run — CRM, ERP, telephony, and internal tools.",
    useCases: ["CRM AI agents", "ERP automation", "Voice & telephony"],
    stack: ["REST / GraphQL", "Webhooks", "n8n", "Twilio"],
  },
  {
    icon: Globe,
    title: "AI Websites & Platforms",
    desc: "AI-native customer-facing platforms: concierges, booking flows, and conversational interfaces.",
    useCases: ["AI booking", "Conversational UX", "Multilingual concierge"],
    stack: ["React", "TanStack Start", "WordPress", "Claude"],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-28">
      <section className="py-20 relative overflow-hidden">
        <div className="ambient-blob w-[500px] h-[500px] bg-accent top-[-200px] left-[-100px] animate-glow-pulse" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn>
            <span className="section-label">Services</span>
            <h1 className="font-heading text-display-sm mt-3 mb-6">
              Five ways we ship Claude{" "}
              <span className="gradient-text-accent">into production.</span>
            </h1>
            <p className="text-muted text-body-lg max-w-2xl">
              From a single agent to a full AI platform — we cover the stack from architecture to deployment.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="space-y-5" staggerDelay={0.1}>
            {services.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="glass-card-hover rounded-2xl p-8 md:p-10 border-l-2 border-accent/30">
                  <div className={`flex flex-col md:items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="w-12 h-12 rounded-xl bg-accent-subtle flex items-center justify-center shrink-0">
                      <s.icon size={24} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-h2 text-foreground mb-2">{s.title}</h3>
                      <p className="text-muted text-body leading-relaxed mb-5">{s.desc}</p>
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div>
                          <span className="text-xs text-muted-dim font-mono uppercase tracking-wider">Use cases</span>
                          <ul className="mt-2 space-y-1">
                            {s.useCases.map((u) => (
                              <li key={u} className="text-sm text-muted flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-accent" />
                                {u}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-xs text-muted-dim font-mono uppercase tracking-wider">Stack</span>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {s.stack.map((t) => (
                              <span key={t} className="tech-tag">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="mt-16 text-center">
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
