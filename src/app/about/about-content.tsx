"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { MapPin } from "lucide-react";

const offices = [
  { city: "Muscat", region: "Oman", role: "HQ · GCC delivery" },
  { city: "Srinagar", region: "Jammu & Kashmir", role: "Engineering hub" },
  { city: "Kuala Lumpur", region: "Malaysia", role: "APAC partnerships" },
];

const timeline = [
  { year: "2023", title: "Founded", desc: "Started as an AI engineering studio focused on production-grade AI systems." },
  { year: "2024", title: "First enterprise pilots", desc: "Shipped systems for telecom, tourism, and operations across the GCC." },
  { year: "2025", title: "Scaling AI infrastructure", desc: "Rolling out RAG-as-a-Service and joining the Anthropic Claude partner network." },
  { year: "2026", title: "Beyond chat", desc: "Investing in voice agents, vision, and neuro-AI interfaces for enterprise." },
];

export default function AboutContent() {
  return (
    <div className="pt-28">
      <section className="py-20 relative overflow-hidden">
        <div className="ambient-blob w-[500px] h-[500px] bg-accent top-[-200px] right-[-100px] animate-glow-pulse" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn>
            <span className="section-label">About</span>
            <h1 className="font-heading text-display-sm mt-3 mb-6">
              Engineering AI that{" "}
              <span className="gradient-text-accent">earns trust.</span>
            </h1>
            <p className="text-muted text-body-lg max-w-2xl">
              Zavia-AI is an AI engineering studio building production-grade AI systems for enterprises across the GCC, South Asia, and beyond.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-5">
            <FadeIn delay={0.1}>
              <div className="glass-card rounded-2xl p-8 h-full">
                <span className="section-label text-emerald">Our mission</span>
                <p className="font-heading text-h3 text-foreground mt-3">
                  To make frontier AI useful inside real enterprises — with the rigor of infrastructure engineering and the speed of a studio.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="glass-card rounded-2xl p-8 h-full">
                <span className="section-label text-amber">Our vision</span>
                <p className="font-heading text-h3 text-foreground mt-3">
                  A trusted partner for enterprise AI systems — from agents and RAG today to voice and neuro-AI interfaces tomorrow.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 bg-base/50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <span className="section-label">Where we work</span>
            <h2 className="font-heading text-h1 mt-3 mb-12">
              Three cities. <span className="text-muted">One team.</span>
            </h2>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {offices.map((o) => (
              <StaggerItem key={o.city}>
                <div className="glass-card-hover rounded-2xl p-8 text-center">
                  <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center mx-auto mb-4">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-h3 text-foreground">{o.city}</h3>
                  <p className="text-muted text-sm mt-1">{o.region}</p>
                  <p className="text-accent text-xs mt-3 font-mono">{o.role}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <span className="section-label">Our journey</span>
            <h2 className="font-heading text-h1 mt-3 mb-16" />
          </FadeIn>
          <div className="relative">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />
            {timeline.map((t, i) => (
              <FadeIn key={t.year} delay={i * 0.1}>
                <div className="relative pl-14 md:pl-20 pb-12 last:pb-0">
                  <div className="absolute left-2 md:left-6 top-0.5 w-5 h-5 rounded-full bg-elevated border-2 border-accent flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <span className="text-accent font-mono text-sm">{t.year}</span>
                  <h3 className="font-heading text-h3 text-foreground mt-1">{t.title}</h3>
                  <p className="text-muted text-body mt-2">{t.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
