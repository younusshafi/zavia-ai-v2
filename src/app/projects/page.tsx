"use client";

import { Cpu, MessageSquare, FileSearch, BarChart3, Phone, Database } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

const projects = [
  {
    icon: Cpu,
    tag: "Telecom · Pilot",
    title: "TelecomGPT",
    desc: "Internal LLM assistant for a major GCC telecom operator. Claude-powered agent workflows spanning millions of network records, performance KPIs, and operational data. Integrated with n8n for automated report generation and anomaly alerting.",
    stack: ["Claude", "n8n", "Supabase pgvector", "TypeScript"],
    status: "Pilot",
  },
  {
    icon: MessageSquare,
    tag: "Tourism · Deployed",
    title: "Luban Tours AI",
    desc: "Multilingual booking concierge with RAG over 2,000+ tour packages. WhatsApp and web integration for real-time booking assistance in Arabic and English. Automated itinerary generation and payment gateway integration.",
    stack: ["Claude", "WordPress", "n8n", "Thawani Gateway"],
    status: "Production",
  },
  {
    icon: FileSearch,
    tag: "Operations · Deployed",
    title: "AI Invoice System",
    desc: "End-to-end invoice extraction, validation, and ERP sync using Claude vision. Automated OCR with structured data extraction, validation rules, and human-in-the-loop review before ERP posting.",
    stack: ["Claude Vision", "n8n", "REST API", "ERP Webhooks"],
    status: "Production",
  },
  {
    icon: BarChart3,
    tag: "Telecom · Internal",
    title: "CAPEX Forum Automation",
    desc: "Automated PowerPoint report generation for monthly CAPEX review forums. Config-driven architecture pulls live data and generates presentation-ready slides with charts and commentary.",
    stack: ["Node.js", "PptxGenJS", "YAML Config"],
    status: "Internal Tool",
  },
  {
    icon: Phone,
    tag: "Voice · R&D",
    title: "AI Voice Agent Platform",
    desc: "Production voice agents for inbound and outbound calls — booking, qualification, and resolution. Wired into CRM, calendar, and ticketing systems with Arabic and English support.",
    stack: ["Twilio", "Claude", "n8n", "WebSockets"],
    status: "R&D",
  },
  {
    icon: Database,
    tag: "Enterprise · Deployed",
    title: "AI News Digest",
    desc: "Automated AI-curated news digest system delivering daily industry briefings via email. Multi-source aggregation with Perplexity Sonar, structured into 9 thematic sections.",
    stack: ["n8n", "Perplexity Sonar", "Gmail API"],
    status: "Production",
  },
];

const statusColors: Record<string, string> = {
  Production: "text-emerald bg-emerald/10 border-emerald/20",
  Pilot: "text-amber bg-amber/10 border-amber/20",
  "R&D": "text-accent bg-accent/10 border-accent/20",
  "Internal Tool": "text-muted bg-surface border-border",
};

export default function ProjectsPage() {
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
          <StaggerContainer className="grid md:grid-cols-2 gap-5" staggerDelay={0.08}>
            {projects.map((p) => (
              <StaggerItem key={p.title}>
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
                      <span key={t} className="text-[11px] font-mono text-muted-dim bg-surface px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
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
