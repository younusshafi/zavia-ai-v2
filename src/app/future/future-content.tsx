"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

const roadmap = [
  { quarter: "Q1", category: "Consumer", title: "Quranic Reflection App", desc: "AI-assisted reflective study experience grounded in classical scholarship." },
  { quarter: "Q2", category: "Platform", title: "RAG-as-a-Service", desc: "Turnkey retrieval infrastructure for enterprises — vector, hybrid, and evaluation built-in." },
  { quarter: "Q3", category: "Vertical", title: "Tourism Pipeline", desc: "End-to-end AI booking, concierge, and ops platform for tourism operators across the GCC." },
  { quarter: "2026", category: "Research", title: "Neuro-AI Interface", desc: "Research line exploring richer human–AI interaction surfaces — beyond chat." },
];

export default function FutureContent() {
  return (
    <div className="pt-28">
      <section className="py-20 relative overflow-hidden">
        <div className="ambient-blob w-[500px] h-[500px] bg-accent top-[-200px] left-[-100px] animate-glow-pulse" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn>
            <span className="section-label">Roadmap</span>
            <h1 className="font-heading text-display-sm mt-3 mb-6">
              What we&apos;re building{" "}
              <span className="gradient-text-accent">next.</span>
            </h1>
            <p className="text-muted text-body-lg max-w-2xl">
              From consumer apps to platform infrastructure — the systems on our horizon.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block relative">
            {/* Connecting line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/60 via-accent/30 to-accent/10" />

            <StaggerContainer className="grid grid-cols-4 gap-5" staggerDelay={0.1}>
              {roadmap.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="relative pt-12">
                    {/* Marker dot */}
                    <div className="absolute top-3 left-6 w-3 h-3 rounded-full bg-deep border-2 border-accent" />
                    <div className="glass-card-hover rounded-2xl p-6 h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-accent font-mono text-sm font-medium">{item.quarter}</span>
                        <span className="text-[10px] font-mono text-muted-dim bg-surface px-2 py-0.5 rounded">{item.category}</span>
                      </div>
                      <h3 className="font-heading text-h3 text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/60 via-accent/30 to-accent/10" />
            <div className="space-y-10">
              {roadmap.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div className="relative pl-16">
                    <div className="absolute left-[20px] top-2 w-3 h-3 rounded-full bg-deep border-2 border-accent" />
                    <div className="glass-card-hover rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-accent font-mono text-sm font-medium">{item.quarter}</span>
                        <span className="text-[10px] font-mono text-muted-dim bg-surface px-2 py-0.5 rounded">{item.category}</span>
                      </div>
                      <h3 className="font-heading text-h3 text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
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
