"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { Radio, Plane, Building2, Stethoscope, GraduationCap, ShoppingCart } from "lucide-react";

const industries = [
  {
    icon: Radio,
    title: "Telecommunications",
    desc: "Network intelligence, NOC automation, capacity planning copilots, and customer-facing AI agents for major GCC operators.",
    examples: ["Network anomaly detection", "CAPEX report automation", "Internal LLM assistants"],
  },
  {
    icon: Plane,
    title: "Tourism & Hospitality",
    desc: "Multilingual booking concierges, itinerary generators, and AI-native tour platforms with real-time availability and payment.",
    examples: ["AI booking agents", "Multilingual concierge", "Tour package RAG"],
  },
  {
    icon: Building2,
    title: "Government & Public Sector",
    desc: "Document intelligence, citizen service automation, and AI governance frameworks aligned with national AI strategies.",
    examples: ["Document processing", "Service desk AI", "Compliance automation"],
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    desc: "Clinical knowledge assistants, patient triage automation, and medical document extraction with strict compliance guardrails.",
    examples: ["Clinical knowledge RAG", "Patient triage", "Medical OCR"],
  },
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Adaptive learning systems, curriculum-aware tutoring agents, and administrative automation for schools and universities.",
    examples: ["AI tutoring agents", "Curriculum assistants", "Admin automation"],
  },
  {
    icon: ShoppingCart,
    title: "Retail & E-Commerce",
    desc: "Product recommendation engines, AI-powered customer support, and inventory intelligence with demand forecasting.",
    examples: ["Product recommendation", "AI customer support", "Demand forecasting"],
  },
];

export default function IndustriesPage() {
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
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
            {industries.map((ind) => (
              <StaggerItem key={ind.title}>
                <div className="glass-card-hover rounded-2xl p-8 h-full flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center mb-5">
                    <ind.icon size={20} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-h3 text-foreground mb-2">{ind.title}</h3>
                  <p className="text-muted text-sm leading-relaxed flex-1 mb-5">{ind.desc}</p>
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
