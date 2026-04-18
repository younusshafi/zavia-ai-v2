"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { Radio, Plane, GraduationCap, Car } from "lucide-react";

const industries = [
  {
    icon: Radio,
    title: "Telecommunications",
    desc: "Network intelligence, NOC automation, capacity planning copilots, and customer-facing AI agents for major GCC operators.",
    examples: ["Internal LLM assistants", "CAPEX decision support", "Operations RAG"],
  },
  {
    icon: Plane,
    title: "Tourism",
    desc: "Multilingual booking concierges, itinerary generators, and AI-native tour platforms with real-time availability and payment.",
    examples: ["Multilingual booking concierge", "WhatsApp sales agents", "Itinerary intelligence"],
  },
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Reflective learning apps, curriculum-aware tutoring agents, and administrative automation for schools and universities.",
    examples: ["Reflective learning apps", "Curriculum copilots", "Assessment automation"],
  },
  {
    icon: Car,
    title: "Fleet Management",
    desc: "Executive-grade fleet dashboards, operational triage systems, and document automation for fleet operators.",
    examples: ["Operational triage", "Document automation", "Compliance assistants"],
  },
];

export default function IndustriesContent() {
  return (
    <div className="pt-28">
      <section className="py-20 relative overflow-hidden">
        <div className="ambient-blob w-[500px] h-[500px] bg-emerald top-[-200px] left-[-100px] animate-glow-pulse" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn>
            <span className="section-label">Industries</span>
            <h1 className="font-heading text-display-sm mt-3 mb-6">
              AI that understands{" "}
              <span className="gradient-text-accent">your domain.</span>
            </h1>
            <p className="text-muted text-body-lg max-w-2xl">
              We build for industries where AI must be accurate, compliant, and production-ready — not experimental.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <StaggerContainer className="grid md:grid-cols-2 gap-5" staggerDelay={0.08}>
            {industries.map((ind, i) => (
              <StaggerItem key={ind.title} className={i === 0 ? "md:col-span-2" : ""}>
                <div className={`glass-card-hover rounded-2xl p-8 h-full flex flex-col ${i === 0 ? "bg-accent-subtle" : ""}`}>
                  <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center mb-5">
                    <ind.icon size={20} className="text-accent" />
                  </div>
                  <h3 className={`font-heading text-foreground mb-2 ${i === 0 ? "text-h2" : "text-h3"}`}>{ind.title}</h3>
                  <p className={`text-muted leading-relaxed flex-1 mb-5 ${i === 0 ? "text-body" : "text-sm"}`}>{ind.desc}</p>
                  <div className="space-y-1.5">
                    {ind.examples.map((ex) => (
                      <div key={ex} className="flex items-center gap-2 text-xs text-muted-dim">
                        <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                        {ex}
                      </div>
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
